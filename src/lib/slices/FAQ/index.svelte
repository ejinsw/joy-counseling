<script lang="ts">
	import type { FaqSlice } from '../../../prismicio-types';
	import { PrismicLink, PrismicRichText } from '@prismicio/svelte';
	import { isFilled } from '@prismicio/client';
	import { ChevronDown, ChevronUp, MessageCircle, Phone } from '@lucide/svelte';

	export let slice: FaqSlice;

	let { primary, items } = slice;

	// Track which FAQ items are expanded
	let expandedItems: Set<number> = new Set();

	// Sort and filter FAQs
	$: sortedFaqs = (items || [])
		.filter((item) => isFilled.keyText(item.question) && isFilled.richText(item.answer))
		.sort((a, b) => {
			// Featured items first
			if (a.featured && !b.featured) return -1;
			if (!a.featured && b.featured) return 1;

			return 0;
		});

	// Toggle FAQ item expansion
	function toggleExpanded(index: number) {
		expandedItems = new Set(expandedItems);
		if (expandedItems.has(index)) {
			expandedItems.delete(index);
		} else {
			expandedItems.add(index);
		}
	}

	// Get category icon and color
	function getCategoryStyle(category: string | null | undefined) {
		const categoryMap: Record<string, { icon: string; color: string }> = {
			general: {
				icon: 'M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z',
				color: 'text-primary-600'
			},
			services: {
				icon: 'M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z',
				color: 'text-primary-600'
			},
			pricing: {
				icon: 'M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1',
				color: 'text-secondary-600'
			},
			scheduling: {
				icon: 'M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z',
				color: 'text-sage-600'
			},
			'what-to-expect': {
				icon: 'M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z',
				color: 'text-lavender-600'
			},
			confidentiality: {
				icon: 'M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z',
				color: 'text-primary-600'
			}
		};

		return (
			categoryMap[category || ''] || {
				icon: 'M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z',
				color: 'text-primary-600'
			}
		);
	}
</script>

<!-- FAQ Section with Professional Counseling Design -->
<section class="section-padding">
	<div class="section-container">
		<!-- Section Header -->
		<div class="text-center mb-20 max-w-4xl mx-auto">
			{#if isFilled.keyText(primary.title)}
				<h2
					class="text-display-lg mb-6"
				>
					{primary.title}
				</h2>
			{/if}

			{#if isFilled.keyText(primary.subtitle)}
				<p
					class="text-subtitle mb-8"
				>
					{primary.subtitle}
				</p>
			{/if}
		</div>

		<!-- FAQ Items -->
		<div class="space-y-4 max-w-4xl mx-auto">
			{#each sortedFaqs as faqItem, index}
				{@const categoryStyle = getCategoryStyle(faqItem.category)}
				{@const isExpanded = expandedItems.has(index)}

				<div
					class="card-elevated bg-white relative overflow-hidden transition-all duration-300 {faqItem.featured
						? 'ring-2 ring-primary-200'
						: ''}"
				>
					<!-- Featured badge -->
					{#if faqItem.featured}
						<div class="absolute top-4 right-4">
							<div class="px-3 py-1 bg-primary-600 text-white text-xs font-medium rounded-full">
								Popular
							</div>
						</div>
					{/if}

					<!-- Question Header -->
					<button
						class="w-full p-6 text-left focus-ring rounded-t-xl hover:bg-neutral-50 transition-colors duration-200"
						onclick={() => toggleExpanded(index)}
						aria-expanded={isExpanded}
					>
						<div class="flex items-start gap-4">
							<!-- Category Icon -->
							<div
								class="w-10 h-10 rounded-lg bg-neutral-100 flex items-center justify-center flex-shrink-0 mt-1"
							>
								<svg
									class="w-5 h-5 {categoryStyle.color}"
									fill="none"
									stroke="currentColor"
									viewBox="0 0 24 24"
									stroke-width="2"
								>
									<path stroke-linecap="round" stroke-linejoin="round" d={categoryStyle.icon} />
								</svg>
							</div>

							<div class="flex-1 min-w-0">
								<!-- Question -->
								{#if isFilled.keyText(faqItem.question)}
									<h3
										class="text-lg font-serif font-semibold mb-2 pr-8"
									>
										{faqItem.question}
									</h3>
								{/if}

								<!-- Category badge -->
								{#if isFilled.select(faqItem.category)}
									<span
										class="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-neutral-100 text-neutral-700 capitalize"
									>
										{faqItem.category.replace('-', ' ')}
									</span>
								{/if}
							</div>

							<!-- Expand/Collapse Icon -->
							<div class="flex-shrink-0 ml-4">
								{#if isExpanded}
									<ChevronUp class="w-5 h-5" />
								{:else}
									<ChevronDown class="w-5 h-5" />
								{/if}
							</div>
						</div>
					</button>

					<!-- Answer Content -->
					{#if isExpanded}
						<div class="px-6 pb-6 border-t border-neutral-100 animate-slide-down">
							{#if isFilled.richText(faqItem.answer)}
								<div
									class="prose prose-sm max-w-none pt-4"
								>
									<PrismicRichText field={faqItem.answer} />
								</div>
							{/if}
						</div>
					{/if}
				</div>
			{/each}
		</div>

		<!-- Contact for More Questions -->
		<div class="max-w-3xl mx-auto mt-16">
			<div class="bg-calm-gradient rounded-2xl p-8 text-center border border-primary-200">
				<div class="flex items-center justify-center gap-3 mb-4">
					<MessageCircle class="w-8 h-8 text-primary-600" />
					<h3 class="text-xl font-serif font-semibold text-neutral-900">
						{primary.contact_section_title}
					</h3>
				</div>
				<p class="text-neutral-700 mb-6 leading-relaxed">
					{primary.contact_section_description}
				</p>
				<div class="flex flex-col sm:flex-row gap-4 justify-center">
					<PrismicLink
						field={primary.contact_button_1_link}
						class="btn-primary inline-flex items-center gap-2 hover-lift focus-ring"
					>
						<MessageCircle class="w-4 h-4" />
						{primary.contact_button_1_text}
					</PrismicLink>
					<PrismicLink
						field={primary.contact_button_2_link}
						class="btn-secondary inline-flex items-center gap-2 hover-lift focus-ring"
					>
						<Phone class="w-4 h-4" />
						{primary.contact_button_2_text}
					</PrismicLink>
				</div>
			</div>
		</div>
	</div>
</section>

<style>
	@keyframes slide-down {
		from {
			opacity: 0;
			transform: translateY(-10px);
		}
		to {
			opacity: 1;
			transform: translateY(0);
		}
	}

	.animate-slide-down {
		animation: slide-down 0.3s ease-out forwards;
	}
</style>
