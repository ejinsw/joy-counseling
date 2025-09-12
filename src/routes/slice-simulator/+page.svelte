<script lang="ts">
	import { SliceSimulator } from "@slicemachine/adapter-sveltekit/simulator";
	import { components } from "$lib/slices";
	import { SliceZone } from "@prismicio/svelte";
</script>

<SliceSimulator let:slices>
	<SliceZone {slices} {components} />
</SliceSimulator>
