<script lang="ts">
	import { Heart } from '@lucide/svelte';
	import { PrismicImage } from '@prismicio/svelte';

	let { class: className = '', image = null } = $props<{
		class?: string;
		image?: PrismicImage | null;
	}>();
</script>

{#if image}
	<PrismicImage field={image} class={className} width={128} height={128} />
{:else}
	<div
		class="w-10 h-10 bg-healing-gradient rounded-xl flex items-center justify-center group-hover:scale-105 transition-transform duration-200"
	>
		<Heart class={className} />
	</div>
{/if}
