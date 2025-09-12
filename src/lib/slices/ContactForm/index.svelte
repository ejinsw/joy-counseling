<script lang="ts">
	import type { ContactFormSlice } from '../../../prismicio-types';
	import { isFilled } from '@prismicio/client';
	import emailjs from '@emailjs/browser';
	import { EMAILJS_CONFIG, type EmailTemplateParams } from '../../config/emailjs';

	export let slice: ContactFormSlice;

	let { primary } = slice;
	let isSubmitted = false;
	let isSubmitting = false;
	let submitError = '';

	// Handle form submission
	async function handleSubmit(event: SubmitEvent) {
		event.preventDefault();
		isSubmitting = true;
		submitError = '';

		try {
			const form = event.target as HTMLFormElement;
			const formData = new FormData(form);

			// Prepare email template parameters
			const templateParams: EmailTemplateParams = {
				from_name: `${formData.get('first_name')} ${formData.get('last_name')}`,
				from_email: formData.get('email') as string,
				phone: (formData.get('phone') as string) || 'Not provided',
				service: formData.get('service') as string,
				has_insurance: formData.get('has_insurance') as string,
				insurance_provider: (formData.get('insurance_provider') as string) || 'Not provided',
				message: (formData.get('message') as string) || 'No message provided',
				to_email: slice.primary.reception_email as string,
			};

			// Send email using EmailJS
			await emailjs.send(
				EMAILJS_CONFIG.SERVICE_ID,
				EMAILJS_CONFIG.TEMPLATE_ID,
				templateParams,
				EMAILJS_CONFIG.PUBLIC_KEY
			);

			isSubmitted = true;
			form.reset(); // Clear the form
		} catch (error) {
			console.error('Email sending failed:', error);
			submitError = 'Failed to send message. Please try again or contact us directly.';
		} finally {
			isSubmitting = false;
		}
	}
</script>

<!-- Contact Form Section -->
<section
	class="py-16 px-4"
	data-slice-type={slice.slice_type}
	data-slice-variation={slice.variation}
