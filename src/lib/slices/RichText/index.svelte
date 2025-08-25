<script lang="ts">
	import type { Content } from '@prismicio/client';
	import { PrismicRichText, type SliceComponentProps } from '@prismicio/svelte';
	import Label from './Label.svelte';
	import Section from '$lib/components/Section.svelte';

	type Props = SliceComponentProps<Content.RichTextSlice>;

	const { slice }: Props = $props();
</script>

<Section>
	<div class="max-w-3xl mx-auto prose prose-lg text-surface-700-300-token">
		<PrismicRichText
			field={slice.primary.content}
			components={{
				label: Label
			}}
		/>
	</div>
</Section>
