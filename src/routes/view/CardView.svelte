<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import * as Card from '$lib/components/ui/card';

	export let title;
	export let description;
	export let icon: string = '';
	export let iconType: string = 'emoji';
	export let url;
</script>

<a href={url} class="flex justify-between">
	<Card.Root class="w-[250px] justify-between">
		<Card.Header>
			{#if iconType === 'emoji'}
				<span class="mb-4 text-6xl">{icon}</span>
			{:else}
				<img src={icon} alt="" width="70" class="rounded-lg mb-4" />
			{/if}
			<Card.Title>{title}</Card.Title>
			<Card.Description>{description}</Card.Description>
		</Card.Header>
		<Card.Footer class="flex">
			<!-- <a href={url}> -->
			<Button>View</Button>
			<!-- </a> -->
		</Card.Footer>
	</Card.Root>
</a>
