<script lang="ts">
	import type { HeroSlice } from '../../../prismicio-types';
	import { PrismicRichText } from '@prismicio/svelte';
	import { PrismicLink } from '@prismicio/svelte';
	import { PrismicImage } from '@prismicio/svelte';
	import { isFilled } from '@prismicio/client';
	import Pill from '$lib/components/Pill.svelte';
	import { Shield, Heart, BadgeCheck, Calendar, Lock } from '@lucide/svelte';

	export let slice: HeroSlice;

	let { primary, items } = slice;

	// Get trust indicator icon
	function getTrustIcon(iconType: string | null | undefined) {
      switch (iconType) {
        case 'shield':
          return Shield;
        case 'heart':
          return Heart;
        case 'certificate':
          return BadgeCheck;
        case 'calendar':
          return Calendar;
        case 'confidential':
          return Lock;
        default:
          return BadgeCheck;
      }
	}
</script>

<!-- Hero Section with Professional Counseling Design -->
<section class="relative min-h-screen flex items-center justify-center overflow-hidden">
	<!-- Background Image -->
	{#if isFilled.image(primary.background_image)}
		<div class="absolute inset-0">
			<PrismicImage field={primary.background_image} class="w-full h-full object-cover" />
			<!-- Professional overlay for text readability -->
			<!-- <div class="absolute inset-0 bg-neutral-900 opacity-20">
			</div> -->
		</div>
	{:else}
		<div class="absolute inset-0">
			<!-- Professional overlay for text readability -->
			<div class="absolute inset-0 bg- opacity-40">
				<img src="/overlay.png" alt="Overlay" class="w-full h-full object-cover" />
			</div>
		</div>
	{/if}

	<!-- Main Content Container -->
	<div class="section-container relative z-10">
		<div class="max-w-5xl mx-auto text-center">
			<!-- Main Headline -->
			{#if isFilled.keyText(primary.main_headline)}
				<h1 class="text-display mb-6 slide-up text-neutral-50 max-w-4xl mx-auto">
					{primary.main_headline}
				</h1>
			{/if}

			<!-- Sub Headline -->
			{#if isFilled.keyText(primary.sub_headline)}
				<h2 class="text-subtitle mb-8 slide-up max-w-3xl mx-auto text-neutral-200" style="animation-delay: 0.2s">
					{primary.sub_headline}
        </h2>
			{/if}

			<!-- Description -->
			{#if isFilled.richText(primary.description)}
				<div
					class="prose prose-lg mx-auto mb-10 text-neutral-300 slide-up max-w-2xl"
					style="animation-delay: 0.4s"
				>
					<PrismicRichText field={primary.description} />
				</div>
			{/if}

			<!-- Call to Action Buttons -->
			<div
				class="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16 slide-up"
				style="animation-delay: 0.6s"
			>
				{#if isFilled.link(primary.call_to_action_link) && isFilled.keyText(primary.call_to_action_text)}
					<PrismicLink
						field={primary.call_to_action_link}
						class="btn-primary text-lg px-8 py-4 hover-lift focus-ring inline-flex items-center gap-3"
					>
						<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								stroke-width="2"
								d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
							/>
						</svg>
						{primary.call_to_action_text}
					</PrismicLink>
				{/if}

				{#if isFilled.link(primary.secondary_button_link) && isFilled.keyText(primary.secondary_button_text)}
					<PrismicLink
						field={primary.secondary_button_link}
						class="btn-secondary text-lg px-8 py-4 hover-lift focus-ring inline-flex items-center gap-3"
					>
						<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								stroke-width="2"
								d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
							/>
						</svg>
						{primary.secondary_button_text}
					</PrismicLink>
				{/if}
			</div>

			<!-- Trust Indicators -->
			{#if items && items.length > 0}
				<div
					class="flex flex-wrap justify-center items-center gap-8 text-sm text-neutral-600 slide-up"
					style="animation-delay: 0.8s"
				>
					{#each items as trustItem}
						{#if isFilled.keyText(trustItem.trust_indicator_text)}
							<Pill>
								<div class="flex items-center gap-2">
									<svelte:component this={getTrustIcon(trustItem.trust_indicator_icon)} class="w-4 h-4 text-primary-600" />
									<span>{trustItem.trust_indicator_text}</span>
								</div>
							</Pill>
						{/if}
					{/each}
				</div>
			{/if}
		</div>
	</div>
</section>