>
	<div class="max-w-4xl mx-auto">
		<!-- Section Header -->
		<div class="text-center mb-12">
			{#if isFilled.keyText(primary.title)}
				<h2 class="text-4xl font-bold mb-4">
					{primary.title}
				</h2>
			{/if}

			{#if isFilled.keyText(primary.subtitle)}
				<p class="text-lg text-gray-600 mb-8">
					{primary.subtitle}
				</p>
			{/if}
		</div>

		<!-- Contact Form -->
		<div class="bg-white rounded-lg shadow-lg p-8">
			{#if !isSubmitted}
				<!-- Form Header -->
				<div class="mb-8">
					{#if isFilled.keyText(primary.form_header_title)}
						<h3 class="text-2xl font-semibold mb-2">
							{primary.form_header_title}
						</h3>
					{/if}

					{#if isFilled.keyText(primary.form_header_description)}
						<p class="text-gray-600">
							{primary.form_header_description}
						</p>
					{/if}
				</div>

				<!-- Contact Form -->
				<form on:submit={handleSubmit} class="space-y-6">
					<div class="grid grid-cols-1 md:grid-cols-2 gap-6">
						<div>
							<label for="first_name" class="block text-sm font-medium text-gray-700 mb-2">
								First Name <span class="text-red-500">*</span>
							</label>
							<input
								type="text"
								id="first_name"
								name="first_name"
								required
								class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
								placeholder="Your first name"
							/>
						</div>
						<div>
							<label for="last_name" class="block text-sm font-medium text-gray-700 mb-2">
								Last Name <span class="text-red-500">*</span>
							</label>
							<input
								type="text"
								id="last_name"
								name="last_name"
								required
								class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
								placeholder="Your last name"
							/>
						</div>
					</div>

					<div>
						<label for="email" class="block text-sm font-medium text-gray-700 mb-2">
							Email Address <span class="text-red-500">*</span>
						</label>
						<input
							type="email"
							id="email"
							name="email"
							required
							class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
							placeholder="your.email@example.com"
						/>
					</div>

					<div>
						<label for="phone" class="block text-sm font-medium text-gray-700 mb-2">
							Phone Number
						</label>
						<input
							type="tel"
							id="phone"
							name="phone"
							class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
							placeholder="(555) 123-4567"
						/>
					</div>

					<div>
						<label for="service" class="block text-sm font-medium text-gray-700 mb-2">
							Service <span class="text-red-500">*</span>
						</label>
						<select
							required
							id="service"
							name="service"
							class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
							placeholder="Select a service"
						>
							{#each primary.services as service}
								<option value={service.name}>{service.name}</option>
							{/each}
						</select>
					</div>

					<div>
						<label for="has_insurance" class="block text-sm font-medium text-gray-700 mb-2">
							Do you have insurance? <span class="text-red-500">*</span>
						</label>
						<select
							required
							id="has_insurance"
							name="has_insurance"
							class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
							placeholder="Select an option"
						>
							<option value="yes">Yes</option>
							<option value="no">No</option>
							<option value="not_sure">Not sure</option>
						</select>
					</div>

					<div>
						<label for="insurance_provider" class="block text-sm font-medium text-gray-700 mb-2">
							Insurance Provider
						</label>
						<input
							type="text"
							id="insurance_provider"
							name="insurance_provider"
							class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
							placeholder="Insurance Provider"
						/>
					</div>

					<div>
						<label for="message" class="block text-sm font-medium text-gray-700 mb-2">
							Message
						</label>
						<textarea
							id="message"
							name="message"
							rows="4"
							class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
							placeholder="Please share what's bringing you to seek counseling support."
						></textarea>
					</div>

					<!-- Consent checkbox -->
					<div class="flex items-start gap-3">
						<input
							type="checkbox"
							id="consent"
							name="consent"
							required
							class="mt-1 w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
						/>
						<label for="consent" class="text-sm text-gray-700">
							I understand that this form is secure and my information will be kept confidential. I
							consent to being contacted about scheduling an appointment. <span class="text-red-500"
								>*</span
							>
						</label>
					</div>

					<!-- Error message -->
					{#if submitError}
						<div class="bg-red-50 border border-red-200 rounded-md p-4">
							<div class="flex">
								<div class="flex-shrink-0">
									<svg class="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
										<path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd" />
									</svg>
								</div>
								<div class="ml-3">
									<p class="text-sm text-red-800">{submitError}</p>
								</div>
							</div>
						</div>
					{/if}

					<!-- Submit button -->
					<button
						type="submit"
						disabled={isSubmitting}
						class="w-full bg-blue-600 text-white py-3 px-6 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
					>
						{#if isSubmitting}
							<svg
								class="w-4 h-4 animate-spin"
								fill="none"
								stroke="currentColor"
								viewBox="0 0 24 24"
							>
								<path
									stroke-linecap="round"
									stroke-linejoin="round"
									stroke-width="2"
									d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
								/>
							</svg>
							Submitting...
						{:else}
							Send Message
						{/if}
					</button>
				</form>
			{:else}
				<!-- Success message -->
				<div class="text-center py-12">
					<div
						class="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6"
					>
						<svg
							class="w-8 h-8 text-green-600"
							fill="none"
							stroke="currentColor"
							viewBox="0 0 24 24"
						>
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								stroke-width="2"
								d="M5 13l4 4L19 7"
							/>
						</svg>
					</div>
					<h3 class="text-2xl font-semibold text-gray-900 mb-4">Thank You for Reaching Out</h3>
					<p class="text-gray-700 leading-relaxed mb-6 max-w-md mx-auto">
						We've received your message and will respond within 24 hours. Taking this step shows
						real strength.
					</p>
					<div class="bg-blue-50 rounded-lg p-4 border border-blue-200">
						<p class="text-sm text-blue-800">
							<strong>What's next?</strong> We'll review your message and reach out to schedule a brief
							consultation where we can discuss your needs and answer any questions.
						</p>
					</div>
				</div>
			{/if}
		</div>
	</div>
</section>
