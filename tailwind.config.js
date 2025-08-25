/** @type {import('tailwindcss').Config} */
export default {
	content: [
		'./src/**/*.{html,js,svelte,ts}',
		'./node_modules/@skeletonlabs/skeleton-svelte/**/*.{html,js,svelte,ts}'
	],
	// In Tailwind v4, theme configuration is done via @theme in CSS
	// This config file is kept minimal
	plugins: []
};
