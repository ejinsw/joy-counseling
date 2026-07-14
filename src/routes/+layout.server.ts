import type { LayoutServerLoad } from './$types';
import { localeFromPath, prismicLocale } from '$lib/i18n';
import { createClient } from '$lib/prismicio';

export const prerender = 'auto';

export const load: LayoutServerLoad = async ({ cookies, url }) => {
	const p = url.pathname;
	const locale = localeFromPath(p);

	// Do not fetch anything for the slice simulator or prismic preview plumbing
	if (p.startsWith('/slice-simulator') || p.startsWith('/__preview')) {
		return { locale };
	}

	const client = createClient({ cookies });
	const lang = prismicLocale(locale);

	const settings = await client.getSingle('settings', { lang });
	const footerSettings = await client.getSingle('footer_settings', { lang });

	return { settings, footerSettings, locale };
};
