<script lang="ts">
	import type { ContactFormSlice } from '../../../prismicio-types';
	import { PrismicLink } from '@prismicio/svelte';
	import { isFilled } from '@prismicio/client';

	export let slice: ContactFormSlice;

	let { primary, items } = slice;
	let isSubmitted = false;
	let isSubmitting = false;
	
	// Get section styles from color fields
	$: sectionStyle = getSectionStyle();
	
	function getSectionStyle() {
		let styles = '';
		if (isFilled.color(primary.background_color)) {
			styles += `background-color: ${primary.background_color}; `;
		}
		if (isFilled.color(primary.text_color)) {
			styles += `color: ${primary.text_color}; `;
		}
		return styles;
	}
	
	// Get layout classes
	$: layoutClasses = getLayoutClasses(primary.layout);
	
	function getLayoutClasses(layout: string | null | undefined) {
		switch (layout) {
			case 'form-left':
				return 'grid grid-cols-1 lg:grid-cols-3 gap-12';
			case 'form-right':
				return 'grid grid-cols-1 lg:grid-cols-3 gap-12';
			case 'centered':
				return 'max-w-2xl mx-auto';
			case 'split':
				return 'grid grid-cols-1 lg:grid-cols-2 gap-12';
			default:
				return 'grid grid-cols-1 lg:grid-cols-2 gap-12';
		}
	}
	
	// Separate form fields from contact info
	$: formFields = (items || []).filter(item => 
		isFilled.keyText(item.field_label) && isFilled.keyText(item.contact_field)
	);
	
	$: contactInfo = (items || []).filter(item => 
		isFilled.keyText(item.contact_info_title) && isFilled.keyText(item.contact_info_content)
	);
	
	// Get contact icon
	function getContactIcon(iconType: string | null | undefined) {
		const iconMap: Record<string, string> = {
			phone: 'M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z',
			email: 'M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z',
			address: 'M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z M15 11a3 3 0 11-6 0 3 3 0 016 0z',
			hours: 'M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z',
			website: 'M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9'
		};
		
		return iconMap[iconType || ''] || iconMap.phone;
	}
	
	// Handle form submission
	async function handleSubmit(event: SubmitEvent) {
		event.preventDefault();
		isSubmitting = true;
		
		// Simulate form submission
		await new Promise(resolve => setTimeout(resolve, 1500));
		
		isSubmitting = false;
		isSubmitted = true;
	}
</script>

