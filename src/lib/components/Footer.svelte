<script lang="ts">
	import { Brain, CheckCircle, ChevronRight, Lock, Mail, MapPin, Phone } from '@lucide/svelte';
	import type { FooterSettingsDocumentData, SettingsDocumentData } from '../../prismicio-types';
	import Logo from './Logo.svelte';
	import { PrismicLink } from '@prismicio/svelte';
	let { settings, footerSettings } = $props<{
		settings?: SettingsDocumentData;
		footerSettings?: FooterSettingsDocumentData;
	}>();

	const year = new Date().getFullYear();

	const legalLinks = [
		{ label: 'Privacy Policy', href: '/privacy' },
		{ label: 'Terms of Service', href: '/terms' },
		{ label: 'HIPAA Notice', href: '/hipaa' }
	];
</script>

<footer class="bg-calm-gradient border-t border-neutral-200">
	<div class="section-container">
		<!-- Main Footer Content -->
		<div class="pt-12 pb-4 grid gap-12 md:grid-cols-2 lg:grid-cols-4">
			<!-- Company Info -->
			<div class="lg:col-span-2">
				<div class="flex items-center gap-3 mb-6">
					<div class="w-12 h-12 bg-healing-gradient rounded-xl flex items-center justify-center">
						<Logo class="w-7 h-7 text-primary-700" />
					</div>
					<div>
						<h3 class="text-xl font-serif font-semibold text-neutral-900">
							{settings?.company_name}
						</h3>
						<h4 class="text-sm text-neutral-600">{settings?.tagline}</h4>
					</div>
				</div>

				<p class="text-neutral-700 leading-relaxed mb-6 max-w-md">
					{footerSettings?.description}
				</p>

				<!-- Professional Credentials -->
				<div class="space-y-2 text-sm text-neutral-600">
					<div class="flex items-center gap-2">
						<CheckCircle class="w-4 h-4 text-sage-600" />
						<span>Licensed Clinical Professionals</span>
					</div>
					<div class="flex items-center gap-2">
						<Lock class="w-4 h-4 text-sage-600" />
						<span>HIPAA Compliant & Confidential</span>
					</div>
					<div class="flex items-center gap-2">
						<Brain class="w-4 h-4 text-sage-600" />
						<span>Evidence-Based Treatment</span>
					</div>
				</div>
			</div>

			<!-- Quick Links -->
			{#if footerSettings?.quick_links && Array.isArray(footerSettings.quick_links) && footerSettings.quick_links.length > 0}
				<div>
					<h4 class="text-lg font-serif font-semibold text-neutral-900 mb-6">Quick Links</h4>
					<ul class="space-y-3">
						{#each footerSettings.quick_links as link}
							<li>
								<PrismicLink
									field={link?.link}
									class="text-neutral-700 hover:text-primary-600 transition-colors duration-200 flex items-center gap-2 group"
								>
									<ChevronRight
										class="w-4 h-4 text-neutral-400 group-hover:text-primary-600 transition-colors duration-200"
									/>
									{link?.label || 'Untitled'}
								</PrismicLink>
							</li>
						{/each}
					</ul>
				</div>
			{/if}

			<!-- Contact Information -->
			<div class="flex flex-col">
				<h4 class="text-lg font-serif font-semibold text-neutral-900 mb-6">Get in Touch</h4>
				<div>
					{#if settings?.phone_number}
						<div class="flex items-start gap-3">
							<Phone class="w-5 h-5 text-primary-600" />
							<p class="text-sm font-medium text-neutral-900">Phone:</p>
							<a
								href={`tel:${settings?.phone_number}`}
								class="text-primary-600 hover:text-primary-700 transition-colors duration-200"
								>{settings.phone_number}</a
							>
						</div>
					{/if}

					{#if settings?.email}
						<div class="flex items-start gap-3">
							<Mail class="w-5 h-5 text-sage-600" />
							<p class="text-sm font-medium text-neutral-900">Email:</p>
							<a
								href={`mailto:${settings?.email}`}
								class="text-primary-600 hover:text-primary-700 transition-colors duration-200 break-words"
								>{settings.email}</a
							>
						</div>
					{/if}

					{#if settings?.address}
						<div class="flex items-start gap-3">
							<MapPin class="w-5 h-5 text-lavender-600" />
							<p class="text-sm font-medium text-neutral-900">Address:</p>
							<p class="text-neutral-700 leading-relaxed">{settings.address}</p>
						</div>
					{/if}

					<!-- Business Hours -->
					<div class="pt-4 border-t border-neutral-200">
						<p class="text-sm font-medium text-neutral-900 mb-2">Business Hours:</p>
						<div class="text-sm text-neutral-700 space-y-1">
							{#if footerSettings?.business_hours}
								{#each footerSettings?.business_hours as hour}
									<p>{hour.hours}</p>
								{/each}
							{/if}
						</div>
					</div>
				</div>
			</div>
		</div>

		<!-- Footer Bottom -->
		<div class="border-t border-neutral-200 py-4">
			<div class="flex flex-col lg:flex-row items-center justify-between gap-6">
				<p class="text-sm text-neutral-600">
					© {year}
					{settings?.company_name}. All rights reserved.
				</p>

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
			</div>
		</div>
	</div>
</footer>
