<script lang="ts">
	import { SliceSimulator } from "@slicemachine/adapter-sveltekit/simulator";
	import { components } from "$lib/slices";
  </script>
  
  <SliceSimulator {components} />