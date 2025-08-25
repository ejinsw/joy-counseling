import { asText } from '@prismicio/client';

import { createClient } from '$lib/prismicio';

export async function load({ params, fetch, cookies }) {
    // Ignore favicon and non-content requests hitting this route
    if (params.uid === 'favicon.ico') {
        return {
            page: null,
            title: 'Not Found',
            meta_description: null,
            meta_title: null,
            meta_image: null
        };
    }
	const client = createClient({ fetch, cookies });

	const page = await client.getByUID('page', params.uid);

	return {
		page,
		title: asText(page.data.title),
		meta_description: page.data.meta_description,
		meta_title: page.data.meta_title,
		meta_image: page.data.meta_image.url
	};
}
