<script lang="ts">
  import { page } from '$app/state';
	import type { SettingsDocumentData } from '../../prismicio-types';
	import Logo from './Logo.svelte';
  let { settings } = $props<{ settings?: SettingsDocumentData }>();
  let isOpen = $state(false);

  const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/about', label: 'About Us' },
    { href: '/contact', label: 'Contact' }
  ];

  function toggleMobileMenu() {
    isOpen = !isOpen;
  }

  function closeMobileMenu() {
    isOpen = false;
  }
</script>

<header class="bg-white/95 backdrop-blur-md border-b border-neutral-200/60 sticky top-0 z-50 shadow-sm">
  <div class="section-container">
    <div class="flex items-center justify-between py-4 lg:py-6">
      <!-- Logo/Brand -->
      <a href="/" class="flex items-center gap-3 group focus-ring rounded-lg" onclick={closeMobileMenu}>
        <div class="w-10 h-10 bg-healing-gradient rounded-lg flex items-center justify-center group-hover:scale-105 transition-transform duration-200">
          <Logo class="w-6 h-6 text-primary-700" />
        </div>
        <div class="hidden sm:block">
          <h1 class="text-xl font-serif font-semibold text-neutral-900 leading-none">{settings?.company_name}</h1>
          <p class="text-sm text-neutral-600 font-light leading-none">{settings?.tagline}</p>
        </div>
      </a>

      <!-- Desktop Navigation -->
      <nav class="hidden lg:flex items-center gap-8">
        {#each navLinks as link}
          <a 
            href={link.href} 
            class="relative text-neutral-700 hover:text-primary-600 font-medium transition-all duration-200 py-2 focus-ring rounded group
              {page.url.pathname === link.href ? 'text-primary-600' : ''}"
            onclick={closeMobileMenu}
          >
            {link.label}
            {#if page.url.pathname === link.href}
              <div class="absolute bottom-0 left-0 right-0 h-0.5 bg-primary-600 rounded-full"></div>
            {:else}
              <div class="absolute bottom-0 left-0 right-0 h-0.5 bg-primary-600 rounded-full scale-x-0 group-hover:scale-x-100 transition-transform duration-200"></div>
            {/if}
          </a>
        {/each}
      </nav>

      <!-- CTA Button & Mobile Menu Toggle -->
      <div class="flex items-center gap-4">
        <a 
          href="/contact" 
          class="hidden sm:inline-flex btn-primary focus-ring text-sm font-medium"
          onclick={closeMobileMenu}
        >
          <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/>
          </svg>
          Schedule Session
        </a>

        <!-- Mobile Menu Button -->
        <button 
          class="lg:hidden p-2 rounded-lg text-neutral-600 hover:text-primary-600 hover:bg-primary-50 transition-all duration-200 focus-ring"
          aria-label="Toggle navigation menu"
          aria-expanded={isOpen}
          onclick={toggleMobileMenu}
        >
          {#if isOpen}
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
            </svg>
          {:else}
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"/>
            </svg>
          {/if}
        </button>
      </div>
    </div>

    <!-- Mobile Navigation -->
    {#if isOpen}
      <div class="lg:hidden border-t border-neutral-200 bg-white">
        <nav class="py-6 space-y-1">
          {#each navLinks as link}
            <a 
              href={link.href} 
              class="block px-4 py-3 text-base font-medium text-neutral-700 hover:text-primary-600 hover:bg-primary-50 rounded-lg transition-all duration-200 focus-ring
                {page.url.pathname === link.href ? 'text-primary-600 bg-primary-50' : ''}"
              onclick={closeMobileMenu}
            >
              {link.label}
            </a>
          {/each}
          <div class="px-4 pt-4">
            <a 
              href="/contact" 
              class="btn-primary w-full justify-center focus-ring"
              onclick={closeMobileMenu}
            >
              <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/>
              </svg>
              Schedule Session
            </a>
          </div>
        </nav>
      </div>
    {/if}
  </div>
</header>


