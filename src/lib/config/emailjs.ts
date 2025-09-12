// EmailJS Configuration
// Replace these values with your actual EmailJS credentials

export const EMAILJS_CONFIG = {
	// Get these from https://dashboard.emailjs.com/
	SERVICE_ID: import.meta.env.VITE_EMAILJS_SERVICE_ID,
	TEMPLATE_ID: import.meta.env.VITE_EMAILJS_TEMPLATE_ID, // Replace with your EmailJS template ID
	PUBLIC_KEY: import.meta.env.VITE_EMAILJS_PUBLIC_KEY, // Replace with your EmailJS public key
} as const;

// Email template parameters interface
export interface EmailTemplateParams extends Record<string, unknown> {
	from_name: string;
	from_email: string;
	phone: string;
	service: string;
	has_insurance: string;
	insurance_provider: string;
	message: string;
	to_email: string;
}
