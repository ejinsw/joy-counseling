<script lang="ts">
	import type { Content } from '@prismicio/client';
	import { PrismicRichText, PrismicImage } from '@prismicio/svelte';

	export let slice: any;
</script>

<section class="py-16 bg-white">
	<div class="container mx-auto px-4">
		<div class="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
			{#if slice.primary.image_position === 'right'}
				<div class="order-1 lg:order-2">
					{#if slice.primary.image?.url}
						<PrismicImage field={slice.primary.image} class="w-full h-96 object-cover rounded-lg shadow-lg" />
					{/if}
				</div>
				<div class="order-2 lg:order-1">
					<h2 class="text-4xl font-bold text-gray-900 mb-6">
						{slice.primary.title}
					</h2>
					<div class="prose prose-lg text-gray-600">
						<PrismicRichText field={slice.primary.content} />
					</div>
				</div>
			{:else}
				<div>
					{#if slice.primary.image?.url}
						<PrismicImage field={slice.primary.image} class="w-full h-96 object-cover rounded-lg shadow-lg" />
					{/if}
				</div>
				<div>
					<h2 class="text-4xl font-bold text-gray-900 mb-6">
						{slice.primary.title}
					</h2>
					<div class="prose prose-lg text-gray-600">
						<PrismicRichText field={slice.primary.content} />
					</div>
				</div>
			{/if}
		</div>
	</div>
</section>
