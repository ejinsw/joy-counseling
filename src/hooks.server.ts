import type { Handle } from '@sveltejs/kit';

import { localeFromPath } from '$lib/i18n';

export const handle: Handle = async ({ event, resolve }) => {
	const locale = localeFromPath(event.url.pathname);
	const htmlLang = locale === 'kr' ? 'ko' : 'en';

	return resolve(event, {
		transformPageChunk: ({ html }) => html.replace('<html lang="en"', `<html lang="${htmlLang}"`)
	});
};
