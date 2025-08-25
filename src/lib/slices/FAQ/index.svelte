<script lang="ts">
	import type { FaqSlice } from '../../../prismicio-types';
	import { PrismicRichText } from '@prismicio/svelte';
	import { isFilled } from '@prismicio/client';

	export let slice: FaqSlice;

	let { primary, items } = slice;
	
	// Track which FAQ items are expanded
	let expandedItems: Set<number> = new Set();
	
	// Initialize expanded items based on expand_all setting
	$: if (primary.expand_all) {
		expandedItems = new Set(sortedFaqs.map((_, index) => index));
	}
	
	// Get section styles from color fields
	$: sectionStyle = getSectionStyle();
	
	function getSectionStyle() {
		let styles = '';
		if (isFilled.color(primary.background_color)) {
			styles += `background-color: ${primary.background_color}; `;
		}
		if (isFilled.color(primary.text_color)) {
			styles += `color: ${primary.text_color}; `;
		}
		return styles;
	}
	
	// Sort and filter FAQs
	$: sortedFaqs = (items || [])
		.filter(item => isFilled.keyText(item.question) && isFilled.richText(item.answer))
		.sort((a, b) => {
			// Featured items first
			if (a.featured && !b.featured) return -1;
			if (!a.featured && b.featured) return 1;
			
			// Then by order if specified
			const orderA = isFilled.number(a.order) ? a.order : 999;
			const orderB = isFilled.number(b.order) ? b.order : 999;
			return orderA - orderB;
		});
	
	// Get layout classes
	$: layoutClasses = getLayoutClasses(primary.layout);
	
	function getLayoutClasses(layout: string | null | undefined) {
		switch (layout) {
			case 'grid-2':
				return 'grid grid-cols-1 lg:grid-cols-2 gap-6';
			case 'list':
				return 'space-y-4 max-w-4xl mx-auto';
			case 'accordion':
			default:
				return 'space-y-4 max-w-4xl mx-auto';
		}
	}
	
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
			general: { icon: 'M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z', color: 'text-primary-600' },
			services: { icon: 'M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z', color: 'text-primary-600' },
			pricing: { icon: 'M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1', color: 'text-secondary-600' },
			scheduling: { icon: 'M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z', color: 'text-sage-600' },
			'what-to-expect': { icon: 'M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z', color: 'text-lavender-600' },
			confidentiality: { icon: 'M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z', color: 'text-primary-600' }
		};
		
		return categoryMap[category || ''] || { icon: 'M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z', color: 'text-primary-600' };
	}
</script>

<!-- FAQ Section with Professional Counseling Design -->
<section class="section-padding" style={sectionStyle || ''}>
	<div class="section-container">
		
		<!-- Section Header -->
		<div class="text-center mb-20 max-w-4xl mx-auto">
			{#if isFilled.keyText(primary.title)}
				<h2 class="text-display-lg mb-6" style={isFilled.color(primary.text_color) ? `color: ${primary.text_color}` : ''}>
					{primary.title}
				</h2>
			{/if}
			
			{#if isFilled.keyText(primary.subtitle)}
				<p class="text-subtitle mb-8" style={isFilled.color(primary.text_color) ? `color: ${primary.text_color}` : ''}>
					{primary.subtitle}
				</p>
			{/if}
			
			<!-- Helpful note -->
			<div class="bg-primary-50 rounded-xl p-6 border border-primary-200">
				<div class="flex items-center justify-center gap-2 mb-3">
					<svg class="w-5 h-5 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
					</svg>
					<span class="font-semibold text-primary-900">Still have questions?</span>
				</div>
				<p class="text-primary-800 text-sm">
					Don't hesitate to reach out. We're here to help you feel comfortable and informed about your counseling journey.
				</p>
			</div>
		</div>

		<!-- FAQ Items -->
		<div class={layoutClasses}>
			{#each sortedFaqs as faqItem, index}
				{@const categoryStyle = getCategoryStyle(faqItem.category)}
				{@const isExpanded = expandedItems.has(index)}
				
				<div class="card-elevated bg-white relative overflow-hidden transition-all duration-300 {faqItem.featured ? 'ring-2 ring-primary-200' : ''}">
					
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
							<div class="w-10 h-10 rounded-lg bg-neutral-100 flex items-center justify-center flex-shrink-0 mt-1">
								<svg class="w-5 h-5 {categoryStyle.color}" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2">
									<path stroke-linecap="round" stroke-linejoin="round" d={categoryStyle.icon}/>
								</svg>
							</div>
							
							<div class="flex-1 min-w-0">
								<!-- Question -->
								{#if isFilled.keyText(faqItem.question)}
									<h3 class="text-lg font-serif font-semibold mb-2 pr-8" style={isFilled.color(primary.text_color) ? `color: ${primary.text_color}` : ''}>
										{faqItem.question}
									</h3>
								{/if}
								
								<!-- Category badge -->
								{#if isFilled.select(faqItem.category)}
									<span class="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-neutral-100 text-neutral-700 capitalize">
										{faqItem.category.replace('-', ' ')}
									</span>
								{/if}
							</div>
							
							<!-- Expand/Collapse Icon -->
							{#if primary.show_icons}
								<div class="flex-shrink-0 ml-4">
									<svg 
										class="w-5 h-5 transition-transform duration-200 {isExpanded ? 'rotate-180' : ''}"
										style={isFilled.color(primary.accent_color) ? `color: ${primary.accent_color}` : 'color: #6b7280'}
										fill="none" 
										stroke="currentColor" 
										viewBox="0 0 24 24"
									>
										<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/>
									</svg>
								</div>
							{/if}
						</div>
					</button>
					
					<!-- Answer Content -->
					{#if isExpanded}
						<div class="px-6 pb-6 border-t border-neutral-100 animate-slide-down">
							{#if isFilled.richText(faqItem.answer)}
								<div class="prose prose-sm max-w-none pt-4" style={isFilled.color(primary.text_color) ? `color: ${primary.text_color}` : ''}>
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
					<svg class="w-8 h-8 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"/>
					</svg>
					<h3 class="text-xl font-serif font-semibold text-neutral-900">Need More Information?</h3>
				</div>
				<p class="text-neutral-700 mb-6 leading-relaxed">
					Every therapeutic journey is unique. If you have specific questions about your situation or our approach, we're here to help you feel fully informed and comfortable.
				</p>
				<div class="flex flex-col sm:flex-row gap-4 justify-center">
					<a 
						href="/contact" 
						class="btn-primary inline-flex items-center gap-2 hover-lift focus-ring"
					>
						<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
						</svg>
						Send Us a Message
					</a>
					<a 
						href="tel:+1234567890" 
						class="btn-secondary inline-flex items-center gap-2 hover-lift focus-ring"
					>
						<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/>
						</svg>
						Call for a Consultation
					</a>
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
