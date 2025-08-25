<script lang="ts">
	import type { Content } from '@prismicio/client';
	import type { SliceComponentProps } from '@prismicio/svelte';
	import Section from '$lib/components/Section.svelte';

	type Props = SliceComponentProps<Content.FieldsExampleSlice>;

	const { slice }: Props = $props();
</script>

<Section>
	<div class="prose max-w-2xl mx-auto">
		<h3 class="mb-4">Fields Example Slice</h3>
		<ul class="list-disc pl-6">
			<li>Text: {slice.primary.text_label}</li>
			<li>Number: {slice.primary.number_label}</li>
			<li>Select: {slice.primary.select_label}</li>
			<li>Boolean: {slice.primary.boolean_label ? 'Yes' : 'No'}</li>
		</ul>
	</div>
</Section>
