import type { LayoutServerLoad } from './$types';
import { createClient } from '$lib/prismicio';

export const prerender = 'auto';

export const load: LayoutServerLoad = async ({ cookies }) => {
  const client = createClient({ cookies });

  const settings = await client.getSingle('settings');
  const footerSettings = await client.getSingle('footer_settings');

  return { settings, footerSettings };
};
