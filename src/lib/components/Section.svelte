<script lang="ts">
  const variantMap = {
    default: 'bg-surface-0-900-token',
    muted: 'bg-surface-50-900-token',
    brand: 'joy-gradient',
    warm: 'warm-gradient'
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

<section class={`${background || variantClass} ${padded ? 'py-16 md:py-20' : ''} ${className}`}>
  {#if container}
    <div class="container mx-auto px-6">
      {@render children?.()}
    </div>
  {:else}
    {@render children?.()}
  {/if}
</section>


