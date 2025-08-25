<script lang="ts">
	import type { Content } from '@prismicio/client';

	export let slice: any;
</script>

<section class="py-16 bg-gray-50">
	<div class="container mx-auto px-4">
		<div class="max-w-4xl mx-auto">
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

			<div class="space-y-4">
				<!-- Sample FAQs - in a real implementation, these would come from Prismic -->
				<div class="bg-white rounded-lg shadow-sm border border-gray-200">
					<details class="group">
						<summary class="flex justify-between items-center p-6 cursor-pointer hover:bg-gray-50 transition-colors">
							<h3 class="text-lg font-semibold text-gray-900">
								What is counseling and how does it work?
							</h3>
							<svg class="w-5 h-5 text-gray-500 group-open:rotate-180 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
								<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/>
							</svg>
						</summary>
						<div class="px-6 pb-6">
							<div class="prose prose-gray max-w-none">
								<p>Counseling is a collaborative process between you and a trained mental health professional. Through regular sessions, you'll work together to identify challenges, develop coping strategies, and work toward your goals.</p>
							</div>
						</div>
					</details>
				</div>

				<div class="bg-white rounded-lg shadow-sm border border-gray-200">
					<details class="group">
						<summary class="flex justify-between items-center p-6 cursor-pointer hover:bg-gray-50 transition-colors">
							<h3 class="text-lg font-semibold text-gray-900">
								How long are sessions and how many will I need?
							</h3>
							<svg class="w-5 h-5 text-gray-500 group-open:rotate-180 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
								<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/>
							</svg>
						</summary>
						<div class="px-6 pb-6">
							<div class="prose prose-gray max-w-none">
								<p>Sessions typically last 50 minutes. The number of sessions varies depending on your individual needs and goals. Some people benefit from just a few sessions, while others may continue for several months or longer.</p>
							</div>
						</div>
					</details>
				</div>

				<div class="bg-white rounded-lg shadow-sm border border-gray-200">
					<details class="group">
						<summary class="flex justify-between items-center p-6 cursor-pointer hover:bg-gray-50 transition-colors">
							<h3 class="text-lg font-semibold text-gray-900">
								Do you accept insurance?
							</h3>
							<svg class="w-5 h-5 text-gray-500 group-open:rotate-180 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
								<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/>
							</svg>
						</summary>
						<div class="px-6 pb-6">
							<div class="prose prose-gray max-w-none">
								<p>We accept most major insurance plans. Please contact us to verify your specific coverage. We also offer sliding scale fees for those without insurance or with limited financial resources.</p>
							</div>
						</div>
					</details>
				</div>
			</div>
		</div>
	</div>
</section>
