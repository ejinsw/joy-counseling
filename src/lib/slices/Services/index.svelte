<script lang="ts">
	import { page } from '$app/state';
	import { asText, isFilled } from '@prismicio/client';
	import { PrismicLink, PrismicRichText } from '@prismicio/svelte';
	import {
		Brain,
		Circle,
		Cross,
		HandHeart,
		Handshake,
		Heart,
		Leaf,
		MessageCircle,
		Sprout,
		Users
	} from '@lucide/svelte';
	import DocumentModal from '$lib/components/DocumentModal.svelte';
	import { localeFromPath, uiText } from '$lib/i18n';
	import type { ServicesSlice } from '../../../prismicio-types';

	let { slice }: { slice: ServicesSlice } = $props();
	let { primary, items } = slice;
	let activeService = $state<number | null>(null);
	const services = items || [];
	const locale = $derived(localeFromPath(page.url.pathname));
	const copy = $derived(uiText[locale]);

	function getServiceIcon(iconType: string | null | undefined) {
		const iconMap: Record<string, any> = {
			heart: Heart,
			brain: Brain,
			conversation: MessageCircle,
			growth: Sprout,
			family: Users,
			couple: Handshake,
			mindfulness: Leaf,
			wellness: HandHeart,
			christ: Cross,
			animal: HandHeart
		};

		return iconMap[iconType || ''] || Circle;
	}
</script>

<section class="section-padding bg-secondary-50">
	<div class="section-container">
		<div class="mb-12 max-w-3xl">
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
			<div class="grid gap-4 lg:grid-cols-2">
				{#each services as service, index}
					{@const Icon = getServiceIcon(service.icon)}
					{@const descriptionText = isFilled.richText(service.description)
						? asText(service.description)
						: ''}
					<article class="rounded-2xl border border-neutral-200 bg-[#fbfcf8] p-6 md:p-7">
						<div class="flex items-start gap-4">
							<div
								class="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-primary-50 text-primary-800"
							>
								<Icon class="h-5 w-5" aria-hidden="true" />
							</div>

							<div class="min-w-0 flex-1">
								{#if isFilled.keyText(service.title)}
									<h3 class="text-xl font-semibold leading-7 text-neutral-900">
										{service.title}
									</h3>
								{/if}

								{#if descriptionText}
									<p class="truncate-block mt-3 text-sm leading-7 text-neutral-700">
										{descriptionText}
									</p>
								{/if}

								<div class="mt-5 flex flex-wrap items-center gap-x-5 gap-y-3">
									{#if isFilled.richText(service.description)}
										<button
											type="button"
											class="focus-ring inline-flex rounded-full border border-primary-700/35 px-4 py-2 text-sm font-semibold text-primary-800 transition-colors hover:bg-primary-50"
											onclick={() => (activeService = index)}
										>
											{copy.common.details}
										</button>
									{/if}

									{#if isFilled.link(service.cta_link) && isFilled.keyText(service.cta_text)}
										<PrismicLink
											field={service.cta_link}
											class="focus-ring inline-flex rounded-lg text-sm font-semibold text-primary-800 underline decoration-primary-700/25 underline-offset-4 transition-colors hover:text-primary-950"
										>
											{service.cta_text}
										</PrismicLink>
									{/if}
								</div>

								{#if isFilled.richText(service.description)}
									<DocumentModal
										open={activeService === index}
										title={service.title}
										onClose={() => (activeService = null)}
									>
										<PrismicRichText field={service.description} />

										{#if isFilled.link(service.cta_link) && isFilled.keyText(service.cta_text)}
											<div class="not-prose mt-8">
												<PrismicLink field={service.cta_link} class="btn-primary focus-ring">
													{service.cta_text}
												</PrismicLink>
											</div>
										{/if}
									</DocumentModal>
								{/if}
							</div>
						</div>
					</article>
				{/each}
			</div>
		{/if}
	</div>
</section>
