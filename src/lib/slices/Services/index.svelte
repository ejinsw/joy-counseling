<script lang="ts">
	import type { Content } from '@prismicio/client';
	import { Card } from 'flowbite-svelte';

	export let slice: any;
</script>

<section class="py-16 bg-gray-50">
	<div class="container mx-auto px-4">
		<div class="text-center mb-12">
			<h2 class="text-4xl font-bold text-gray-900 mb-4">
				{slice.primary.title}
			</h2>
			{#if slice.primary.subtitle}
				<p class="text-xl text-gray-600 max-w-2xl mx-auto">
					{slice.primary.subtitle}
				</p>
			{/if}
		</div>

		<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
			<!-- Sample services - in a real implementation, these would come from Prismic -->
			<Card class="text-center">
				<div class="flex items-center justify-center w-16 h-16 bg-blue-500 rounded-full mx-auto mb-4">
					<span class="text-2xl text-white">💙</span>
				</div>
				<h3 class="text-xl font-semibold text-gray-900 mb-3">
					Individual Therapy
				</h3>
				<p class="text-gray-600">
					One-on-one counseling sessions tailored to your specific needs and goals.
				</p>
			</Card>

			<Card class="text-center">
				<div class="flex items-center justify-center w-16 h-16 bg-blue-500 rounded-full mx-auto mb-4">
					<span class="text-2xl text-white">💕</span>
				</div>
				<h3 class="text-xl font-semibold text-gray-900 mb-3">
					Couples Counseling
				</h3>
				<p class="text-gray-600">
					Work together to improve communication and strengthen your relationship.
				</p>
			</Card>

			<Card class="text-center">
				<div class="flex items-center justify-center w-16 h-16 bg-blue-500 rounded-full mx-auto mb-4">
					<span class="text-2xl text-white">🏠</span>
				</div>
				<h3 class="text-xl font-semibold text-gray-900 mb-3">
					Family Therapy
				</h3>
				<p class="text-gray-600">
					Address family dynamics and create healthier relationships at home.
				</p>
			</Card>
		</div>
	</div>
</section>
