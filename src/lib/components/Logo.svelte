<script lang="ts">
	import { PrismicImage } from '@prismicio/svelte';

	let { class: className = '', image = null } = $props<{
		class?: string;
		image?: any;
	}>();
</script>

{#if image}
	<PrismicImage field={image} class={`${className} object-contain`} width={128} height={128} />
{:else}
	<div
		class={`${className} flex items-center justify-center rounded-md border border-primary-200 bg-secondary-50 text-xs font-semibold text-primary-800`}
	>
		JOY
	</div>
{/if}
