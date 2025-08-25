<script lang="ts">
  import type { HeroSlice } from '../../../prismicio-types';
  import { PrismicRichText } from '@prismicio/svelte';
  import { PrismicLink } from '@prismicio/svelte';
  import { isFilled } from '@prismicio/client';

  export let slice: HeroSlice;

  let { primary } = slice;
</script>

<!-- Hero Section with Professional Counseling Design -->
<section class="relative min-h-screen flex items-center justify-center overflow-hidden bg-healing-gradient">
  <!-- Background Pattern -->
  <div class="absolute inset-0 opacity-10">
    <svg class="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
      <defs>
        <pattern id="healing-pattern" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
          <circle cx="20" cy="20" r="1" fill="currentColor" class="text-primary-400"/>
          <circle cx="10" cy="10" r="0.5" fill="currentColor" class="text-sage-400"/>
          <circle cx="30" cy="10" r="0.5" fill="currentColor" class="text-lavender-400"/>
        </pattern>
      </defs>
      <rect width="100" height="100" fill="url(#healing-pattern)"/>
    </svg>
  </div>

  <!-- Floating Elements -->
  <div class="absolute inset-0 pointer-events-none">
    <!-- Therapeutic symbols -->
    <div class="absolute top-24 left-12 animate-float opacity-20">
      <svg class="w-8 h-8 text-sage-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"/>
      </svg>
    </div>
    
    <div class="absolute top-40 right-16 animate-float opacity-15" style="animation-delay: 1s">
      <svg class="w-6 h-6 text-primary-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"/>
      </svg>
    </div>

    <div class="absolute bottom-32 left-20 animate-float opacity-20" style="animation-delay: 2s">
      <svg class="w-5 h-5 text-lavender-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"/>
      </svg>
    </div>
  </div>

  <!-- Main Content Container -->
  <div class="section-container relative z-10">
    <div class="max-w-5xl mx-auto text-center">
      
      <!-- Professional Badge -->
      <div class="mb-8 fade-in">
        <div class="inline-flex items-center gap-2 px-4 py-2 bg-white/80 backdrop-blur-sm rounded-full border border-primary-200 shadow-sm">
          <svg class="w-4 h-4 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
          </svg>
          <span class="text-sm font-medium text-primary-800">Licensed Mental Health Professionals</span>
        </div>
      </div>

      <!-- Main Headline -->
      {#if isFilled.keyText(primary.main_headline)}
        <h1 class="text-display mb-6 slide-up text-neutral-900 max-w-4xl mx-auto">
          {primary.main_headline}
        </h1>
      {/if}

      <!-- Sub Headline -->
      {#if isFilled.keyText(primary.sub_headline)}
        <p class="text-subtitle mb-8 slide-up max-w-3xl mx-auto" style="animation-delay: 0.2s">
          {primary.sub_headline}
        </p>
      {/if}

      <!-- Description -->
      {#if isFilled.richText(primary.description)}
        <div class="prose prose-lg mx-auto mb-10 text-neutral-700 slide-up max-w-2xl" style="animation-delay: 0.4s">
          <PrismicRichText field={primary.description} />
        </div>
      {/if}

      <!-- Call to Action Buttons -->
      <div class="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16 slide-up" style="animation-delay: 0.6s">
        {#if isFilled.link(primary.call_to_action_link) && isFilled.keyText(primary.call_to_action_text)}
          <PrismicLink 
            field={primary.call_to_action_link} 
            class="btn-primary text-lg px-8 py-4 hover-lift focus-ring inline-flex items-center gap-3"
          >
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/>
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
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
            </svg>
            {primary.secondary_button_text}
          </PrismicLink>
        {/if}
      </div>

      <!-- Trust Indicators -->
      <div class="flex flex-wrap justify-center items-center gap-8 text-sm text-neutral-600 slide-up" style="animation-delay: 0.8s">
        <div class="flex items-center gap-2">
          <svg class="w-4 h-4 text-sage-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"/>
          </svg>
          <span>HIPAA Compliant</span>
        </div>
        
        <div class="flex items-center gap-2">
          <svg class="w-4 h-4 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
          </svg>
          <span>Evidence-Based Care</span>
        </div>
        
        <div class="flex items-center gap-2">
          <svg class="w-4 h-4 text-lavender-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"/>
          </svg>
          <span>Compassionate Support</span>
        </div>
        
        <div class="flex items-center gap-2">
          <svg class="w-4 h-4 text-secondary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
          </svg>
          <span>Flexible Scheduling</span>
        </div>
      </div>
    </div>
  </div>

  <!-- Scroll Indicator -->
  <div class="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-pulse slide-up" style="animation-delay: 1s">
    <div class="w-6 h-10 border-2 border-primary-400 rounded-full flex justify-center">
      <div class="w-1 h-3 bg-primary-400 rounded-full mt-2 animate-bounce"></div>
    </div>
    <p class="text-xs text-neutral-500 mt-2 text-center">Scroll to explore</p>
  </div>
</section>
