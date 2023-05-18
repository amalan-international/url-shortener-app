<script lang="ts">
	// The ordering of these imports is critical to your app working properly
	import '@skeletonlabs/skeleton/themes/theme-modern.css';
	// If you have source.organizeImports set to true in VSCode, then it will auto change this ordering
	import '@skeletonlabs/skeleton/styles/skeleton.css';
	// Most of your app wide CSS should be put in this file
	import '../app.postcss';
	import { AppShell, AppBar, LightSwitch } from '@skeletonlabs/skeleton';

	//icon packs
	import 'remixicon/fonts/remixicon.css';
</script>

<!-- App Shell -->
<AppShell>
	<svelte:fragment slot="header">
		<!-- App Bar -->
		<AppBar shadow="shadow-xl">
			<svelte:fragment slot="lead">
				<strong class="text-xl"><span class="text-primary-600">URL</span> Shortener</strong>
			</svelte:fragment>
			<svelte:fragment slot="trail">
				<LightSwitch />
				<a
					class="btn-icon btn-icon-sm hover:variant-soft-primary"
					href="https://github.com/yudayahya"
					target="_blank"
					rel="external"
				>
					<i class="ri-github-fill text-2xl" />
				</a>
			</svelte:fragment>
		</AppBar>
	</svelte:fragment>
	<!-- Page Route Content -->
	<slot />
</AppShell>
