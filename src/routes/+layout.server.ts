import type { LayoutServerLoad } from './$types';
import { createClient } from '$lib/prismicio';

export const prerender = 'auto';

export const load: LayoutServerLoad = async ({ cookies }) => {
  const client = createClient({ cookies });
  let settingsDoc: any = null;
  try {
    settingsDoc = await client.getSingle('settings');
  } catch {}

  const data = settingsDoc?.data ?? {};
  const settings = {
    siteName: (data as any)?.site_name ?? 'Counseling Services',
    tagline: (data as any)?.tagline ?? 'Professional care for your journey.',
    email: (data as any)?.email ?? undefined,
    phone: (data as any)?.phone ?? undefined,
    address: (data as any)?.address ?? undefined
  };

  return { settings };
};
