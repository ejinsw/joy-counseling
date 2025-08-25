<script lang="ts">
  import type { ServicesSlice } from '../../../prismicio-types';
  import { PrismicRichText } from '@prismicio/svelte';
  import { PrismicLink } from '@prismicio/svelte';
  import { isFilled } from '@prismicio/client';

  export let slice: ServicesSlice;

  let { primary, items } = slice;
  
  // Professional therapeutic icon mapping with SVG icons
  const getServiceIcon = (iconType: string) => {
    const iconMap: Record<string, { svg: string; color: string }> = {
      heart: {
        svg: 'M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z',
        color: 'text-red-500'
      },
      brain: {
        svg: 'M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z',
        color: 'text-purple-500'
      },
      conversation: {
        svg: 'M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z',
        color: 'text-blue-500'
      },
      growth: {
        svg: 'M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z',
        color: 'text-green-500'
      },
      family: {
        svg: 'M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z',
        color: 'text-orange-500'
      },
      couple: {
        svg: 'M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z',
        color: 'text-pink-500'
      },
      mindfulness: {
        svg: 'M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z',
        color: 'text-indigo-500'
      },
      healing: {
        svg: 'M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z',
        color: 'text-yellow-500'
      },
      support: {
        svg: 'M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z',
        color: 'text-teal-500'
      },
      wellness: {
        svg: 'M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z',
        color: 'text-emerald-500'
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
          <svg class="w-4 h-4 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
          </svg>
          <span>Evidence-Based Approaches</span>
        </div>
        <div class="flex items-center gap-2">
          <svg class="w-4 h-4 text-sage-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"/>
          </svg>
          <span>Confidential & Safe</span>
        </div>
        <div class="flex items-center gap-2">
          <svg class="w-4 h-4 text-lavender-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"/>
          </svg>
          <span>Compassionate Care</span>
        </div>
      </div>
    </div>

    <!-- Services Grid -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
      {#each services as service, index}
        <div class="card-elevated p-8 group hover-lift transition-all duration-300 bg-white border-0 relative overflow-hidden">
          <!-- Background decoration -->
          <div class="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-primary-50 to-sage-50 rounded-full -translate-y-10 translate-x-10 opacity-60"></div>
          
          <!-- Service Icon -->
          {#if isFilled.select(service.icon)}
            {@const iconData = getServiceIcon(service.icon)}
            <div class="relative mb-6 flex justify-center">
              <div class="w-16 h-16 bg-white rounded-xl shadow-medium flex items-center justify-center group-hover:scale-110 transition-transform duration-300 border border-neutral-100">
                <svg class="w-8 h-8 {iconData.color}" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2">
                  <path stroke-linecap="round" stroke-linejoin="round" d={iconData.svg}/>
                </svg>
              </div>
            </div>
          {/if}

          <!-- Service Title -->
          {#if isFilled.keyText(service.title)}
            <h3 class="text-xl font-serif font-semibold mb-4 text-center text-neutral-900 group-hover:text-primary-700 transition-colors duration-300">
              {service.title}
            </h3>
          {/if}

          <!-- Service Description -->
          {#if isFilled.richText(service.description)}
            <div class="prose prose-sm max-w-none mb-8 text-center text-neutral-700 [&>p]:mb-3 [&>p]:leading-relaxed">
              <PrismicRichText field={service.description} />
            </div>
          {/if}

          <!-- Professional Features -->
          <div class="space-y-2 mb-6">
            <div class="flex items-center gap-2 text-xs text-neutral-600">
              <svg class="w-3 h-3 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>
              </svg>
              <span>Licensed professionals</span>
            </div>
            <div class="flex items-center gap-2 text-xs text-neutral-600">
              <svg class="w-3 h-3 text-sage-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
              </svg>
              <span>Flexible scheduling</span>
            </div>
            <div class="flex items-center gap-2 text-xs text-neutral-600">
              <svg class="w-3 h-3 text-lavender-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"/>
              </svg>
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
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/>
                </svg>
                {service.cta_text}
              </PrismicLink>
            </div>
          {/if}
        </div>
      {/each}
    </div>

    <!-- Additional Information -->
    <div class="max-w-4xl mx-auto">
      <div class="bg-white rounded-2xl shadow-medium p-8 border border-neutral-200">
        <div class="text-center mb-8">
          <h3 class="text-2xl font-serif font-semibold text-neutral-900 mb-4">Why Choose Our Therapeutic Approach?</h3>
          <p class="text-neutral-600 leading-relaxed">
            Our evidence-based methods are tailored to your unique needs, ensuring personalized care that promotes lasting positive change.
          </p>
        </div>
        
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div class="text-center">
            <div class="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg class="w-6 h-6 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
              </svg>
            </div>
            <h4 class="font-semibold text-neutral-900 mb-2">Personalized Treatment Plans</h4>
            <p class="text-sm text-neutral-600">Customized therapy approaches based on your specific goals and needs.</p>
          </div>
          
          <div class="text-center">
            <div class="w-12 h-12 bg-sage-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg class="w-6 h-6 text-sage-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"/>
              </svg>
            </div>
            <h4 class="font-semibold text-neutral-900 mb-2">Compassionate Support</h4>
            <p class="text-sm text-neutral-600">A safe, non-judgmental space for healing and personal growth.</p>
          </div>
          
          <div class="text-center">
            <div class="w-12 h-12 bg-lavender-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg class="w-6 h-6 text-lavender-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"/>
              </svg>
            </div>
            <h4 class="font-semibold text-neutral-900 mb-2">Proven Results</h4>
            <p class="text-sm text-neutral-600">Evidence-based methods with measurable outcomes and lasting impact.</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>