<!-- Contact Form Section with Professional Counseling Design -->
<section class="section-padding" style={sectionStyle || ''}>
	<div class="section-container">
		
		<!-- Section Header -->
		<div class="text-center mb-20 max-w-4xl mx-auto">
			{#if isFilled.keyText(primary.title)}
				<h2 class="text-display-lg mb-6" style={isFilled.color(primary.text_color) ? `color: ${primary.text_color}` : ''}>
					{primary.title}
				</h2>
			{/if}
			
			{#if isFilled.keyText(primary.subtitle)}
				<p class="text-subtitle mb-8" style={isFilled.color(primary.text_color) ? `color: ${primary.text_color}` : ''}>
					{primary.subtitle}
				</p>
			{/if}
			
			<!-- Encouraging message -->
			<div class="bg-primary-50 rounded-xl p-6 border border-primary-200">
				<div class="flex items-center justify-center gap-2 mb-3">
					<svg class="w-5 h-5 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"/>
					</svg>
					<span class="font-semibold text-primary-900">Taking the first step takes courage</span>
				</div>
				<p class="text-primary-800 text-sm">
					We're here to support you. All conversations are confidential and we typically respond within 24 hours.
				</p>
			</div>
		</div>

		<!-- Main Content -->
		<div class={layoutClasses}>
			
			<!-- Contact Information -->
			{#if primary.show_contact_info && contactInfo.length > 0}
				<div class={primary.layout === 'form-left' ? 'lg:col-span-1 lg:order-2' : primary.layout === 'form-right' ? 'lg:col-span-1 lg:order-1' : ''}>
					<div class="card-elevated bg-white p-8">
						{#if isFilled.keyText(primary.contact_info_title)}
							<h3 class="text-xl font-serif font-semibold mb-6 text-neutral-900" style={isFilled.color(primary.text_color) ? `color: ${primary.text_color}` : ''}>
								{primary.contact_info_title}
							</h3>
						{/if}
						
						<div class="space-y-6">
							{#each contactInfo as contactItem}
								<div class="flex items-start gap-4">
									<div class="w-12 h-12 bg-primary-100 rounded-xl flex items-center justify-center flex-shrink-0">
										<svg class="w-6 h-6 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2">
											<path stroke-linecap="round" stroke-linejoin="round" d={getContactIcon(contactItem.contact_info_icon)}/>
										</svg>
									</div>
									<div class="flex-1 min-w-0">
										{#if isFilled.keyText(contactItem.contact_info_title)}
											<h4 class="font-semibold text-neutral-900 mb-1" style={isFilled.color(primary.text_color) ? `color: ${primary.text_color}` : ''}>
												{contactItem.contact_info_title}
											</h4>
										{/if}
										
										{#if isFilled.keyText(contactItem.contact_info_content)}
											{#if isFilled.link(contactItem.contact_info_link)}
												<PrismicLink field={contactItem.contact_info_link} class="text-primary-600 hover:text-primary-700 transition-colors duration-200 break-words">
													{contactItem.contact_info_content}
												</PrismicLink>
											{:else}
												<p class="text-neutral-700 break-words">
													{contactItem.contact_info_content}
												</p>
											{/if}
										{/if}
									</div>
								</div>
							{/each}
						</div>

						<!-- Professional assurance -->
						<div class="mt-8 p-4 bg-sage-50 rounded-lg border border-sage-200">
							<div class="flex items-center gap-2 mb-2">
								<svg class="w-4 h-4 text-sage-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
									<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"/>
								</svg>
								<span class="text-sm font-semibold text-sage-900">Your Privacy Matters</span>
							</div>
							<p class="text-xs text-sage-800 leading-relaxed">
								All communications are strictly confidential and protected by professional counseling standards.
							</p>
						</div>
					</div>
				</div>
			{/if}

			<!-- Contact Form -->
			<div class={primary.layout === 'form-left' ? 'lg:col-span-2 lg:order-1' : primary.layout === 'form-right' ? 'lg:col-span-2 lg:order-2' : ''}>
				<div class="card-elevated bg-white p-8">
					
					{#if !isSubmitted}
						<!-- Form Header -->
						<div class="mb-8">
							<h3 class="text-xl font-serif font-semibold text-neutral-900 mb-2">
								Schedule Your First Session
							</h3>
							<p class="text-neutral-600 text-sm">
								Please share some information about yourself and what brings you here today.
							</p>
						</div>

						<!-- Contact Form -->
						<form on:submit={handleSubmit} class="space-y-6">
							
							<!-- Dynamic form fields from Prismic -->
							{#each formFields as field}
								<div>
									{#if isFilled.keyText(field.field_label)}
										<label for={field.field_label.toLowerCase().replace(' ', '_')} class="form-label">
											{field.field_label}
											{#if field.required}
												<span class="text-red-500 ml-1">*</span>
											{/if}
										</label>
									{/if}
									
									{#if field.contact_field === 'textarea'}
										<textarea 
											id={field.field_label?.toLowerCase().replace(' ', '_')}
											name={field.field_label?.toLowerCase().replace(' ', '_')}
											placeholder={field.field_placeholder || ''}
											required={field.required}
											rows="4"
											class="form-textarea"
										></textarea>
									{:else if field.contact_field === 'select' && isFilled.keyText(field.field_options)}
										<select 
											id={field.field_label?.toLowerCase().replace(' ', '_')}
											name={field.field_label?.toLowerCase().replace(' ', '_')}
											required={field.required}
											class="form-input"
										>
											<option value="">Please select...</option>
											{#each field.field_options.split(',') as option}
												<option value={option.trim()}>{option.trim()}</option>
											{/each}
										</select>
									{:else}
										<input 
											id={field.field_label?.toLowerCase().replace(' ', '_')}
											name={field.field_label?.toLowerCase().replace(' ', '_')}
											type={field.contact_field || 'text'}
											placeholder={field.field_placeholder || ''}
											required={field.required}
											class="form-input"
										/>
									{/if}
								</div>
							{/each}

							<!-- Standard fields if no custom fields defined -->
							{#if formFields.length === 0}
								<div class="grid grid-cols-1 md:grid-cols-2 gap-6">
									<div>
										<label for="first_name" class="form-label">First Name <span class="text-red-500">*</span></label>
										<input type="text" id="first_name" name="first_name" required class="form-input" placeholder="Your first name" />
									</div>
									<div>
										<label for="last_name" class="form-label">Last Name <span class="text-red-500">*</span></label>
										<input type="text" id="last_name" name="last_name" required class="form-input" placeholder="Your last name" />
									</div>
								</div>
								
								<div>
									<label for="email" class="form-label">Email Address <span class="text-red-500">*</span></label>
									<input type="email" id="email" name="email" required class="form-input" placeholder="your.email@example.com" />
								</div>
								
								<div>
									<label for="phone" class="form-label">Phone Number</label>
									<input type="tel" id="phone" name="phone" class="form-input" placeholder="(555) 123-4567" />
								</div>
								
								<div>
									<label for="preferred_contact" class="form-label">Preferred Contact Method</label>
									<select id="preferred_contact" name="preferred_contact" class="form-input">
										<option value="">Please select...</option>
										<option value="email">Email</option>
										<option value="phone">Phone Call</option>
										<option value="text">Text Message</option>
									</select>
								</div>
								
								<div>
									<label for="session_type" class="form-label">Type of Support Needed</label>
									<select id="session_type" name="session_type" class="form-input">
										<option value="">Please select...</option>
										<option value="individual">Individual Therapy</option>
										<option value="couples">Couples Counseling</option>
										<option value="family">Family Therapy</option>
										<option value="group">Group Sessions</option>
										<option value="consultation">Initial Consultation</option>
									</select>
								</div>
								
								<div>
									<label for="message" class="form-label">What brings you here today? <span class="text-red-500">*</span></label>
									<textarea 
										id="message" 
										name="message" 
										required 
										rows="4" 
										class="form-textarea"
										placeholder="Please share what's bringing you to seek counseling support. This helps us prepare for our first conversation together."
									></textarea>
								</div>
							{/if}

							<!-- Consent and privacy -->
							<div class="border-t border-neutral-200 pt-6">
								<div class="flex items-start gap-3">
									<input type="checkbox" id="consent" name="consent" required class="mt-1 w-4 h-4 text-primary-600 border-neutral-300 rounded focus:ring-primary-500" />
									<label for="consent" class="text-sm text-neutral-700 leading-relaxed">
										I understand that this form is secure and my information will be kept confidential. I consent to being contacted about scheduling an appointment. <span class="text-red-500">*</span>
									</label>
								</div>
							</div>

							<!-- Submit button -->
							<button 
								type="submit" 
								disabled={isSubmitting}
								class="btn-primary w-full justify-center hover-lift focus-ring disabled:opacity-50 disabled:cursor-not-allowed inline-flex items-center gap-2"
								style={isFilled.color(primary.accent_color) ? `background-color: ${primary.accent_color}; border-color: ${primary.accent_color}` : ''}
							>
								{#if isSubmitting}
									<svg class="w-4 h-4 animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24">
										<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"/>
									</svg>
									Submitting...
								{:else}
									<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
										<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"/>
									</svg>
									{primary.form_submit_text || 'Send Message'}
								{/if}
							</button>
						</form>
					{:else}
						<!-- Success message -->
						<div class="text-center py-12">
							<div class="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-6">
								<svg class="w-8 h-8 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
									<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>
								</svg>
							</div>
							<h3 class="text-2xl font-serif font-semibold text-neutral-900 mb-4">
								Thank You for Reaching Out
							</h3>
							<p class="text-neutral-700 leading-relaxed mb-6 max-w-md mx-auto">
								{primary.success_message || "We've received your message and will respond within 24 hours. Taking this step shows real strength."}
							</p>
							<div class="bg-primary-50 rounded-lg p-4 border border-primary-200">
								<p class="text-sm text-primary-800">
									<strong>What's next?</strong> We'll review your message and reach out to schedule a brief consultation where we can discuss your needs and answer any questions.
								</p>
							</div>
						</div>
					{/if}
				</div>
			</div>
		</div>
	</div>
</section>
