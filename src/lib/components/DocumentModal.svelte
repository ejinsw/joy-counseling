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
		class="fixed inset-0 z-50 overflow-y-auto bg-neutral-950/35"
		role="dialog"
		aria-modal="true"
		aria-labelledby="document-modal-title"
	>
		<div class="min-h-dvh bg-[#fbfcf8]">
			<header
				class="sticky top-0 z-10 border-b border-neutral-200 bg-[#fbfcf8]/95 backdrop-blur-sm"
			>
				<div
					class="mx-auto flex h-[72px] max-w-4xl items-center justify-between gap-4 px-5 sm:px-8"
				>
					<p class="truncate text-sm font-semibold text-neutral-700">{copy.common.modalBrand}</p>
					<button
						type="button"
						class="focus-ring inline-flex h-11 w-11 items-center justify-center rounded-full border border-neutral-200 bg-secondary-50 text-neutral-800 transition-colors hover:bg-secondary-100"
						aria-label={copy.common.close}
						onclick={onClose}
					>
						<X class="h-5 w-5" aria-hidden="true" />
					</button>
				</div>
			</header>

			<article class="mx-auto max-w-4xl px-5 py-10 sm:px-8 md:py-14">
				{#if title}
					<h2 id="document-modal-title" class="max-w-3xl text-display-lg">{title}</h2>
				{/if}

				{#if subtitle}
					<p class="mt-4 max-w-3xl text-lg leading-8 text-neutral-600">{subtitle}</p>
				{/if}

				<div class="prose mt-8 max-w-3xl text-neutral-700">
					{@render children?.()}
				</div>
			</article>
		</div>
	</div>
{/if}
