<script lang="ts">
	const variantMap = {
		default: 'bg-transparent',
		muted: 'bg-secondary-100/70',
		brand: 'bg-primary-50',
		warm: 'bg-secondary-50'
	} as const;
	type VariantKey = keyof typeof variantMap;

	let {
		variant = 'default' as VariantKey,
		container = true,
		padded = true,
		background = '',
		class: className = '',
		children
	} = $props<{
		variant?: VariantKey;
		container?: boolean;
		padded?: boolean;
		background?: string;
		class?: string;
		children?: any;
	}>();

	const variantClass = variantMap[variant as keyof typeof variantMap];
</script>

<section class={`${background || variantClass} ${padded ? 'section-padding' : ''} ${className}`}>
	{#if container}
		<div class="section-container">
			{@render children?.()}
		</div>
	{:else}
		{@render children?.()}
	{/if}
</section>
