<script lang="ts">
	import { page } from '$app/state';
	import { Menu, X } from '@lucide/svelte';
	import { localizedPath, uiText, type Locale } from '$lib/i18n';
	import type { SettingsDocumentData } from '../../prismicio-types';
	import LocaleSwitch from './LocaleSwitch.svelte';
	import Logo from './Logo.svelte';

	let {
		settings,
		locale = 'en'
	}: {
		settings?: SettingsDocumentData;
		locale?: Locale;
	} = $props();
	let isOpen = $state(false);

	const copy = $derived(uiText[locale]);
	const homeHref = $derived(localizedPath('/', locale));
	const navLinks = $derived([
		{ href: localizedPath('/', locale), label: copy.nav.home },
		{ href: localizedPath('/about', locale), label: copy.nav.about },
		{ href: localizedPath('/contact', locale), label: copy.nav.contact }
	]);

	function toggleMobileMenu() {
		isOpen = !isOpen;
	}

	function closeMobileMenu() {
		isOpen = false;
	}

	function isActiveLink(href: string) {
		const currentPath = page.url.pathname.replace(/\/$/, '') || '/';
		const linkPath = href.replace(/\/$/, '') || '/';

		if (linkPath === '/' || linkPath === '/kr') {
			return currentPath === linkPath;
		}

		return currentPath === linkPath || currentPath.startsWith(`${linkPath}/`);
	}
</script>

<header class="sticky top-0 z-50 border-b border-neutral-200 bg-[#fbfcf8]/95 backdrop-blur-sm">
	<div class="section-container">
		<div class="flex h-[72px] items-center justify-between gap-6">
			<a href={homeHref} class="focus-ring flex items-center gap-3" onclick={closeMobileMenu}>
				<Logo class="h-11 w-11 shrink-0" image={settings?.logo} />
				<div class="hidden min-w-0 sm:block">
					<p class="truncate text-base font-semibold leading-tight text-neutral-900">
						{settings?.company_name}
					</p>
					{#if settings?.tagline}
						<p class="truncate text-sm leading-tight text-neutral-600">{settings.tagline}</p>
					{/if}
				</div>
			</a>

			<nav class="hidden items-center gap-7 lg:flex" aria-label={copy.nav.mainNavigation}>
				{#each navLinks as link}
					{@const isActive = isActiveLink(link.href)}
					<a
						href={link.href}
						class={`focus-ring rounded-md px-2 py-1 text-sm font-medium transition-colors ${
							isActive ? 'text-primary-800' : 'text-neutral-700 hover:text-primary-800'
						}`}
						aria-current={isActive ? 'page' : undefined}
						onclick={closeMobileMenu}
					>
						{link.label}
					</a>
				{/each}
			</nav>

			<div class="flex items-center gap-3">
				<div class="hidden sm:block">
					<LocaleSwitch {locale} onNavigate={closeMobileMenu} />
				</div>

				<button
					class="focus-ring inline-flex h-11 w-11 items-center justify-center rounded-md border border-neutral-200 bg-secondary-50 text-neutral-800 lg:hidden"
					aria-label={copy.nav.toggleNavigation}
					aria-expanded={isOpen}
					onclick={toggleMobileMenu}
				>
					{#if isOpen}
						<X class="h-5 w-5" aria-hidden="true" />
					{:else}
						<Menu class="h-5 w-5" aria-hidden="true" />
					{/if}
				</button>
			</div>
		</div>

		{#if isOpen}
			<nav class="border-t border-neutral-200 py-4 lg:hidden" aria-label={copy.nav.mainNavigation}>
				<div class="grid gap-2">
					{#each navLinks as link}
						{@const isActive = isActiveLink(link.href)}
						<a
							href={link.href}
							class={`focus-ring rounded-md px-4 py-3 text-base font-medium transition-colors ${
								isActive
									? 'bg-primary-50 text-primary-900'
									: 'text-neutral-700 hover:bg-secondary-100 hover:text-primary-900'
							}`}
							aria-current={isActive ? 'page' : undefined}
							onclick={closeMobileMenu}
						>
							{link.label}
						</a>
					{/each}
					<div class="mt-2">
						<LocaleSwitch {locale} onNavigate={closeMobileMenu} />
					</div>
				</div>
			</nav>
		{/if}
	</div>
</header>
