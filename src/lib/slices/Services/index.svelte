<script lang="ts">
  import type { ServicesSlice } from '../../../prismicio-types';
  import { PrismicRichText } from '@prismicio/svelte';
  import { PrismicLink } from '@prismicio/svelte';
  import { isFilled } from '@prismicio/client';
  import { Heart, Brain, MessageCircle, Trees, Users, Handshake, Leaf, CheckIcon, Clock, Lock } from '@lucide/svelte';

  export let slice: ServicesSlice;

  let { primary, items } = slice;
  

  // Professional therapeutic icon mapping with SVG icons
  const getServiceIcon = (iconType: string) => {
    const iconMap: Record<string, { icon: any; color: string }> = {
      heart: {
        icon: Heart,
        color: 'text-red-500'
      },
      brain: {
        icon: Brain,
        color: 'text-purple-500'
      },
      conversation: {
        icon: MessageCircle,
        color: 'text-blue-500'
      },
      growth: {
        icon: Trees,
        color: 'text-green-500'
      },
      family: {
        icon: Users,
        color: 'text-orange-500'
      },
      couple: {
        icon: Handshake,
        color: 'text-pink-500'
      },
      mindfulness: {
        icon: Leaf,
        color: 'text-indigo-500'
      }
    };
    
    return iconMap[iconType] || { svg: 'M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z', color: 'text-primary-500' };
  };

  // Get service items
  $: services = items || [];
</script>

<!-- Services Section with Professional Counseling Design -->
<section class="section-padding bg-peaceful-gradient">
	<div class="section-container">
		<!-- Section Header -->
		<div class="text-center mb-20 max-w-4xl mx-auto">
			{#if isFilled.keyText(primary.title)}
				<h2 class="text-display-lg mb-6 text-neutral-900">
					{primary.title}
				</h2>
			{/if}

			{#if isFilled.keyText(primary.subtitle)}
				<p class="text-subtitle text-neutral-600 mb-8">
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
					<span>Evidence-Based Approaches</span>
				</div>
				<div class="flex items-center gap-2">
					<svg class="w-4 h-4 text-sage-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
						/>
					</svg>
					<span>Confidential & Safe</span>
				</div>
				<div class="flex items-center gap-2">
					<svg
						class="w-4 h-4 text-lavender-600"
						fill="none"
						stroke="currentColor"
						viewBox="0 0 24 24"
					>
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
						/>
					</svg>
					<span>Compassionate Care</span>
				</div>
			</div>
		</div>

		<!-- Services Grid -->
		<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
			{#each services as service, index}
				<div
					class="card-elevated p-8 group hover-lift transition-all duration-300 bg-white border-0 relative overflow-hidden"
				>
					<!-- Background decoration -->
					<div
						class="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-primary-50 to-sage-50 rounded-full -translate-y-10 translate-x-10 opacity-60"
					></div>

					<!-- Service Icon -->
					{#if isFilled.select(service.icon)}
						{@const iconData = getServiceIcon(service.icon)}
						<div class="relative mb-6 flex justify-center">
							<div
								class="w-16 h-16 bg-white rounded-xl shadow-medium flex items-center justify-center group-hover:scale-110 transition-transform duration-300 border border-neutral-100"
							>
								<svelte:component this={iconData.icon} class="w-8 h-8 {iconData.color}" />
							</div>
						</div>
					{/if}

					<!-- Service Title -->
					{#if isFilled.keyText(service.title)}
						<h3
							class="text-xl font-serif font-semibold mb-4 text-center text-neutral-900 group-hover:text-primary-700 transition-colors duration-300"
						>
							{service.title}
						</h3>
					{/if}

					<!-- Service Description -->
					{#if isFilled.richText(service.description)}
						<div
							class="prose prose-sm max-w-none mb-8 text-center text-neutral-700 [&>p]:mb-3 [&>p]:leading-relaxed"
						>
							<PrismicRichText field={service.description} />
						</div>
					{/if}

					<!-- Professional Features -->
					<div class="space-y-2 mb-6">
						<div class="flex items-center gap-2 text-xs text-neutral-600">
              <CheckIcon class="w-3 h-3 text-primary-600" />
							<span>Licensed professionals</span>
						</div>
						<div class="flex items-center gap-2 text-xs text-neutral-600">
							<Clock class="w-3 h-3 text-sage-600" />
							<span>Flexible scheduling</span>
						</div>
						<div class="flex items-center gap-2 text-xs text-neutral-600">
              <Lock class="w-3 h-3 text-lavender-600" />
							<span>Confidential sessions</span>
						</div>
					</div>

					<!-- Call to Action -->
					{#if isFilled.link(service.cta_link) && isFilled.keyText(service.cta_text)}
						<div class="text-center">
							<PrismicLink
								field={service.cta_link}
								class="btn-primary w-full justify-center hover-lift focus-ring inline-flex items-center gap-2"
							>
								<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
									<path
										stroke-linecap="round"
										stroke-linejoin="round"
										stroke-width="2"
										d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
									/>
								</svg>
								{service.cta_text}
							</PrismicLink>
						</div>
					{/if}
				</div>
			{/each}
		</div>
	</div>
</section>
