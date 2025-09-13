import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import nodemailer from 'nodemailer';
import { getEmailConfig } from '$lib/config/env';

export const POST: RequestHandler = async ({ request }) => {
	try {
		const formData = await request.json();

		// Validate required fields
		const requiredFields = ['first_name', 'last_name', 'email', 'service', 'has_insurance'];
		for (const field of requiredFields) {
			if (!formData[field]) {
				return json({ error: `Missing required field: ${field}` }, { status: 400 });
			}
		}

		// Get environment variables
		const { gmailUser, gmailPassword } = getEmailConfig();
		const receptionEmail = formData.reception_email;

		if (!gmailUser || !gmailPassword || !receptionEmail) {
			console.error('Missing email configuration:');
			console.error('- GMAIL_USER:', gmailUser ? 'OK' : 'MISSING');
			console.error('- GMAIL_APP_PASSWORD:', gmailPassword ? 'OK' : 'MISSING');
			console.error('- Reception email:', receptionEmail ? 'OK' : 'MISSING');

			return json({ error: 'Email service not configured properly' }, { status: 500 });
		}

		// Create transporter
		const transporter = nodemailer.createTransport({
			service: 'gmail',
			auth: {
				user: gmailUser,
				pass: gmailPassword
			}
		});

		// Prepare email content
		const emailHtml = `
			<div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
				<h2 style="color: #333; border-bottom: 2px solid #007bff; padding-bottom: 10px;">
					New Contact Form Submission
				</h2>
				
				<div style="background-color: #f8f9fa; padding: 20px; margin: 20px 0; border-radius: 5px;">
					<h3 style="color: #007bff; margin-top: 0;">Contact Information</h3>
					<p><strong>Name:</strong> ${formData.first_name} ${formData.last_name}</p>
					<p><strong>Email:</strong> <a href="mailto:${formData.email}">${formData.email}</a></p>
					<p><strong>Phone:</strong> ${formData.phone || 'Not provided'}</p>
					<p><strong>Service Interest:</strong> ${formData.service}</p>
				</div>

				<div style="background-color: #e8f5e8; padding: 20px; margin: 20px 0; border-radius: 5px;">
					<h3 style="color: #28a745; margin-top: 0;">Insurance Information</h3>
					<p><strong>Has Insurance:</strong> ${formData.has_insurance}</p>
					<p><strong>Insurance Provider:</strong> ${formData.insurance_provider || 'Not provided'}</p>
				</div>

				<div style="background-color: #fff3cd; padding: 20px; margin: 20px 0; border-radius: 5px;">
					<h3 style="color: #856404; margin-top: 0;">Message</h3>
					<p style="white-space: pre-wrap;">${formData.message || 'No message provided'}</p>
				</div>

				<div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #ddd; text-align: center;">
					<p style="color: #666; font-size: 12px;">
						This message was sent from your counseling practice contact form.
					</p>
					<p style="margin-top: 10px;">
						<a href="mailto:${formData.email}?subject=Re: Your Counseling Inquiry" 
						   style="background-color: #007bff; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px;">
							Reply to Client
						</a>
					</p>
				</div>
			</div>
		`;

		// Send email
		await transporter.sendMail({
			from: gmailUser,
			to: receptionEmail,
			subject: `New Contact Form Submission - ${formData.first_name} ${formData.last_name}`,
			html: emailHtml,
			replyTo: formData.email
		});

		return json({ success: true, message: 'Email sent successfully' });
	} catch (error) {
		console.error('Email sending failed:', error);
		return json({ error: 'Failed to send email. Please try again later.' }, { status: 500 });
	}
};
