<script lang="ts">
	import { Clock, Mail, MapPin, Phone } from '@lucide/svelte';
	import { isFilled } from '@prismicio/client';
	import { PrismicLink } from '@prismicio/svelte';
	import { localizedPath, uiText, type Locale } from '$lib/i18n';
	import type { FooterSettingsDocumentData, SettingsDocumentData } from '../../prismicio-types';
	import Logo from './Logo.svelte';

	let {
		settings,
		footerSettings,
		locale = 'en'
	}: {
		settings?: SettingsDocumentData;
		footerSettings?: FooterSettingsDocumentData;
		locale?: Locale;
	} = $props();

	const year = new Date().getFullYear();

	const copy = $derived(uiText[locale]);
	const fallbackQuickLinks = $derived([
		localizedPath('/', locale),
		localizedPath('/about', locale),
		localizedPath('/contact', locale)
	]);
</script>

<footer class="border-t border-neutral-200 bg-white">
	<div class="section-container">
		<div class="grid gap-10 py-12 md:grid-cols-[1.4fr_0.8fr_1fr] lg:gap-14">
			<div>
				<div class="mb-5 flex items-center gap-3">
					<Logo class="h-11 w-11 shrink-0" image={settings?.logo} />
					<div>
						<p class="font-semibold leading-tight text-neutral-900">{settings?.company_name}</p>
						{#if settings?.tagline}
							<p class="text-sm leading-tight text-neutral-600">{settings.tagline}</p>
						{/if}
					</div>
				</div>

				{#if footerSettings?.description}
					<p class="max-w-xl text-sm leading-7 text-neutral-700">
						{footerSettings.description}
					</p>
				{/if}
			</div>

			{#if footerSettings?.quick_links && Array.isArray(footerSettings.quick_links) && footerSettings.quick_links.length > 0}
				<nav aria-label="Footer navigation">
					<h2 class="mb-4 text-sm font-semibold text-neutral-900">{copy.footer.pages}</h2>
					<ul class="grid gap-2 text-sm">
						{#each footerSettings.quick_links as link, index}
							<li>
								{#if isFilled.link(link?.link)}
									<PrismicLink
										field={link?.link}
										class="focus-ring inline-flex rounded-md py-1 text-neutral-700 transition-colors hover:text-primary-900"
									>
										{link?.label || copy.footer.untitled}
									</PrismicLink>
								{:else}
									<a
										href={fallbackQuickLinks[index] || localizedPath('/', locale)}
										class="focus-ring inline-flex rounded-md py-1 text-neutral-700 transition-colors hover:text-primary-900"
									>
										{link?.label || copy.footer.untitled}
									</a>
								{/if}
							</li>
						{/each}
					</ul>
				</nav>
			{/if}

			<div>
				<h2 class="mb-4 text-sm font-semibold text-neutral-900">{copy.footer.contact}</h2>
				<div class="grid gap-4 text-sm text-neutral-700">
					{#if settings?.phone}
						<div class="flex items-start gap-3">
							<Phone class="mt-0.5 h-4 w-4 shrink-0 text-primary-700" aria-hidden="true" />
							<a
								href={`tel:${settings.phone}`}
								class="focus-ring rounded-md hover:text-primary-900"
							>
								{settings.phone}
							</a>
						</div>
					{/if}

					{#if settings?.email}
						<div class="flex items-start gap-3">
							<Mail class="mt-0.5 h-4 w-4 shrink-0 text-primary-700" aria-hidden="true" />
							<a
								href={`mailto:${settings.email}`}
								class="focus-ring rounded-md break-words hover:text-primary-900"
							>
								{settings.email}
							</a>
						</div>
					{/if}

					{#if settings?.address}
						<div class="flex items-start gap-3">
							<MapPin class="mt-0.5 h-4 w-4 shrink-0 text-primary-700" aria-hidden="true" />
							<p>{settings.address}</p>
						</div>
					{/if}

					{#if footerSettings?.business_hours && footerSettings.business_hours.length > 0}
						<div class="flex items-start gap-3 border-t border-neutral-200 pt-4">
							<Clock class="mt-0.5 h-4 w-4 shrink-0 text-primary-700" aria-hidden="true" />
							<div class="grid gap-1">
								{#each footerSettings.business_hours as hour}
									{#if hour.hours}
										<p>{hour.hours}</p>
									{/if}
								{/each}
							</div>
						</div>
					{/if}
				</div>
			</div>
		</div>

		<div
			class="flex flex-col gap-4 border-t border-neutral-200 py-5 text-sm text-neutral-600 md:flex-row md:items-center md:justify-between"
		>
			<p>Copyright {year} {settings?.company_name}. {copy.footer.copyrightSuffix}</p>
		</div>
	</div>
</footer>
