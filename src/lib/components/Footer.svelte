<script lang="ts">
  let {
    company = 'Counseling Services',
    tagline = 'Professional care for your healing journey.',
    email,
    phone,
    address
  } = $props<{ company?: string; tagline?: string; email?: string; phone?: string; address?: string }>();
  
  const year = new Date().getFullYear();
  
  const quickLinks = [
    { label: 'About Us', href: '/about' },
    { label: 'Services', href: '/services' },
    { label: 'Testimonials', href: '/testimonials' },
    { label: 'FAQ', href: '/faq' }
  ];
  
  const legalLinks = [
    { label: 'Privacy Policy', href: '/privacy' },
    { label: 'Terms of Service', href: '/terms' },
    { label: 'HIPAA Notice', href: '/hipaa' }
  ];

  const socialLinks = [
    { 
      label: 'LinkedIn', 
      href: '#', 
      icon: 'M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z'
    },
    { 
      label: 'Psychology Today', 
      href: '#', 
      icon: 'M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z'
    }
  ];
</script>

<footer class="bg-calm-gradient border-t border-neutral-200 mt-section">
  <div class="section-container">
    <!-- Main Footer Content -->
    <div class="py-16 grid gap-12 md:grid-cols-2 lg:grid-cols-4">
      
      <!-- Company Info -->
      <div class="lg:col-span-2">
        <div class="flex items-center gap-3 mb-6">
          <div class="w-12 h-12 bg-healing-gradient rounded-xl flex items-center justify-center">
            <svg class="w-7 h-7 text-primary-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"/>
            </svg>
          </div>
          <div>
            <h3 class="text-xl font-serif font-semibold text-neutral-900">{company}</h3>
            <p class="text-sm text-neutral-600 font-light">Healing & Growth</p>
          </div>
        </div>
        
        <p class="text-neutral-700 leading-relaxed mb-6 max-w-md">
          {tagline} We provide compassionate, evidence-based therapy to support your mental health and personal growth journey.
        </p>

        <!-- Professional Credentials -->
        <div class="space-y-2 text-sm text-neutral-600">
          <div class="flex items-center gap-2">
            <svg class="w-4 h-4 text-sage-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
            </svg>
            <span>Licensed Clinical Professionals</span>
          </div>
          <div class="flex items-center gap-2">
            <svg class="w-4 h-4 text-sage-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"/>
            </svg>
            <span>HIPAA Compliant & Confidential</span>
          </div>
          <div class="flex items-center gap-2">
            <svg class="w-4 h-4 text-sage-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"/>
            </svg>
            <span>Evidence-Based Treatment</span>
          </div>
        </div>
      </div>

      <!-- Quick Links -->
      <div>
        <h4 class="text-lg font-serif font-semibold text-neutral-900 mb-6">Quick Links</h4>
        <ul class="space-y-3">
          {#each quickLinks as link}
            <li>
              <a 
                href={link.href} 
                class="text-neutral-700 hover:text-primary-600 transition-colors duration-200 flex items-center gap-2 group"
              >
                <svg class="w-4 h-4 text-neutral-400 group-hover:text-primary-600 transition-colors duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
                </svg>
                {link.label}
              </a>
            </li>
          {/each}
        </ul>
      </div>

      <!-- Contact Information -->
      <div>
        <h4 class="text-lg font-serif font-semibold text-neutral-900 mb-6">Get in Touch</h4>
        <div class="space-y-4">
          {#if phone}
            <div class="flex items-start gap-3">
              <div class="w-10 h-10 bg-primary-100 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5">
                <svg class="w-5 h-5 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/>
                </svg>
              </div>
              <div>
                <p class="text-sm font-medium text-neutral-900">Phone</p>
                <a href={`tel:${phone}`} class="text-primary-600 hover:text-primary-700 transition-colors duration-200">{phone}</a>
              </div>
            </div>
          {/if}

          {#if email}
            <div class="flex items-start gap-3">
              <div class="w-10 h-10 bg-sage-100 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5">
                <svg class="w-5 h-5 text-sage-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
                </svg>
              </div>
              <div>
                <p class="text-sm font-medium text-neutral-900">Email</p>
                <a href={`mailto:${email}`} class="text-primary-600 hover:text-primary-700 transition-colors duration-200 break-words">{email}</a>
              </div>
            </div>
          {/if}

          {#if address}
            <div class="flex items-start gap-3">
              <div class="w-10 h-10 bg-lavender-100 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5">
                <svg class="w-5 h-5 text-lavender-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
                </svg>
              </div>
              <div>
                <p class="text-sm font-medium text-neutral-900">Address</p>
                <p class="text-neutral-700 leading-relaxed">{address}</p>
              </div>
            </div>
          {/if}

          <!-- Business Hours -->
          <div class="pt-4 border-t border-neutral-200">
            <p class="text-sm font-medium text-neutral-900 mb-2">Business Hours</p>
            <div class="text-sm text-neutral-700 space-y-1">
              <p>Monday - Friday: 9:00 AM - 7:00 PM</p>
              <p>Saturday: 10:00 AM - 4:00 PM</p>
              <p>Sunday: Closed</p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Footer Bottom -->
    <div class="border-t border-neutral-200 py-8">
      <div class="flex flex-col lg:flex-row items-center justify-between gap-6">
        
        <!-- Copyright -->
        <div class="text-center lg:text-left">
          <p class="text-sm text-neutral-600">
            © {year} {company}. All rights reserved.
          </p>
          <p class="text-xs text-neutral-500 mt-1">
            Licensed mental health professionals providing quality care.
          </p>
        </div>

        <!-- Legal Links -->
        <div class="flex flex-wrap items-center gap-6 text-sm">
          {#each legalLinks as link}
            <a 
              href={link.href} 
              class="text-neutral-600 hover:text-primary-600 transition-colors duration-200"
            >
              {link.label}
            </a>
          {/each}
        </div>

        <!-- Professional Networks -->
        <div class="flex items-center gap-4">
          <span class="text-xs text-neutral-500">Find us on:</span>
          {#each socialLinks as social}
            <a 
              href={social.href} 
              class="w-8 h-8 bg-neutral-100 hover:bg-primary-100 rounded-lg flex items-center justify-center transition-all duration-200 group"
              aria-label={social.label}
            >
              <svg class="w-4 h-4 text-neutral-600 group-hover:text-primary-600 transition-colors duration-200" fill="currentColor" viewBox="0 0 24 24">
                <path d={social.icon}/>
              </svg>
            </a>
          {/each}
        </div>
      </div>
    </div>

    <!-- Crisis Information -->
    <div class="bg-red-50 border border-red-200 rounded-xl p-6 mb-8">
      <div class="flex items-start gap-3">
        <svg class="w-6 h-6 text-red-600 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.732-.833-2.5 0L4.232 15.5c-.77.833.192 2.5 1.732 2.5z"/>
        </svg>
        <div>
          <h5 class="font-semibold text-red-900 mb-2">Crisis Support</h5>
          <p class="text-sm text-red-800 mb-3">
            If you are experiencing a mental health emergency, please contact emergency services immediately.
          </p>
          <div class="flex flex-wrap gap-4 text-sm">
            <a href="tel:988" class="text-red-700 hover:text-red-900 font-medium">
              🆘 Crisis Lifeline: 988
            </a>
            <a href="tel:911" class="text-red-700 hover:text-red-900 font-medium">
              🚨 Emergency: 911
            </a>
            <a href="sms:741741" class="text-red-700 hover:text-red-900 font-medium">
              💬 Text Crisis Line: 741741
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>
</footer>


