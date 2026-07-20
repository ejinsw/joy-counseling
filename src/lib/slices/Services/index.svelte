<script lang="ts">
	import { page } from '$app/state';
	import { asText, isFilled } from '@prismicio/client';
	import { PrismicImage, PrismicRichText } from '@prismicio/svelte';
	import DocumentModal from '$lib/components/DocumentModal.svelte';
	import { localeFromPath, uiText } from '$lib/i18n';
	import type { ServicesSlice, ServicesSliceDefaultItem } from '../../../prismicio-types';

	let { slice }: { slice: ServicesSlice } = $props();
	let { primary, items } = slice;
	let activeService = $state<number | null>(null);
	const services = items || [];
	const locale = $derived(localeFromPath(page.url.pathname));
	const copy = $derived(uiText[locale]);

	function getServiceMedia(service: ServicesSliceDefaultItem) {
		return service.image;
	}

	function getCardClass(index: number) {
		return index % 2 === 0 ? 'bg-[#5f8796] text-white' : 'bg-[#252a3a] text-white';
	}

	function getButtonClass(index: number) {
		return index % 2 === 0
			? 'focus-ring inline-flex w-full items-center justify-center rounded-md bg-[#252a3a] px-6 py-3 text-base font-semibold text-white transition-colors hover:bg-[#1d2230]'
			: 'focus-ring inline-flex w-full items-center justify-center rounded-md bg-[#dfe9ee] px-6 py-3 text-base font-semibold text-[#252a3a] transition-colors hover:bg-white';
	}
</script>

<section class="section-padding border-t border-neutral-200 bg-[#f4efe6]">
	<div class="section-container">
		<div class="mx-auto mb-12 max-w-3xl text-center">
			{#if isFilled.keyText(primary.title)}
				<h2 class="text-display-lg">{primary.title}</h2>
			{/if}

			{#if isFilled.keyText(primary.subtitle)}
				<p class="mt-4 text-lg leading-8 text-neutral-600">
					{primary.subtitle}
				</p>
			{/if}
		</div>

		{#if services.length > 0}
			<div class="grid gap-6 lg:grid-cols-2">
				{#each services as service, index}
					{@const descriptionText = isFilled.richText(service.description)
						? asText(service.description)
						: ''}
					{@const serviceMedia = getServiceMedia(service)}
					<article
						class={`relative flex min-h-full flex-col overflow-hidden rounded-[18px] ${getCardClass(index)} ${activeService === index ? 'z-[120]' : 'z-0'}`}
					>
						{#if isFilled.image(serviceMedia)}
							<div class="h-52 bg-white/15 sm:h-60 md:h-72">
								<PrismicImage field={serviceMedia} class="h-full w-full object-cover" />
							</div>
						{:else}
							<div
								class="flex h-52 items-center justify-center bg-white/15 sm:h-60 md:h-72"
								aria-hidden="true"
							></div>
						{/if}

						<div class="flex flex-1 flex-col px-7 py-8 text-center md:px-10 md:py-10">
							{#if isFilled.keyText(service.title)}
								<h3
									class="text-lg font-semibold uppercase leading-7 tracking-[0.24em] text-white md:text-xl"
								>
									{service.title}
								</h3>
							{/if}

							{#if descriptionText}
								<p class="truncate-block mx-auto mt-6 max-w-md text-lg leading-8 text-white/95">
									{descriptionText}
								</p>
							{/if}

							<div class="mt-auto pt-8">
								{#if isFilled.richText(service.description)}
									<button
										type="button"
										class={getButtonClass(index)}
										onclick={() => (activeService = index)}
									>
										{copy.common.readMore}
									</button>
								{/if}
							</div>

							{#if isFilled.richText(service.description)}
								<DocumentModal
									open={activeService === index}
									title={service.title}
									onClose={() => (activeService = null)}
								>
									{#snippet media()}
										{#if isFilled.image(serviceMedia)}
											<PrismicImage field={serviceMedia} class="h-56 w-full object-cover sm:h-72" />
										{/if}
									{/snippet}

									<PrismicRichText field={service.description} />
								</DocumentModal>
							{/if}
						</div>
					</article>
				{/each}
			</div>
		{/if}
	</div>
</section>
