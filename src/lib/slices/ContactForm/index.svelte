<script lang="ts">
	import { page } from '$app/state';
	import { CalendarCheck, ExternalLink } from '@lucide/svelte';
	import { isFilled } from '@prismicio/client';
	import { PrismicImage } from '@prismicio/svelte';
	import { headwaySchedulingUrl } from '$lib/config/scheduling';
	import { localeFromPath, uiText } from '$lib/i18n';
	import type { ContactFormSlice } from '../../../prismicio-types';

	let { slice }: { slice: ContactFormSlice } = $props();
	const primary = $derived(slice.primary);
	const locale = $derived(localeFromPath(page.url.pathname));
	const copy = $derived(uiText[locale].contactForm);
</script>

<section
	class="section-padding bg-secondary-50"
	data-slice-type={slice.slice_type}
	data-slice-variation={slice.variation}
>
	<div class="section-container">
		<div class="mx-auto max-w-5xl">
			<div class="mb-10 max-w-3xl">
				{#if isFilled.keyText(primary.title)}
					<h2 class="text-display-lg">{primary.title}</h2>
				{/if}

				{#if isFilled.keyText(primary.subtitle)}
					<p class="mt-4 text-lg leading-8 text-neutral-600">
						{primary.subtitle}
					</p>
				{/if}
			</div>

			<div class="edge-surface rounded-md border border-neutral-200">
				<div
					class="grid overflow-hidden rounded-md lg:grid-cols-[minmax(0,0.95fr)_minmax(380px,1.05fr)]"
				>
					<div
						class="relative aspect-[4/3] min-h-[220px] bg-primary-900 sm:min-h-[280px] lg:aspect-auto lg:min-h-[560px]"
					>
						{#if isFilled.image(primary.picture)}
							<PrismicImage
								field={primary.picture}
								class="absolute inset-0 h-full w-full object-cover"
							/>
						{:else}
							<div class="absolute inset-0 bg-primary-900"></div>
						{/if}
						<div
							class="absolute inset-0 bg-gradient-to-t from-[#122720]/38 via-transparent to-transparent"
						></div>
					</div>

					<div
						class="flex flex-col justify-start px-5 py-7 sm:p-8 lg:min-h-[560px] lg:justify-center lg:p-10"
					>
						<div class="max-w-md">
							<h3 class="text-3xl font-semibold leading-tight text-neutral-900">
								{copy.scheduleTitle}
							</h3>
						</div>

						<div class="mt-7 grid gap-3">
							<a
								href={headwaySchedulingUrl}
								target="_blank"
								rel="noopener noreferrer"
								class="focus-ring group flex min-h-14 items-center justify-between gap-3 rounded-md bg-primary-700 px-4 py-3 text-secondary-50 transition-colors hover:bg-primary-800 active:bg-primary-900"
								aria-label={copy.headwayAria}
							>
								<span class="flex min-w-0 items-center gap-2.5">
									<span
										class="flex h-9 w-9 shrink-0 items-center justify-center rounded-md bg-secondary-50/14 text-secondary-50"
									>
										<CalendarCheck class="h-5 w-5" aria-hidden="true" />
									</span>
									<span class="min-w-0 text-base font-semibold">
										{copy.headwayOptionTitle}
									</span>
								</span>
								<ExternalLink class="hidden h-4 w-4 shrink-0 sm:block" aria-hidden="true" />
							</a>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</section>
