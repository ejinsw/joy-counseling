<script lang="ts">
	import { PrismicLink, PrismicRichText } from '@prismicio/svelte';
	import { PrismicImage } from '@prismicio/svelte';
	import { isFilled } from '@prismicio/client';
	import type { AboutSectionSlice, AboutSectionSliceDefaultPrimary } from '../../../prismicio-types';

	export let slice: AboutSectionSlice;

	let { primary } = slice;
</script>

<!-- About Section with Professional Counseling Design -->
<section class="section-padding bg-white" data-slice-type={slice.slice_type} data-slice-variation={slice.variation}>
	<div class="section-container">
		{#if slice.variation === 'default'}
			<!-- Default Header Variant -->
			<!-- Section Header -->
			<div class="text-center mb-16 max-w-3xl mx-auto">
				{#if isFilled.keyText(primary.title)}
					<h2 class="text-display-lg mb-6 text-neutral-900">
						{primary.title}
					</h2>
				{/if}

				{#if isFilled.keyText(primary.subtitle)}
					<p class="text-subtitle text-neutral-600">
						{primary.subtitle}
					</p>
				{/if}
			</div>

			<!-- Main Content -->
			<div class="grid grid-cols-1 lg:grid-cols-2 gap-16 xl:gap-20 items-center">
				<!-- Professional Image -->
				<div class="order-2 lg:order-1">
					{#if isFilled.image(primary.image)}
						<div class="relative">
							<!-- Main image container -->
							<div class="relative overflow-hidden rounded-2xl shadow-large">
								<PrismicImage
									field={primary.image}
									class="w-full h-auto object-cover transition-transform duration-500 hover:scale-105"
								/>

								<!-- Professional overlay -->
								<div
									class="absolute inset-0 bg-gradient-to-t from-neutral-900/20 to-transparent"
								></div>
							</div>

							<!-- Decorative elements -->
							<div
								class="absolute -top-4 -left-4 w-24 h-24 bg-sage-100 rounded-full opacity-60 -z-10"
							></div>
							<div
								class="absolute -bottom-6 -right-6 w-32 h-32 bg-primary-100 rounded-full opacity-50 -z-10"
							></div>
						</div>
					{:else}
						<!-- Fallback professional placeholder -->
						<div
							class="relative bg-calm-gradient rounded-2xl shadow-large h-96 flex flex-col items-center justify-center text-center p-8"
						>
							<div
								class="w-20 h-20 bg-primary-600 rounded-full flex items-center justify-center mb-4"
							>
								<svg
									class="w-10 h-10 text-white"
									fill="none"
									stroke="currentColor"
									viewBox="0 0 24 24"
								>
									<path
										stroke-linecap="round"
										stroke-linejoin="round"
										stroke-width="2"
										d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
									/>
								</svg>
							</div>
							<h3 class="text-lg font-serif font-semibold text-neutral-800 mb-2">
								Professional Team
							</h3>
							<p class="text-neutral-600 text-sm">Licensed mental health professionals</p>
						</div>
					{/if}
				</div>

				<!-- Content and Credentials -->
				<div class="order-1 lg:order-2 space-y-8">
					<!-- Main content -->
					{#if isFilled.richText(primary.content)}
						<div class="prose prose-lg max-w-none text-neutral-700">
							<PrismicRichText field={primary.content} />
						</div>
					{/if}

					{#if isFilled.keyText((primary as AboutSectionSliceDefaultPrimary).cta_button_text)}
						<!-- Call to Action -->
						<div class="pt-4">
							<PrismicLink
								field={(primary as AboutSectionSliceDefaultPrimary).cta_button_link}
								class="btn-primary inline-flex items-center gap-2 hover-lift focus-ring"
							>
								<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
									<path
										stroke-linecap="round"
										stroke-linejoin="round"
										stroke-width="2"
										d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
									/>
								</svg>
								{(primary as AboutSectionSliceDefaultPrimary).cta_button_text}
							</PrismicLink>
						</div>
					{/if}
				</div>
			</div>
		{:else}
			<!-- Item-Left and Item-Right Variants -->
			<!-- Main Content with conditional layout -->
			<div class="grid grid-cols-1 lg:grid-cols-2 gap-16 xl:gap-20 items-center">
				<!-- Image - Left for Item-Left, Right for Item-Right -->
				<div class="order-2 {slice.variation === 'item' ? 'lg:order-1' : 'lg:order-2'}">
					{#if isFilled.image(primary.image)}
						<div class="relative">
							<!-- Main image container -->
							<div class="relative overflow-hidden rounded-2xl shadow-large">
								<PrismicImage
									field={primary.image}
									class="w-full h-auto object-cover transition-transform duration-500 hover:scale-105"
								/>

								<!-- Professional overlay -->
								<div
									class="absolute inset-0 bg-gradient-to-t from-neutral-900/20 to-transparent"
								></div>
							</div>

							<!-- Decorative elements -->
							<div
								class="absolute -top-4 -left-4 w-24 h-24 bg-sage-100 rounded-full opacity-60 -z-10"
							></div>
							<div
								class="absolute -bottom-6 -right-6 w-32 h-32 bg-primary-100 rounded-full opacity-50 -z-10"
							></div>
						</div>
					{:else}
						<!-- Fallback professional placeholder -->
						<div
							class="relative bg-calm-gradient rounded-2xl shadow-large h-96 flex flex-col items-center justify-center text-center p-8"
						>
							<div
								class="w-20 h-20 bg-primary-600 rounded-full flex items-center justify-center mb-4"
							>
								<svg
									class="w-10 h-10 text-white"
									fill="none"
									stroke="currentColor"
									viewBox="0 0 24 24"
								>
									<path
										stroke-linecap="round"
										stroke-linejoin="round"
										stroke-width="2"
										d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
									/>
								</svg>
							</div>
							<h3 class="text-lg font-serif font-semibold text-neutral-800 mb-2">
								Professional Team
							</h3>
							<p class="text-neutral-600 text-sm">Licensed mental health professionals</p>
						</div>
					{/if}
				</div>

				<!-- Content -->
				<div class="order-1 {slice.variation === 'item' ? 'lg:order-2' : 'lg:order-1'} space-y-8">
					<!-- Title and Subtitle -->
					<div>
						{#if isFilled.keyText(primary.title)}
							<h2 class="text-display-lg mb-6 text-neutral-900">
								{primary.title}
							</h2>
						{/if}

						{#if isFilled.keyText(primary.subtitle)}
							<p class="text-subtitle text-neutral-600 mb-6">
								{primary.subtitle}
							</p>
						{/if}
					</div>

					<!-- Main content -->
					{#if isFilled.richText(primary.content)}
						<div class="prose prose-lg max-w-none text-neutral-700">
							<PrismicRichText field={primary.content} />
						</div>
					{/if}
				</div>
			</div>
		{/if}
	</div>
</section>
