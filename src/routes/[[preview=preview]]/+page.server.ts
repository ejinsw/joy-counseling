import { loadPrismicPage } from '$lib/server/loadPrismicPage';

export async function load({ fetch, cookies }) {
	return loadPrismicPage({ uid: 'home', locale: 'en', fetch, cookies });
}
