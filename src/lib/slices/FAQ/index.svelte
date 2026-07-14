<script lang="ts">
	import { isFilled } from '@prismicio/client';
	import { PrismicLink, PrismicRichText } from '@prismicio/svelte';
	import { ChevronDown } from '@lucide/svelte';
	import type { FaqSlice } from '../../../prismicio-types';

	export let slice: FaqSlice;

	let { primary, items } = slice;
	let expandedItems: Set<number> = new Set();

	$: sortedFaqs = (items || [])
		.filter((item) => isFilled.keyText(item.question) && isFilled.richText(item.answer))
		.sort((a, b) => {
			if (a.featured && !b.featured) return -1;
			if (!a.featured && b.featured) return 1;
			return 0;
		});

	function toggleExpanded(index: number) {
		expandedItems = new Set(expandedItems);
		if (expandedItems.has(index)) {
			expandedItems.delete(index);
		} else {
			expandedItems.add(index);
		}
	}
</script>

<section class="section-padding border-t border-neutral-200 bg-[#fbfcf8]">
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
			<div
				class="edge-surface mx-auto mt-12 max-w-4xl rounded-md border border-neutral-200 p-6 md:p-8"
			>
				{#if isFilled.keyText(primary.contact_section_title)}
					<h3 class="text-2xl font-semibold text-neutral-900">
						{primary.contact_section_title}
					</h3>
				{/if}

				{#if isFilled.keyText(primary.contact_section_description)}
					<p class="mt-3 max-w-2xl leading-7 text-neutral-700">
						{primary.contact_section_description}
					</p>
				{/if}

				{#if (isFilled.link(primary.contact_button_1_link) && isFilled.keyText(primary.contact_button_1_text)) || (isFilled.link(primary.contact_button_2_link) && isFilled.keyText(primary.contact_button_2_text))}
					<div class="mt-6 flex flex-col gap-3 sm:flex-row">
						{#if isFilled.link(primary.contact_button_1_link) && isFilled.keyText(primary.contact_button_1_text)}
							<PrismicLink field={primary.contact_button_1_link} class="btn-primary focus-ring">
								{primary.contact_button_1_text}
							</PrismicLink>
						{/if}

						{#if isFilled.link(primary.contact_button_2_link) && isFilled.keyText(primary.contact_button_2_text)}
							<PrismicLink field={primary.contact_button_2_link} class="btn-secondary focus-ring">
								{primary.contact_button_2_text}
							</PrismicLink>
						{/if}
					</div>
				{/if}
			</div>
		{/if}
	</div>
</section>
