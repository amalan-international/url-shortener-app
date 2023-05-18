<script lang="ts">
	import Copyright from '$lib/components/copyright.svelte';
</script>

<svelte:head>
	<title>URL Shortener | History</title>
</svelte:head>

<div class="container h-full mx-auto flex justify-center items-center p-8 md:p-20">
	<div class="card p-4 w-full h-full shadow-xl">
		<header class="card-header h-1/6">
			<a href="/" class="btn variant-filled"><i class="ri-arrow-left-line mr-1" /> Back</a>
		</header>
		<section class="p-4 h-4/6 flex justify-center items-center">
			<div class="w-full max-w-md text-center">Content will available soon.</div>
		</section>
		<footer class="card-footer h-1/6 flex justify-center items-end">
			<Copyright />
		</footer>
	</div>
</div>
