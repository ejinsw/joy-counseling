<script>
	import { SliceSimulator } from '@slicemachine/adapter-sveltekit/simulator';
	import { SliceZone } from '@prismicio/svelte';
	import { components } from '$lib/slices';
	import { onMount } from 'svelte';
	import { browser } from '$app/environment';

	// Debug logging for troubleshooting
	onMount(() => {
		if (browser) {
			console.log('Slice Simulator mounted');
			console.log('Available components:', Object.keys(components));
		}
	});
</script>

<svelte:head>
	<title>Slice Simulator</title>
	<meta name="robots" content="noindex" />
</svelte:head>

<!-- Slot syntax is used for backward compatibility with Svelte <=4. -->
<SliceSimulator let:slices>
	<SliceZone {slices} {components} />
</SliceSimulator>
