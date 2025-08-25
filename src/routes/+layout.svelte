<script>
	import { PrismicPreview } from '@prismicio/svelte/kit';
	import { page } from '$app/state';
	import { repositoryName } from '$lib/prismicio';
	import '../app.css';
	import Navbar from '$lib/components/Navbar.svelte';
	import Footer from '$lib/components/Footer.svelte';

	let { children, data } = $props();
</script>

<svelte:head>
	<title>{page.data.title}</title>
	{#if page.data.meta_description}
		<meta name="description" content={page.data.meta_description} />
	{/if}
	{#if page.data.meta_title}
		<meta name="og:title" content={page.data.meta_title} />
	{/if}
	{#if page.data.meta_image}
		<meta name="og:image" content={page.data.meta_image} />
		<meta name="twitter:card" content="summary_large_image" />
	{/if}
</svelte:head>

<Navbar brand={data?.settings?.siteName ?? 'Counseling Services'} />

<main class="min-h-screen">
	{@render children()}
</main>

<Footer company={data?.settings?.siteName ?? 'Counseling Services'} tagline={data?.settings?.tagline}
  email={data?.settings?.email} phone={data?.settings?.phone} address={data?.settings?.address} />

<PrismicPreview {repositoryName} />
