<script lang="ts">
	import { page } from '$app/state';
	import { X } from '@lucide/svelte';
	import { localeFromPath, uiText } from '$lib/i18n';

	let {
		open = false,
		title = '',
		subtitle = '',
		onClose = () => {},
		children
	} = $props<{
		open?: boolean;
		title?: string | null;
		subtitle?: string | null;
		onClose?: () => void;
		children?: any;
	}>();

	const locale = $derived(localeFromPath(page.url.pathname));
	const copy = $derived(uiText[locale]);

	function handleKeydown(event: KeyboardEvent) {
		if (open && event.key === 'Escape') {
			onClose();
		}
	}

	$effect(() => {
		if (!open || typeof document === 'undefined') return;

		const previousOverflow = document.body.style.overflow;
		document.body.style.overflow = 'hidden';

		return () => {
			document.body.style.overflow = previousOverflow;
		};
	});
</script>

<svelte:window onkeydown={handleKeydown} />

{#if open}
	<div
		class="fixed inset-0 z-[100] flex items-center justify-center bg-neutral-950/55 p-4 backdrop-blur-sm"
	>
		<button
			type="button"
			class="absolute inset-0 cursor-default"
			aria-label={copy.common.close}
			onclick={onClose}
		></button>
		<div
			class="edge-surface relative flex max-h-[calc(100dvh-2rem)] w-full max-w-3xl flex-col overflow-hidden rounded-md border border-neutral-200 bg-[#fbfcf8] shadow-[0_28px_80px_rgb(18_39_32_/_0.28)]"
			role="dialog"
			aria-modal="true"
			aria-labelledby="document-modal-title"
		>
			<header class="shrink-0 border-b border-neutral-200 bg-[#fbfcf8]/95 backdrop-blur-sm">
				<div class="flex h-[64px] items-center justify-between gap-4 px-5 sm:px-6">
					<p class="truncate text-sm font-semibold text-neutral-700">{copy.common.modalBrand}</p>
					<button
						type="button"
						class="focus-ring inline-flex h-10 w-10 items-center justify-center rounded-md border border-neutral-200 bg-secondary-50 text-neutral-800 transition-colors hover:bg-secondary-100"
						aria-label={copy.common.close}
						onclick={onClose}
					>
						<X class="h-5 w-5" aria-hidden="true" />
					</button>
				</div>
			</header>

			<article class="overflow-y-auto px-5 py-8 sm:px-6 md:py-10">
				{#if title}
					<h2
						id="document-modal-title"
						class="max-w-2xl text-3xl font-semibold leading-tight md:text-4xl"
					>
						{title}
					</h2>
				{/if}

				{#if subtitle}
					<p class="mt-4 max-w-2xl text-lg leading-8 text-neutral-600">{subtitle}</p>
				{/if}

				<div class="prose mt-7 max-w-2xl text-neutral-700">
					{@render children?.()}
				</div>
			</article>
		</div>
	</div>
{/if}
