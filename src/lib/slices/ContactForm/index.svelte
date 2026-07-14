<script lang="ts">
	import { page } from '$app/state';
	import { AlertCircle, CheckCircle } from '@lucide/svelte';
	import { isFilled } from '@prismicio/client';
	import { localeFromPath, uiText } from '$lib/i18n';
	import type { ContactFormSlice } from '../../../prismicio-types';

	let { slice }: { slice: ContactFormSlice } = $props();
	let isSubmitted = $state(false);
	let isSubmitting = $state(false);
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
		<div class="mx-auto max-w-4xl">
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

			<div class="edge-surface rounded-md border border-neutral-200 p-6 md:p-8">
				{#if !isSubmitted}
					<div class="mb-8">
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
					</div>

						<form onsubmit={handleSubmit} class="grid gap-6">
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
								<label for="insurance_provider" class="form-label">{copy.insuranceProvider}</label>
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
					{:else}
						<div class="py-8">
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
