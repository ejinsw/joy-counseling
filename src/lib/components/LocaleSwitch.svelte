<script lang="ts">
	import { page } from '$app/state';
	import KoreaFlag from '~icons/flag/kr-4x3';
	import UnitedStatesFlag from '~icons/flag/us-4x3';
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
	const targetLocale = $derived(activeLocale === 'en' ? 'kr' : 'en');
	const targetHref = $derived(targetLocale === 'en' ? englishHref : koreanHref);
	const targetLabel = $derived(
		targetLocale === 'en' ? copy.language.english : copy.language.korean
	);
	const TargetFlag = $derived(targetLocale === 'en' ? UnitedStatesFlag : KoreaFlag);

	const linkClass =
		'focus-ring inline-flex h-11 w-11 items-center justify-center rounded-md p-1.5 transition-colors hover:bg-secondary-100 active:bg-primary-50';
</script>

<nav class="inline-flex items-center" aria-label={copy.language.switcherLabel}>
	<a
		href={targetHref}
		hreflang={targetLocale === 'en' ? 'en' : 'ko'}
		lang={targetLocale === 'en' ? 'en' : 'ko'}
		class={linkClass}
		aria-label={targetLabel}
		title={targetLabel}
		onclick={onNavigate}
	>
		<TargetFlag class="h-[21px] w-7" aria-hidden="true" />
		<span class="sr-only">{targetLabel}</span>
	</a>
</nav>
