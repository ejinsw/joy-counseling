<script lang="ts">
  let {
    title = '',
    subtitle = '',
    align = 'center' as 'left' | 'center',
    eyebrow = ''
  } = $props<{ title?: string | null; subtitle?: string | null; align?: 'left' | 'center'; eyebrow?: string }>();
</script>

<div class={`mb-12 ${align === 'center' ? 'text-center' : ''}`}>
  {#if eyebrow}
    <div class="text-sm tracking-wide uppercase text-primary-600 font-semibold mb-2">{eyebrow}</div>
  {/if}
  {#if title}
    <h2 class="text-4xl md:text-5xl font-bold text-surface-900-50-token">{title}</h2>
  {/if}
  {#if subtitle}
    <p class="text-xl text-surface-600-400-token max-w-3xl ${align === 'center' ? 'mx-auto' : ''} mt-3">{subtitle}</p>
  {/if}
</div>


