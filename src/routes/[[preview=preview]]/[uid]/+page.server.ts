import { loadPrismicPage } from '$lib/server/loadPrismicPage';

export async function load({ params, fetch, cookies }) {
	// Ignore favicon and non-content requests hitting this route
	if (params.uid === 'favicon.ico') {
		return {
			page: null,
			locale: 'en',
			title: 'Not Found',
			meta_description: null,
			meta_title: null,
			meta_image: null
		};
	}

	return loadPrismicPage({ uid: params.uid, locale: 'en', fetch, cookies });
}
