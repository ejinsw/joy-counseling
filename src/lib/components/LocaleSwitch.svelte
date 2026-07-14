<script lang="ts">
	import { page } from '$app/state';
	import { localeFromPath, localizedPath, uiText, type Locale } from '$lib/i18n';

	let {
		locale,
		onNavigate = () => {}
	}: {
		locale?: Locale;
		onNavigate?: () => void;
	} = $props();

	const activeLocale = $derived(locale ?? localeFromPath(page.url.pathname));
	const copy = $derived(uiText[activeLocale]);
	const urlSuffix = $derived(`${page.url.search}${page.url.hash}`);
	const englishHref = $derived(`${localizedPath(page.url.pathname, 'en')}${urlSuffix}`);
	const koreanHref = $derived(`${localizedPath(page.url.pathname, 'kr')}${urlSuffix}`);

	const linkClass =
		'focus-ring inline-flex h-9 min-w-10 items-center justify-center rounded-md px-3 text-xs font-semibold transition-colors';
</script>

<nav
	class="inline-flex items-center gap-1 rounded-md border border-neutral-200 bg-[#fbfcf8] p-1 shadow-soft"
	aria-label={copy.language.switcherLabel}
>
	<a
		href={englishHref}
		hreflang="en"
		lang="en"
		class={`${linkClass} ${
			activeLocale === 'en'
				? 'bg-primary-800 text-white'
				: 'text-neutral-700 hover:bg-secondary-100 hover:text-primary-900'
		}`}
		aria-current={activeLocale === 'en' ? 'true' : undefined}
		aria-label={copy.language.english}
		onclick={onNavigate}
	>
		EN
	</a>

	<a
		href={koreanHref}
		hreflang="ko"
		lang="ko"
		class={`${linkClass} ${
			activeLocale === 'kr'
				? 'bg-primary-800 text-white'
				: 'text-neutral-700 hover:bg-secondary-100 hover:text-primary-900'
		}`}
		aria-current={activeLocale === 'kr' ? 'true' : undefined}
		aria-label={copy.language.korean}
		onclick={onNavigate}
	>
		KR
	</a>
</nav>
