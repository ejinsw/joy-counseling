<script>
	import { SliceSimulator } from '@slicemachine/adapter-sveltekit/simulator';
	import { SliceZone } from '@prismicio/svelte';
	import { components } from '$lib/slices';
	import { onMount } from 'svelte';
	import { browser } from '$app/environment';

	let isInIframe = false;
	let simulatorError = false;

	// Check if we're in an iframe and handle errors
	onMount(() => {
		if (browser) {
			console.log('Slice Simulator mounted');
			console.log('Available components:', Object.keys(components));
			
			// Check if we're in an iframe
			try {
				isInIframe = window.self !== window.top;
			} catch (e) {
				isInIframe = true;
			}
			
			console.log('Is in iframe:', isInIframe);
			
			// Handle simulator errors
			window.addEventListener('error', (e) => {
				if (e.message?.includes('Receiver is currently not embedded')) {
					simulatorError = true;
					console.error('Slice simulator must be accessed from within Prismic Slice Machine');
				}
			});
		}
	});
</script>

<svelte:head>
	<title>Slice Simulator</title>
	<meta name="robots" content="noindex" />
	<!-- Allow iframe embedding from Prismic -->
	<meta http-equiv="content-security-policy" content="frame-ancestors 'self' https://*.prismic.io;">
</svelte:head>

{#if !browser}
	<!-- SSR placeholder -->
	<div class="flex items-center justify-center min-h-screen">
		<div class="text-center">
			<h1 class="text-2xl font-bold text-neutral-900 mb-4">Slice Simulator Loading...</h1>
			<div class="w-8 h-8 border-4 border-primary-600 border-t-transparent rounded-full animate-spin mx-auto"></div>
		</div>
	</div>
{:else if simulatorError}
	<!-- Error state when not accessed from Prismic -->
	<div class="flex items-center justify-center min-h-screen bg-neutral-50">
		<div class="max-w-md text-center p-8 bg-white rounded-xl shadow-medium">
			<div class="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
				<svg class="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
					<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.732-.833-2.5 0L4.232 15.5c-.77.833.192 2.5 1.732 2.5z"/>
				</svg>
			</div>
			<h1 class="text-xl font-bold text-neutral-900 mb-2">Slice Simulator Access Error</h1>
			<p class="text-neutral-600 mb-4">
				This page must be accessed from within the Prismic Slice Machine interface.
			</p>
			<div class="text-sm text-neutral-500 space-y-2">
				<p><strong>To use the slice simulator:</strong></p>
				<ol class="text-left space-y-1">
					<li>1. Open Prismic Slice Machine</li>
					<li>2. Go to your repository</li>
					<li>3. Select a slice to preview</li>
					<li>4. Use the preview panel</li>
				</ol>
			</div>
		</div>
	</div>
{:else if !isInIframe}
	<!-- Direct access warning -->
	<div class="flex items-center justify-center min-h-screen bg-neutral-50">
		<div class="max-w-md text-center p-8 bg-white rounded-xl shadow-medium">
			<div class="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
				<svg class="w-8 h-8 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
					<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
				</svg>
			</div>
			<h1 class="text-xl font-bold text-neutral-900 mb-2">Slice Simulator Ready</h1>
			<p class="text-neutral-600 mb-4">
				The slice simulator is configured and ready to use.
			</p>
			<div class="text-sm text-neutral-500 space-y-2">
				<p><strong>Available slices:</strong></p>
				<div class="bg-neutral-50 rounded-lg p-3 mt-2">
					{#each Object.keys(components) as component}
						<div class="text-xs font-mono text-neutral-700">{component}</div>
					{/each}
				</div>
				<p class="pt-2"><strong>Access from Prismic Slice Machine to preview slices.</strong></p>
			</div>
		</div>
	</div>
{:else}
	<!-- Normal slice simulator when in iframe -->
	<SliceSimulator let:slices>
		<SliceZone {slices} {components} />
	</SliceSimulator>
{/if}
