<script lang="ts">
	import { page } from '$app/state';
	import { isFilled } from '@prismicio/client';
	import { PrismicImage, PrismicLink, PrismicRichText } from '@prismicio/svelte';
	import { ChevronDown } from '@lucide/svelte';
	import { localeFromPath, uiText } from '$lib/i18n';
	import type { FaqSlice } from '../../../prismicio-types';

	type FaqPrimaryWithSecondaryButton = FaqSlice['primary'] & {
		contact_button_2_text?: FaqSlice['primary']['contact_button_1_text'];
		contact_button_2_link?: FaqSlice['primary']['contact_button_1_link'];
	};

	let { slice }: { slice: FaqSlice } = $props();
	let { primary: basePrimary, items } = slice;
	const primary = basePrimary as FaqPrimaryWithSecondaryButton;
	let expandedItems = $state<Set<number>>(new Set());
	const locale = $derived(localeFromPath(page.url.pathname));
	const copy = $derived(uiText[locale]);
	const sortedFaqs = $derived(
		(items || [])
			.filter((item) => isFilled.keyText(item.question) && isFilled.richText(item.answer))
			.sort((a, b) => {
				if (a.featured && !b.featured) return -1;
				if (!a.featured && b.featured) return 1;
				return 0;
			})
	);

	function toggleExpanded(index: number) {
		const nextItems = new Set(expandedItems);
		if (nextItems.has(index)) {
			nextItems.delete(index);
		} else {
			nextItems.add(index);
		}
		expandedItems = nextItems;
	}
</script>

<section class="section-padding border-t border-neutral-200 bg-white">
	<div class="section-container">
		<div class="mb-12 max-w-3xl">
			{#if isFilled.keyText(primary.title)}
				<h2 class="text-display-lg">{primary.title}</h2>
			{/if}

			{#if isFilled.keyText(primary.subtitle)}
				<p class="mt-4 text-lg leading-8 text-neutral-600">
					{primary.subtitle}
				</p>
			{/if}
		</div>

		{#if sortedFaqs.length > 0}
			<div class="mx-auto max-w-4xl divide-y divide-neutral-200 border-y border-neutral-200">
				{#each sortedFaqs as faqItem, index}
					{@const isExpanded = expandedItems.has(index)}
					<div>
						<button
							class="focus-ring flex w-full items-start justify-between gap-6 rounded-none px-0 py-6 text-left"
							onclick={() => toggleExpanded(index)}
							aria-expanded={isExpanded}
							aria-controls={`faq-answer-${index}`}
						>
							<span class="text-lg font-semibold leading-7 text-neutral-900">
								{faqItem.question}
							</span>
							<ChevronDown
								class={`mt-1 h-5 w-5 shrink-0 text-primary-800 transition-transform ${
									isExpanded ? 'rotate-180' : ''
								}`}
								aria-hidden="true"
							/>
						</button>

						{#if isExpanded}
							<div id={`faq-answer-${index}`} class="prose max-w-3xl pb-7 text-neutral-700">
								<PrismicRichText field={faqItem.answer} />
							</div>
						{/if}
					</div>
				{/each}
			</div>
		{/if}

		{#if isFilled.keyText(primary.contact_section_title) || isFilled.keyText(primary.contact_section_description)}
			<div class="mt-16">
				{#if isFilled.image(primary.cta_image)}
					<div class="grid items-center gap-10 lg:grid-cols-[0.95fr_1fr] lg:gap-16">
						<div class="relative mx-auto w-full max-w-[34rem] lg:mx-0">
							<div class="cta-image-shell overflow-hidden bg-neutral-100">
								<PrismicImage field={primary.cta_image} class="h-full w-full object-cover" />
							</div>
						</div>

						<div>
							{#if isFilled.keyText(primary.contact_section_title)}
								<h3 class="text-display-lg max-w-3xl font-semibold text-[#252a3a]">
									{primary.contact_section_title}
								</h3>
							{/if}

							<div class="mt-8 flex items-center gap-5">
								<span class="h-0.5 w-20 shrink-0 bg-primary-600/55"></span>
								<p class="text-2xl font-semibold leading-8 text-[#252a3a]">
									{copy.common.ctaIntro}
								</p>
							</div>

							{#if isFilled.keyText(primary.contact_section_description)}
								<p class="mt-8 max-w-3xl text-xl leading-9 text-neutral-800">
									{primary.contact_section_description}
								</p>
							{/if}

							{#if (isFilled.link(primary.contact_button_1_link) && isFilled.keyText(primary.contact_button_1_text)) || (isFilled.link(primary.contact_button_2_link) && isFilled.keyText(primary.contact_button_2_text))}
								<div class="mt-9 flex flex-col gap-4 sm:flex-row">
									{#if isFilled.link(primary.contact_button_1_link) && isFilled.keyText(primary.contact_button_1_text)}
										<PrismicLink
											field={primary.contact_button_1_link}
											class="focus-ring inline-flex min-h-14 items-center justify-center rounded-md bg-[#252a3a] px-8 py-3 text-base font-semibold text-white transition-colors hover:bg-[#1d2230] sm:min-w-56"
										>
											{primary.contact_button_1_text}
										</PrismicLink>
									{/if}

									{#if isFilled.link(primary.contact_button_2_link) && isFilled.keyText(primary.contact_button_2_text)}
										<PrismicLink
											field={primary.contact_button_2_link}
											class="focus-ring inline-flex min-h-14 items-center justify-center rounded-md bg-primary-500 px-8 py-3 text-base font-semibold text-white transition-colors hover:bg-primary-600 sm:min-w-56"
										>
											{primary.contact_button_2_text}
										</PrismicLink>
									{/if}
								</div>
							{/if}
						</div>
					</div>
				{:else}
					<div class="mx-auto max-w-4xl">
						{#if isFilled.keyText(primary.contact_section_title)}
							<h3 class="text-display-lg font-semibold text-[#252a3a]">
								{primary.contact_section_title}
							</h3>
						{/if}

						{#if isFilled.keyText(primary.contact_section_description)}
							<p class="mt-6 max-w-3xl text-xl leading-9 text-neutral-800">
								{primary.contact_section_description}
							</p>
						{/if}

						{#if (isFilled.link(primary.contact_button_1_link) && isFilled.keyText(primary.contact_button_1_text)) || (isFilled.link(primary.contact_button_2_link) && isFilled.keyText(primary.contact_button_2_text))}
							<div class="mt-8 flex flex-col gap-4 sm:flex-row">
								{#if isFilled.link(primary.contact_button_1_link) && isFilled.keyText(primary.contact_button_1_text)}
									<PrismicLink
										field={primary.contact_button_1_link}
										class="focus-ring inline-flex min-h-14 items-center justify-center rounded-md bg-[#252a3a] px-8 py-3 text-base font-semibold text-white transition-colors hover:bg-[#1d2230]"
									>
										{primary.contact_button_1_text}
									</PrismicLink>
								{/if}

								{#if isFilled.link(primary.contact_button_2_link) && isFilled.keyText(primary.contact_button_2_text)}
									<PrismicLink
										field={primary.contact_button_2_link}
										class="focus-ring inline-flex min-h-14 items-center justify-center rounded-md border border-primary-800/35 bg-white px-8 py-3 text-base font-semibold text-primary-900 transition-colors hover:bg-primary-50"
									>
										{primary.contact_button_2_text}
									</PrismicLink>
								{/if}
							</div>
						{/if}
					</div>
				{/if}
			</div>
		{/if}
	</div>
</section>
