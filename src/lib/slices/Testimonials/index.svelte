<script lang="ts">
	import type { TestimonialsSlice } from '../../../prismicio-types';
	import { PrismicLink, PrismicRichText } from '@prismicio/svelte';
	import { PrismicImage } from '@prismicio/svelte';
	import { isFilled, asDate } from '@prismicio/client';
	import { MessageCircle, Star } from '@lucide/svelte';

	export let slice: TestimonialsSlice;

	let { primary, items } = slice;

	// Sort testimonials - featured first, then by rating
	$: sortedTestimonials = (items || [])
		.filter((t) => isFilled.richText(t.testimonial_text) && isFilled.keyText(t.client_name))
		.sort((a, b) => {
			// Featured testimonials first
			if (a.featured && !b.featured) return -1;
			if (!a.featured && b.featured) return 1;

			// Then by rating (highest first)
			const ratingA = parseInt(a.rating as string) || 0;
			const ratingB = parseInt(b.rating as string) || 0;
			return ratingB - ratingA;
		});
</script>

<!-- Testimonials Section with Professional Counseling Design -->
<section class="section-padding">
	<div class="section-container">
		<!-- Section Header -->
		<div class="text-center mb-20 max-w-4xl mx-auto">
			{#if isFilled.keyText(primary.title)}
				<h2 class="text-display-lg mb-6">
					{primary.title}
				</h2>
			{/if}

			{#if isFilled.keyText(primary.subtitle)}
				<p class="text-subtitle mb-8">
					{primary.subtitle}
				</p>
			{/if}

			<!-- Trust indicators -->
			<div class="flex flex-wrap justify-center gap-8 text-sm text-neutral-600">
				<div class="flex items-center gap-2">
					<svg
						class="w-4 h-4 text-primary-600"
						fill="none"
						stroke="currentColor"
						viewBox="0 0 24 24"
					>
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
						/>
					</svg>
					<span>Verified Client Reviews</span>
				</div>
				<div class="flex items-center gap-2">
					<svg
						class="w-4 h-4 text-primary-600"
						fill="none"
						stroke="currentColor"
						viewBox="0 0 24 24"
					>
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
						/>
					</svg>
					<span>Confidentiality Protected</span>
				</div>
			</div>
		</div>

		<!-- Testimonials Grid/Layout -->
		<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
			{#each sortedTestimonials as testimonial, index}
				<article
					class="card-elevated bg-white relative overflow-hidden group hover-lift transition-all duration-300 {testimonial.featured
						? 'ring-2 ring-primary-200'
						: ''}"
				>
					<!-- Quote decoration -->
					<div class="absolute top-0 left-0 w-16 h-16 opacity-10">
						<svg class="w-full h-full" fill="currentColor" viewBox="0 0 24 24">
							<path
								d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h4v10h-10z"
							/>
						</svg>
					</div>

					<div class="relative p-8">
						<!-- Testimonial Text -->
						{#if isFilled.richText(testimonial.testimonial_text)}
							<div class="testimonial-quote mb-6">
								<PrismicRichText field={testimonial.testimonial_text} />
							</div>
						{/if}

						<!-- Rating Stars -->
						{#if isFilled.select(testimonial.rating)}
							{@const rating = parseInt(testimonial.rating as string) || 5}
							<div class="flex items-center gap-1 mb-6 justify-center">
								{#each Array(rating) as _}
									<Star class="w-5 h-5 text-yellow-500" fill="currentColor" />
								{/each}
								{#each Array(5 - rating) as _}
									<Star class="w-5 h-5 text-neutral-300" fill="currentColor" />
								{/each}
							</div>
						{/if}

						<!-- Client Information -->
						<div class="flex items-center gap-4 pt-4 border-t border-neutral-200">
							<!-- Client Photo -->
							{#if isFilled.image(testimonial.client_photo)}
								<div
									class="w-14 h-14 rounded-full overflow-hidden ring-2 ring-primary-100 flex-shrink-0"
								>
									<PrismicImage
										field={testimonial.client_photo}
										class="w-full h-full object-cover"
									/>
								</div>
							{:else if isFilled.keyText(testimonial.client_name)}
								<div
									class="w-14 h-14 rounded-full bg-primary-100 text-primary-700 flex items-center justify-center font-semibold text-lg flex-shrink-0"
								>
									{testimonial.client_name[0]}
								</div>
							{/if}

							<div class="flex-1 min-w-0">
								<!-- Client Name -->
								{#if isFilled.keyText(testimonial.client_name)}
									<p class="font-semibold text-neutral-900 mb-1">
										{testimonial.client_name}
									</p>
								{/if}

								<!-- Service Received -->
								{#if isFilled.keyText(testimonial.service_received)}
									<p class="text-sm text-neutral-600 mb-1">
										{testimonial.service_received}
									</p>
								{/if}

								<!-- Session Date -->
								{#if isFilled.date(testimonial.session_date)}
									{@const date = asDate(testimonial.session_date)}
									<p class="text-xs text-neutral-500">
										{date?.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
									</p>
								{/if}
							</div>

							<!-- Verified badge -->
							<div class="flex-shrink-0">
								<div class="w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center">
									<svg
										class="w-4 h-4 text-primary-600"
										fill="none"
										stroke="currentColor"
										viewBox="0 0 24 24"
									>
										<path
											stroke-linecap="round"
											stroke-linejoin="round"
											stroke-width="2"
											d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
										/>
									</svg>
								</div>
							</div>
						</div>
					</div>
				</article>
			{/each}
		</div>
	</div>
</section>
