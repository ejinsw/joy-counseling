import type { LayoutServerLoad } from './$types';
import { createClient } from '$lib/prismicio';

export const prerender = 'auto';

export const load: LayoutServerLoad = async ({ cookies, url }) => {
  const p = url.pathname;

  // Do not fetch anything for the slice simulator or prismic preview plumbing
  if (p.startsWith("/slice-simulator") || p.startsWith("/__preview")) {
    return {};
  }

  const client = createClient({ cookies });

  const settings = await client.getSingle('settings');
  const footerSettings = await client.getSingle('footer_settings');

  return { settings, footerSettings };
};
