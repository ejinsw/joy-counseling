import { loadPrismicPage } from '$lib/server/loadPrismicPage';

export async function load({ params, fetch, cookies }) {
	return loadPrismicPage({ uid: params.uid, locale: 'kr', fetch, cookies });
}
