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
	const imageFirstDesktop = slice.variation === 'default';
	const contentText = isFilled.richText(primary.content)
		? asText(primary.content)
				.replace(/https?:\/\/\S+/g, '')
				.replace(/\s+/g, ' ')
				.trim()
		: '';
	const locale = $derived(localeFromPath(page.url.pathname));
	const copy = $derived(uiText[locale]);
</script>

<section
	class="section-padding overflow-hidden border-t border-neutral-200 bg-white"
	data-slice-type={slice.slice_type}
	data-slice-variation={slice.variation}
>
	<div class="section-container">
		<div
			class={`items-center gap-10 lg:gap-16 ${
				isFilled.image(primary.image)
					? imageFirstDesktop
						? 'grid lg:grid-cols-[0.95fr_1fr]'
						: 'grid lg:grid-cols-[1fr_0.95fr]'
					: 'mx-auto max-w-4xl'
			}`}
		>
			<div
				class={isFilled.image(primary.image)
					? imageFirstDesktop
						? 'lg:order-2'
						: 'lg:order-1'
					: ''}
			>
				{#if isFilled.keyText(primary.title)}
					<h2 class="text-display-lg max-w-3xl font-semibold text-[#252a3a]">{primary.title}</h2>
				{/if}

				{#if isFilled.keyText(primary.subtitle)}
					<div class="mt-8 flex items-center gap-5">
						<span class="h-0.5 w-20 shrink-0 bg-primary-600/55"></span>
						<p class="text-2xl font-semibold leading-8 text-[#252a3a]">
							{primary.subtitle}
						</p>
					</div>
				{/if}

				{#if contentText}
					<p class="truncate-block mt-8 max-w-3xl text-xl leading-9 text-neutral-800">
						{contentText}
					</p>

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

				{#if contentText || (isFilled.keyText(defaultPrimary.cta_button_text) && isFilled.link(defaultPrimary.cta_button_link))}
					<div class="mt-9 flex flex-col gap-4 sm:flex-row">
						{#if contentText}
							<button
								type="button"
								class="focus-ring inline-flex min-h-14 items-center justify-center rounded-md bg-[#252a3a] px-8 py-3 text-base font-semibold text-white transition-colors hover:bg-[#1d2230]"
								onclick={() => (isModalOpen = true)}
							>
								{copy.common.readMore}
							</button>
						{/if}

						{#if isFilled.keyText(defaultPrimary.cta_button_text) && isFilled.link(defaultPrimary.cta_button_link)}
							<PrismicLink field={defaultPrimary.cta_button_link} class="btn-primary focus-ring">
								{defaultPrimary.cta_button_text}
							</PrismicLink>
						{/if}
					</div>
				{/if}
			</div>

			{#if isFilled.image(primary.image)}
				<div
					class={`mx-auto w-full max-w-[34rem] lg:mx-0 ${
						imageFirstDesktop ? 'lg:order-1 lg:mr-auto' : 'lg:order-2 lg:ml-auto'
					}`}
				>
					<div class="about-image-shell overflow-hidden bg-neutral-100">
						<PrismicImage field={primary.image} class="block h-full w-full object-cover" />
					</div>
				</div>
			{/if}
		</div>
	</div>
</section>
