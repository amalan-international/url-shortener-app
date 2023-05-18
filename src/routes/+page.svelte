<script lang="ts">
	import Copyright from '$lib/components/copyright.svelte';
	import { z } from 'zod';

	import type { PageData } from './$types';
	import { superForm } from 'sveltekit-superforms/client';
	import { SlideToggle } from '@skeletonlabs/skeleton';
	import { writable, type Writable } from 'svelte/store';
	import type { formActionApiResult } from './+page';
	import GeneratedResultCard from '$lib/components/generated-result-card.svelte';

	export let data: PageData;

	const isLoading = writable(false);
	const apiResult: Writable<formActionApiResult> = writable({});

	const validationSchema = z.object({
		source: z.string().url('Must be a valid URL'),
		private: z.boolean(),
	});

	const { form, enhance, errors } = superForm(data.form, {
		validators: validationSchema,
		validationMethod: 'oninput',
		defaultValidator: 'keep',
		onSubmit() {
			isLoading.set(true);
		},
		onResult(event) {
			isLoading.set(false);
			if (event.result.type === 'success') return apiResult.set(event.result.data?.result);

			return apiResult.set({
				status: event.result.status,
			});
		},
	});
</script>

<svelte:head>
	<title>URL Shortener | Home</title>
</svelte:head>

<div class="container h-full mx-auto flex justify-center items-center p-8 md:p-20">
	<div class="card p-4 w-full h-full shadow-xl">
		<header class="card-header h-1/6">
			<p class="text-center text-2xl font-bold">
				Shorten your URL for <span class="text-primary-600">free</span> now.
			</p>
		</header>
		<section class="p-4 h-4/6 flex justify-center items-center">
			<div class="w-full max-w-md">
				{#if $apiResult.status !== undefined}
					<GeneratedResultCard data={$apiResult} />
				{/if}
				<form method="POST" use:enhance>
					<input
						class="input"
						placeholder="Type your URL here..."
						type="text"
						name="source"
						data-invalid={$errors.source}
						bind:value={$form.source}
					/>
					{#if $errors.source}
						<span class="text-sm text-red-500 mt-0">*{$errors.source}</span>
					{/if}

					<div class="w-full mt-2 flex justify-center items-center">
						<SlideToggle
							name="private"
							active="bg-primary-500"
							size="sm"
							bind:checked={$form.private}
						>
							{#if $form.private}
								Private
							{:else}
								Public
							{/if}
						</SlideToggle>
					</div>

					<button
						disabled={$isLoading}
						type="submit"
						class="w-full mt-4 shadow-lg btn variant-filled-primary"
					>
						Generate my URL
					</button>
				</form>
				<a href="/history" class="w-full mt-4 shadow-lg btn variant-filled-surface"
					>See your history <i class="ri-arrow-right-line ml-1" /></a
				>
			</div>
		</section>
		<footer class="card-footer h-1/6 flex justify-center items-end">
			<Copyright />
		</footer>
	</div>
</div>
