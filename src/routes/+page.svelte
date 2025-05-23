<script lang="ts">
	import CardView from './view/CardView.svelte';
	import { content } from '../content';
</script>

<h1 class="text-xl">Welcome to Mesut's Utils</h1>
<p>
	This is my utility hub, where i host my browser based utilities. Here's a catalog of my utilities
	so far.
	<br /><br />
    You can also visit my other utilities;
    <br>
	<a href="https://github.com/imesut" class="underline"> My Github Profile</a>
	<br />
    <a href="https://mesut.me" class="underline"> My Website</a>
</p>

<div class="flex flex-wrap gap-4">
	{#each content as c}
		{#if c.url !== '/'}
			<CardView title={c.title} description={c.description} icon={c.icon} url={c.url}></CardView>
		{/if}
	{/each}
</div>
