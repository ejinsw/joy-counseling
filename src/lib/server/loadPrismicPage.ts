import { asText } from '@prismicio/client';
import type { Cookies } from '@sveltejs/kit';

import { prismicLocale, type Locale } from '$lib/i18n';
import { createClient } from '$lib/prismicio';

export async function loadPrismicPage({
	uid,
	locale,
	fetch,
	cookies
}: {
	uid: string;
	locale: Locale;
	fetch: typeof globalThis.fetch;
	cookies: Cookies;
}) {
	const client = createClient({ fetch, cookies });
	const page = await client.getByUID('page', uid, { lang: prismicLocale(locale) });

	return {
		page,
		locale,
		title: asText(page.data.title),
		meta_description: page.data.meta_description,
		meta_title: page.data.meta_title,
		meta_image: page.data.meta_image.url
	};
}
