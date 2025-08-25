<script lang="ts">
	import type { Content } from '@prismicio/client';
	import { PrismicRichText } from '@prismicio/svelte';
	import { Card, Button, Input, Textarea } from 'flowbite-svelte';

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

			<div class="grid grid-cols-1 lg:grid-cols-2 gap-12">
				<div>
					<Card>
						<h3 class="text-2xl font-semibold text-gray-900 mb-4">Contact Information</h3>
						<div class="prose prose-lg text-gray-600">
							<PrismicRichText field={slice.primary.contact_info} />
						</div>
					</Card>
				</div>

				<div>
					<Card>
						<h3 class="text-2xl font-semibold text-gray-900 mb-4">Send us a Message</h3>
						<form class="space-y-6">
							<div>
								<label for="name" class="block text-sm font-medium text-gray-700 mb-2">Name</label>
								<Input id="name" name="name" type="text" required />
							</div>
							<div>
								<label for="email" class="block text-sm font-medium text-gray-700 mb-2">Email</label>
								<Input id="email" name="email" type="email" required />
							</div>
							<div>
								<label for="phone" class="block text-sm font-medium text-gray-700 mb-2">Phone</label>
								<Input id="phone" name="phone" type="tel" />
							</div>
							<div>
								<label for="message" class="block text-sm font-medium text-gray-700 mb-2">Message</label>
								<Textarea id="message" name="message" rows={4} required />
							</div>
							<Button type="submit" class="w-full">
								Send Message
							</Button>
						</form>
					</Card>
				</div>
			</div>
		</div>
	</div>
</section>
