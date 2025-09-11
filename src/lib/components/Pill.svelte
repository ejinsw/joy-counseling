<script lang="ts">
	import { cn } from "$lib/utils/cn";

    export let className: string = '';
</script>

<div class={cn(className)}>
    <div class="inline-flex items-center gap-2 px-4 py-2 bg-white/80 backdrop-blur-sm rounded-full border border-primary-200 shadow-sm">
        <slot />
    </div>
</div>