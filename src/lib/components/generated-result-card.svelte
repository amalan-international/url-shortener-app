<script lang="ts">
	import type { formActionApiResult } from '../../routes/+page';
	import { Toast, toastStore } from '@skeletonlabs/skeleton';
	import type { ToastSettings } from '@skeletonlabs/skeleton';

	export let data: formActionApiResult;

	const t: ToastSettings = {
		message: 'Copied to clipboard',
		timeout: 4000,
		background: 'variant-filled-primary',
	};

	const copyToClipboard = (value: string | null | undefined) => {
		if (!value) return;
		navigator.clipboard.writeText(value);
		toastStore.trigger(t);
	};
</script>

<div class="card variant-filled p-4 w-full mb-6 pb-8">
	<header class="card-header">
		{#if data.status === 200}
			<p class="text-center text-lg font-bold text-success-700">Click to copy.</p>
		{:else}
			<p class="text-center text-lg font-bold text-primary-600">
				Opss.. Something went wrong.
			</p>
		{/if}
	</header>
	{#if data.status === 200}
		<section class="mt-2">
			<dl class="list-dl">
				<div class="flex justify-center items-center sm:text-lg">
					<span class="badge-icon variant-filled"><i class="ri-link" /></span>
					<button
						on:click={() => copyToClipboard(data.data?.data.source)}
						class="font-bold"
						>{data.data?.data.source && data.data?.data.source.length >= 20
							? data.data?.data.source.slice(0, 20) + '...'
							: data.data?.data.source}</button
					>
				</div>
				{#if data.data?.data.password}
					<div class="flex justify-center items-center sm:text-lg">
						<span class="badge-icon variant-filled"
							><i class="ri-lock-password-line" /></span
						>
						<button
							on:click={() => copyToClipboard(data.data?.data.password)}
							class="font-bold">{data.data?.data.password}</button
						>
					</div>
				{/if}
			</dl>
		</section>
	{/if}
	<Toast />
</div>
