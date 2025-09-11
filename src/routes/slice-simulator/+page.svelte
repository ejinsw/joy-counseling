<script lang="ts">
	import { SliceSimulator } from '@slicemachine/adapter-sveltekit/simulator';
	import { SliceZone } from '@prismicio/svelte';
	import { components } from '$lib/slices';
	import { browser } from '$app/environment';
	import { onMount } from 'svelte';
	
	let simulatorMounted = false;
	let error: any = null;
	
	onMount(() => {
		try {
			simulatorMounted = true;
			console.log('Slice simulator mounted, components:', Object.keys(components));
		} catch (e) {
			error = (e as any).message;
			console.error('Slice simulator error:', e);
		}
	});
</script>

<svelte:head>
	<title>Slice Simulator</title>
	<meta name="robots" content="noindex" />
</svelte:head>

{#if !browser}
	<div class="flex items-center justify-center min-h-screen">
		<div class="text-center">
			<h1 class="text-2xl font-bold text-gray-900 mb-4">Slice Simulator Loading...</h1>
			<div class="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto"></div>
		</div>
	</div>
{:else if error}
	<div class="flex items-center justify-center min-h-screen">
		<div class="text-center p-8">
			<h1 class="text-2xl font-bold text-red-900 mb-4">Slice Simulator Error</h1>
			<p class="text-red-700 mb-4">{error}</p>
			<div class="text-sm text-gray-600">
				<p>Components available: {Object.keys(components).join(', ')}</p>
			</div>
		</div>
	</div>
{:else}
	<SliceSimulator let:slices>
		<SliceZone {slices} {components} />
	</SliceSimulator>
{/if}