<script lang="ts">
	import type { Content } from '@prismicio/client';

	export let slice: any;
</script>

<section class="py-16 bg-white">
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
			<!-- Sample testimonials - in a real implementation, these would come from Prismic -->
			<div class="bg-gray-50 p-6 rounded-lg shadow-sm">
				<div class="flex items-center mb-4">
					<div class="flex text-yellow-400">
						{#each Array(5) as _, i}
							<svg class="w-5 h-5 fill-current" viewBox="0 0 20 20">
								<path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z"/>
							</svg>
						{/each}
					</div>
				</div>
				<blockquote class="text-gray-700 mb-4 italic">
					"This counseling service changed my life. I finally found the tools to manage my anxiety and feel like myself again."
				</blockquote>
				<cite class="text-gray-900 font-semibold">
					— Sarah M.
				</cite>
			</div>

			<div class="bg-gray-50 p-6 rounded-lg shadow-sm">
				<div class="flex items-center mb-4">
					<div class="flex text-yellow-400">
						{#each Array(5) as _, i}
							<svg class="w-5 h-5 fill-current" viewBox="0 0 20 20">
								<path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z"/>
							</svg>
						{/each}
					</div>
				</div>
				<blockquote class="text-gray-700 mb-4 italic">
					"Couples counseling helped us rebuild our communication and strengthen our relationship."
				</blockquote>
				<cite class="text-gray-900 font-semibold">
					— Michael & Lisa R.
				</cite>
			</div>

			<div class="bg-gray-50 p-6 rounded-lg shadow-sm">
				<div class="flex items-center mb-4">
					<div class="flex text-yellow-400">
						{#each Array(5) as _, i}
							<svg class="w-5 h-5 fill-current" viewBox="0 0 20 20">
								<path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z"/>
							</svg>
						{/each}
					</div>
				</div>
				<blockquote class="text-gray-700 mb-4 italic">
					"After struggling with depression for years, I found hope here. The trauma-informed approach made all the difference."
				</blockquote>
				<cite class="text-gray-900 font-semibold">
					— David K.
				</cite>
			</div>
		</div>
	</div>
</section>
