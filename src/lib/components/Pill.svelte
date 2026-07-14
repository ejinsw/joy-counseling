<script lang="ts">
	import { cn } from '$lib/utils/cn';

	export let className: string = '';
</script>

<div class={cn(className)}>
	<div
		class="inline-flex items-center gap-2 rounded-full border border-primary-200 bg-secondary-50 px-4 py-2 text-sm text-neutral-700"
	>
		<slot />
	</div>
</div>
