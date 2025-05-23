<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import * as Card from '$lib/components/ui/card';

	export let title;
	export let description;
	export let icon: string = '';
	export let url;
</script>

<Card.Root class="w-[250px] justify-between">
	<Card.Header>
		<span class="mb-4 text-4xl">{icon}</span>
		<Card.Title>{title}</Card.Title>
		<Card.Description>{description}</Card.Description>
	</Card.Header>
	<Card.Footer class="flex">
		<a href={url}>
			<Button>View</Button>
		</a>
	</Card.Footer>
</Card.Root>
