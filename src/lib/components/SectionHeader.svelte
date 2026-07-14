<script lang="ts">
	let {
		title = '',
		subtitle = '',
		align = 'left' as 'left' | 'center',
		eyebrow = ''
	} = $props<{
		title?: string | null;
		subtitle?: string | null;
		align?: 'left' | 'center';
		eyebrow?: string;
	}>();
</script>

<div class={`mb-10 ${align === 'center' ? 'text-center' : ''}`}>
	{#if eyebrow}
		<p class="mb-3 text-sm font-semibold text-primary-800">{eyebrow}</p>
	{/if}
	{#if title}
		<h2 class="text-display-lg max-w-4xl">{title}</h2>
	{/if}
	{#if subtitle}
		<p
			class={`mt-4 max-w-3xl text-lg leading-8 text-neutral-600 ${align === 'center' ? 'mx-auto' : ''}`}
		>
			{subtitle}
		</p>
	{/if}
</div>
