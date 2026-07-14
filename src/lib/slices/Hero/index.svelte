<script lang="ts">
	import { asText, isFilled } from '@prismicio/client';
	import { PrismicImage, PrismicLink, PrismicRichText } from '@prismicio/svelte';
	import type { HeroSlice } from '../../../prismicio-types';

	export let slice: HeroSlice;

	let { primary } = slice;
	$: descriptionText = isFilled.richText(primary.description)
		? asText(primary.description).trim()
		: '';
</script>

<section class="relative min-h-[calc(100dvh-72px)] overflow-hidden bg-neutral-900">
	{#if isFilled.image(primary.background_image)}
		<PrismicImage
			field={primary.background_image}
			class="absolute inset-0 h-full w-full object-cover"
		/>
	{:else}
		<div class="absolute inset-0 bg-primary-900"></div>
	{/if}

	<div class="absolute inset-0 bg-[#122720]/58"></div>
	<div
		class="absolute inset-0 bg-gradient-to-r from-[#122720]/80 via-[#122720]/42 to-[#122720]/22"
	></div>

	<div
		class="section-container relative flex min-h-[calc(100dvh-72px)] items-center py-16 md:py-20"
	>
		<div class="max-w-3xl">
			{#if isFilled.keyText(primary.main_headline)}
				<h1 class="max-w-3xl text-secondary-50">
					{primary.main_headline}
				</h1>
			{/if}

			{#if isFilled.keyText(primary.sub_headline)}
				<p class="mt-6 max-w-2xl text-xl leading-8 text-secondary-100 md:text-2xl md:leading-9">
					{primary.sub_headline}
				</p>
			{/if}

			{#if descriptionText}
				<div class="prose mt-6 max-w-2xl text-secondary-100/90">
					<PrismicRichText field={primary.description} />
				</div>
			{/if}

			{#if (isFilled.link(primary.call_to_action_link) && isFilled.keyText(primary.call_to_action_text)) || (isFilled.link(primary.secondary_button_link) && isFilled.keyText(primary.secondary_button_text))}
				<div class="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
					{#if isFilled.link(primary.call_to_action_link) && isFilled.keyText(primary.call_to_action_text)}
						<PrismicLink field={primary.call_to_action_link} class="btn-primary focus-ring">
							{primary.call_to_action_text}
						</PrismicLink>
					{/if}

					{#if isFilled.link(primary.secondary_button_link) && isFilled.keyText(primary.secondary_button_text)}
						<PrismicLink
							field={primary.secondary_button_link}
							class="focus-ring inline-flex items-center justify-center rounded-full border border-secondary-50/55 bg-secondary-50/10 px-6 py-3 text-sm font-semibold text-secondary-50 transition-colors hover:bg-secondary-50/18"
						>
							{primary.secondary_button_text}
						</PrismicLink>
					{/if}
				</div>
			{/if}
		</div>
	</div>
</section>
