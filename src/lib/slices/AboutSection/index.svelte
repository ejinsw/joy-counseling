<script lang="ts">
	import type { AboutSectionSlice } from '../../../prismicio-types';
	import { PrismicRichText } from '@prismicio/svelte';
	import { PrismicImage } from '@prismicio/svelte';
	import { isFilled } from '@prismicio/client';

	export let slice: AboutSectionSlice;

	let { primary } = slice;
</script>

<!-- About Section with Professional Counseling Design -->
<section class="section-padding bg-white">
	<div class="section-container">
		
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
							<div class="absolute inset-0 bg-gradient-to-t from-neutral-900/20 to-transparent"></div>
						</div>
						
						<!-- Decorative elements -->
						<div class="absolute -top-4 -left-4 w-24 h-24 bg-sage-100 rounded-full opacity-60 -z-10"></div>
						<div class="absolute -bottom-6 -right-6 w-32 h-32 bg-primary-100 rounded-full opacity-50 -z-10"></div>
						
						<!-- Trust badge -->
						<div class="absolute bottom-6 left-6 bg-white/95 backdrop-blur-sm rounded-lg px-4 py-2 shadow-lg">
							<div class="flex items-center gap-2">
								<svg class="w-5 h-5 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
									<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
								</svg>
								<span class="text-sm font-medium text-neutral-800">Licensed Professional</span>
							</div>
						</div>
					</div>
				{:else}
					<!-- Fallback professional placeholder -->
					<div class="relative bg-calm-gradient rounded-2xl shadow-large h-96 flex flex-col items-center justify-center text-center p-8">
						<div class="w-20 h-20 bg-primary-600 rounded-full flex items-center justify-center mb-4">
							<svg class="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
								<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/>
							</svg>
						</div>
						<h3 class="text-lg font-serif font-semibold text-neutral-800 mb-2">Professional Team</h3>
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

				<!-- Professional Credentials & Features -->
				<div class="space-y-6">
					<h3 class="text-xl font-serif font-semibold text-neutral-900 mb-4">Why Choose Our Practice</h3>
					
					<div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
						<div class="flex items-start gap-3 p-4 bg-primary-50 rounded-lg border border-primary-100">
							<svg class="w-6 h-6 text-primary-600 flex-shrink-0 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
								<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
							</svg>
							<div>
								<h4 class="font-semibold text-primary-900 text-sm">Licensed Professionals</h4>
								<p class="text-primary-700 text-xs mt-1">Board-certified therapists with extensive training</p>
							</div>
						</div>

						<div class="flex items-start gap-3 p-4 bg-sage-50 rounded-lg border border-sage-100">
							<svg class="w-6 h-6 text-sage-600 flex-shrink-0 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
								<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"/>
							</svg>
							<div>
								<h4 class="font-semibold text-sage-900 text-sm">Compassionate Care</h4>
								<p class="text-sage-700 text-xs mt-1">Empathetic approach to healing and growth</p>
							</div>
						</div>

						<div class="flex items-start gap-3 p-4 bg-lavender-50 rounded-lg border border-lavender-100">
							<svg class="w-6 h-6 text-lavender-600 flex-shrink-0 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
								<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"/>
							</svg>
							<div>
								<h4 class="font-semibold text-lavender-900 text-sm">Confidential</h4>
								<p class="text-lavender-700 text-xs mt-1">HIPAA-compliant secure environment</p>
							</div>
						</div>

						<div class="flex items-start gap-3 p-4 bg-secondary-50 rounded-lg border border-secondary-100">
							<svg class="w-6 h-6 text-secondary-600 flex-shrink-0 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
								<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"/>
							</svg>
							<div>
								<h4 class="font-semibold text-secondary-900 text-sm">Evidence-Based</h4>
								<p class="text-secondary-700 text-xs mt-1">Proven therapeutic approaches and techniques</p>
							</div>
						</div>
					</div>
				</div>

				<!-- Professional Stats -->
				<div class="bg-neutral-50 rounded-xl p-6 border border-neutral-200">
					<h4 class="font-serif font-semibold text-neutral-900 mb-4 text-center">Our Impact</h4>
					<div class="grid grid-cols-3 gap-4 text-center">
						<div>
							<div class="text-2xl font-bold text-primary-600">15+</div>
							<div class="text-xs text-neutral-600">Years Experience</div>
						</div>
						<div>
							<div class="text-2xl font-bold text-sage-600">500+</div>
							<div class="text-xs text-neutral-600">Clients Helped</div>
						</div>
						<div>
							<div class="text-2xl font-bold text-lavender-600">98%</div>
							<div class="text-xs text-neutral-600">Client Satisfaction</div>
						</div>
					</div>
				</div>

				<!-- Call to Action -->
				<div class="pt-4">
					<a 
						href="/contact" 
						class="btn-primary inline-flex items-center gap-2 hover-lift focus-ring"
					>
						<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"/>
						</svg>
						Start Your Journey Today
					</a>
				</div>
			</div>
		</div>
	</div>
</section>
