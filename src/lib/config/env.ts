import { env } from '$env/dynamic/private';

export const getEmailConfig = () => {
	const gmailUser = env.GMAIL_USER;
	const gmailPassword = env.GMAIL_APP_PASSWORD;

	if (!gmailUser || !gmailPassword) {
		throw new Error('Missing Gmail environment variables');
	}

	return {
		gmailUser,
		gmailPassword,
	};
};
