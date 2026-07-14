<script lang="ts">
	import { page } from '$app/state';
	import { asText, isFilled } from '@prismicio/client';
	import { PrismicImage, PrismicLink, PrismicRichText } from '@prismicio/svelte';
	import DocumentModal from '$lib/components/DocumentModal.svelte';
	import { localeFromPath, uiText } from '$lib/i18n';
	import type {
		AboutSectionSlice,
		AboutSectionSliceDefaultPrimary
	} from '../../../prismicio-types';

	let { slice }: { slice: AboutSectionSlice } = $props();
	let { primary } = slice;
	let isModalOpen = $state(false);
	const defaultPrimary = primary as AboutSectionSliceDefaultPrimary;
	const imageFirstDesktop = slice.variation === 'default' || slice.variation === 'item';
	const contentText = isFilled.richText(primary.content) ? asText(primary.content) : '';
	const locale = $derived(localeFromPath(page.url.pathname));
	const copy = $derived(uiText[locale]);
</script>

<section
	class="section-padding border-t border-neutral-200 bg-secondary-50"
	data-slice-type={slice.slice_type}
	data-slice-variation={slice.variation}
>
	<div class="section-container">
		<div class="grid items-center gap-10 lg:grid-cols-2 lg:gap-14">
			<div class={`order-1 ${imageFirstDesktop ? 'lg:order-2' : 'lg:order-1'}`}>
				{#if isFilled.keyText(primary.title)}
					<h2 class="text-display-lg">{primary.title}</h2>
				{/if}

				{#if isFilled.keyText(primary.subtitle)}
					<p class="mt-4 text-lg leading-8 text-neutral-600">
						{primary.subtitle}
					</p>
				{/if}

				{#if contentText}
					<p class="truncate-block mt-7 leading-8 text-neutral-700">
						{contentText}
					</p>

					<button
						type="button"
						class="focus-ring mt-6 inline-flex rounded-md border border-primary-800/35 px-4 py-2 text-sm font-semibold text-primary-900 transition-colors hover:bg-primary-50"
						onclick={() => (isModalOpen = true)}
					>
						{copy.common.readMore}
					</button>

					<DocumentModal
						open={isModalOpen}
						title={primary.title}
						subtitle={primary.subtitle}
						onClose={() => (isModalOpen = false)}
					>
						<PrismicRichText field={primary.content} />

						{#if isFilled.keyText(defaultPrimary.cta_button_text) && isFilled.link(defaultPrimary.cta_button_link)}
							<div class="not-prose mt-8">
								<PrismicLink field={defaultPrimary.cta_button_link} class="btn-primary focus-ring">
									{defaultPrimary.cta_button_text}
								</PrismicLink>
							</div>
						{/if}
					</DocumentModal>
				{/if}

				{#if isFilled.keyText(defaultPrimary.cta_button_text) && isFilled.link(defaultPrimary.cta_button_link)}
					<div class="mt-8">
						<PrismicLink field={defaultPrimary.cta_button_link} class="btn-primary focus-ring">
							{defaultPrimary.cta_button_text}
						</PrismicLink>
					</div>
				{/if}
			</div>

			{#if isFilled.image(primary.image)}
				<div class={`order-2 ${imageFirstDesktop ? 'lg:order-1' : 'lg:order-2'}`}>
					<div class="overflow-hidden rounded-md">
						<PrismicImage field={primary.image} class="block h-full w-full object-cover" />
					</div>
				</div>
			{/if}
		</div>
	</div>
</section>
