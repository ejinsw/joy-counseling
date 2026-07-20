<script lang="ts">
	import { page } from '$app/state';
	import { AlertCircle, ArrowLeft, CalendarCheck, CheckCircle, ExternalLink } from '@lucide/svelte';
	import { isFilled } from '@prismicio/client';
	import { PrismicImage } from '@prismicio/svelte';
	import { headwaySchedulingUrl } from '$lib/config/scheduling';
	import { localeFromPath, uiText } from '$lib/i18n';
	import type { ContactFormSlice } from '../../../prismicio-types';

	let { slice }: { slice: ContactFormSlice } = $props();
	let isSubmitted = $state(false);
	let isSubmitting = $state(false);
	let showManualForm = $state(false);
	let submitError = $state('');
	const primary = $derived(slice.primary);
	const locale = $derived(localeFromPath(page.url.pathname));
	const copy = $derived(uiText[locale].contactForm);

	async function handleSubmit(event: SubmitEvent) {
		event.preventDefault();
		isSubmitting = true;
		submitError = '';

		try {
			const form = event.target as HTMLFormElement;
			const formData = new FormData(form);

			const formDataObj = {
				first_name: formData.get('first_name'),
				last_name: formData.get('last_name'),
				email: formData.get('email'),
				phone: formData.get('phone'),
				service: formData.get('service'),
				has_insurance: formData.get('has_insurance'),
				insurance_provider: formData.get('insurance_provider'),
				message: formData.get('message'),
				reception_email: primary.reception_email as string
			};

			const response = await fetch('/api/contact', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify(formDataObj)
			});

			const result = await response.json();

			if (!response.ok) {
				throw new Error(result.error || copy.failure);
			}

			isSubmitted = true;
			form.reset();
		} catch (error) {
			console.error('Form submission failed:', error);
			submitError = error instanceof Error ? error.message : copy.failure;
		} finally {
			isSubmitting = false;
		}
	}
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
				{#if !isSubmitted}
					{#if !showManualForm}
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

									<button
										type="button"
										class="focus-ring min-h-14 rounded-md border border-neutral-200 bg-[#fffdf8] px-4 py-3 text-left text-base font-semibold text-neutral-900 transition-colors hover:bg-neutral-50"
										onclick={() => {
											showManualForm = true;
											submitError = '';
										}}
									>
										{copy.formOptionTitle}
									</button>
								</div>
							</div>
						</div>
					{:else}
						<div class="p-6 md:p-8 lg:p-10">
							<button
								type="button"
								class="focus-ring mb-8 inline-flex items-center gap-2 rounded-sm text-sm font-semibold text-primary-900 transition-colors hover:text-primary-700"
								onclick={() => {
									showManualForm = false;
									submitError = '';
								}}
							>
								<ArrowLeft class="h-4 w-4" aria-hidden="true" />
								{copy.backToOptions}
							</button>

							{#if isFilled.keyText(primary.form_header_title)}
								<h3 class="text-2xl font-semibold text-neutral-900">
									{primary.form_header_title}
								</h3>
							{/if}

							{#if isFilled.keyText(primary.form_header_description)}
								<p class="mt-3 max-w-2xl leading-7 text-neutral-700">
									{primary.form_header_description}
								</p>
							{/if}

							<form id="contact-form" onsubmit={handleSubmit} class="mt-8 grid gap-6">
								<div class="grid gap-6 md:grid-cols-2">
									<div>
										<label for="first_name" class="form-label"
											>{copy.firstName} <span aria-hidden="true">*</span></label
										>
										<input
											type="text"
											id="first_name"
											name="first_name"
											required
											autocomplete="given-name"
											class="form-input"
											placeholder={copy.firstNamePlaceholder}
										/>
									</div>

									<div>
										<label for="last_name" class="form-label"
											>{copy.lastName} <span aria-hidden="true">*</span></label
										>
										<input
											type="text"
											id="last_name"
											name="last_name"
											required
											autocomplete="family-name"
											class="form-input"
											placeholder={copy.lastNamePlaceholder}
										/>
									</div>
								</div>

								<div class="grid gap-6 md:grid-cols-2">
									<div>
										<label for="email" class="form-label"
											>{copy.email} <span aria-hidden="true">*</span></label
										>
										<input
											type="email"
											id="email"
											name="email"
											required
											autocomplete="email"
											class="form-input"
											placeholder={copy.emailPlaceholder}
										/>
									</div>

									<div>
										<label for="phone" class="form-label">{copy.phone}</label>
										<input
											type="tel"
											id="phone"
											name="phone"
											autocomplete="tel"
											class="form-input"
											placeholder={copy.phonePlaceholder}
										/>
									</div>
								</div>

								<div class="grid gap-6 md:grid-cols-2">
									<div>
										<label for="service" class="form-label"
											>{copy.service} <span aria-hidden="true">*</span></label
										>
										<select required id="service" name="service" class="form-input">
											<option value="" disabled selected>{copy.selectService}</option>
											{#each primary.services || [] as service}
												{#if service.name}
													<option value={service.name}>{service.name}</option>
												{/if}
											{/each}
										</select>
									</div>

									<div>
										<label for="has_insurance" class="form-label">
											{copy.insuranceQuestion} <span aria-hidden="true">*</span>
										</label>
										<select required id="has_insurance" name="has_insurance" class="form-input">
											<option value="" disabled selected>{copy.selectOption}</option>
											<option value="yes">{copy.yes}</option>
											<option value="no">{copy.no}</option>
											<option value="not_sure">{copy.notSure}</option>
										</select>
									</div>
								</div>

								<div>
									<label for="insurance_provider" class="form-label">{copy.insuranceProvider}</label
									>
									<input
										type="text"
										id="insurance_provider"
										name="insurance_provider"
										class="form-input"
										placeholder={copy.insuranceProvider}
									/>
								</div>

								<div>
									<label for="message" class="form-label">{copy.message}</label>
									<textarea
										id="message"
										name="message"
										rows="5"
										class="form-textarea"
										placeholder={copy.messagePlaceholder}
									></textarea>
								</div>

								<div class="flex items-start gap-3 rounded-md bg-secondary-100/70 p-4">
									<input
										type="checkbox"
										id="consent"
										name="consent"
										required
										class="mt-1 h-4 w-4 rounded border-neutral-300 text-primary-700 focus:ring-primary-700"
									/>
									<label for="consent" class="text-sm leading-6 text-neutral-700">
										{copy.consent} <span aria-hidden="true">*</span>
									</label>
								</div>

								{#if submitError}
									<div
										class="rounded-md border border-red-200 bg-red-50 p-4 text-red-900"
										role="alert"
									>
										<div class="flex gap-3">
											<AlertCircle class="mt-0.5 h-5 w-5 shrink-0" aria-hidden="true" />
											<p class="text-sm leading-6">{submitError}</p>
										</div>
									</div>
								{/if}

								<button
									type="submit"
									disabled={isSubmitting}
									class="btn-primary focus-ring w-full sm:w-auto"
								>
									{isSubmitting ? copy.submitting : copy.sendMessage}
								</button>
							</form>
						</div>
					{/if}
				{:else}
					<div class="p-6 md:p-8">
						<div
							class="mb-6 flex h-14 w-14 items-center justify-center rounded-md bg-primary-50 text-primary-800"
						>
							<CheckCircle class="h-7 w-7" aria-hidden="true" />
						</div>
						<h3 class="text-2xl font-semibold text-neutral-900">{copy.successTitle}</h3>
						<p class="mt-4 max-w-2xl leading-7 text-neutral-700">
							{copy.successBody}
						</p>
						<div class="mt-6 rounded-md border border-primary-200 bg-primary-50 p-4">
							<p class="text-sm leading-6 text-primary-950">
								<strong>{copy.nextTitle}</strong>
								{copy.nextBody}
							</p>
						</div>
					</div>
				{/if}
			</div>
		</div>
	</div>
</section>
