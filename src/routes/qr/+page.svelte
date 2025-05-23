<script lang="ts">
	import { Input } from '$lib/components/ui/input';
	import { Button, buttonVariants } from '$lib/components/ui/button';
	import { Label } from '$lib/components/ui/label';
	import { Slider } from '$lib/components/ui/slider';
	import * as Select from '$lib/components/ui/select';
	import * as Drawer from '$lib/components/ui/drawer';
	import DownloadIcon from '@lucide/svelte/icons/download';

	import Qrview from './qrview.svelte';

	let errorCorrectionLevels = [
		{
			value: 'L',
			label: 'Low'
		},
		{
			value: 'M',
			label: 'Medium'
		},
		{
			value: 'Q',
			label: 'Quartile'
		},
		{
			value: 'H',
			label: 'High'
		}
	];
	let selectedCorrectionLevel = $state('L');
	let padding = $state(0);
	const width = 300;

	let imageFormats = ['png', 'jpeg'];
	let selectedImageFormat = $state('png');

	let textToQR = $state('https://utils.mesut.me');
	let downloadableLink = $state('');
</script>

<div class="m-auto flex-col gap-4 space-y-8">
	<h1 class="text-2xl font-bold">QR Code Generator</h1>
	<form class="flex w-full items-end space-x-2">
		<div class="flex w-full flex-col gap-1.5">
			<Label for="input">Text to QR</Label>
			<Input type="text" placeholder={textToQR} bind:value={textToQR} id="input" />
		</div>
	</form>

	<div class="qr-container">
		<Qrview
			value={textToQR}
			size={`${width}`}
			errorCorrection={selectedCorrectionLevel}
			background="#fff"
			color="#000"
			{padding}
			format={selectedImageFormat}
		/>
	</div>

	<Drawer.Root>
		<Drawer.Trigger class={buttonVariants({ variant: 'outline' }) + ' ' + 'w-full'}>
			Settings
		</Drawer.Trigger>
		<Drawer.Content>
			<Drawer.Header>
				<Drawer.Title>Settings</Drawer.Title>
			</Drawer.Header>

			<div class="m-4 flex flex-col items-center space-y-4">
				<Label>Correction Level</Label>

				<Select.Root
					type="single"
					onValueChange={(v) =>
						(selectedCorrectionLevel =
							errorCorrectionLevels.find((l) => l.value === v)?.value ?? 'L')}
				>
					<Select.Trigger>
						{selectedCorrectionLevel}
					</Select.Trigger>
					<Select.Content>
						{#each errorCorrectionLevels as level}
							<Select.Item value={level.value}>{level.label}</Select.Item>
						{/each}
					</Select.Content>
				</Select.Root>

				<Label class="mt-4">Padding : {padding}</Label>
				<Slider
					type="single"
					bind:value={padding}
					max={Math.round(width / 8)}
					step={1}
					class="m-auto w-1/2"
				/>

				<Label class="mt-4">Image Format</Label>

				<Select.Root type="single" bind:value={selectedImageFormat}>
					<Select.Trigger>
						{selectedImageFormat}
					</Select.Trigger>
					<Select.Content>
						{#each imageFormats as format}
							<Select.Item value={format}>{format}</Select.Item>
						{/each}
					</Select.Content>
				</Select.Root>
			</div>

			<Drawer.Footer>
				<Drawer.Close class={buttonVariants({ variant: 'default' }) + ' m-auto w-1/2'}>
					Close
				</Drawer.Close>
			</Drawer.Footer>
		</Drawer.Content>
	</Drawer.Root>

	<a
		onclick={() => {
			downloadableLink = document.getElementsByTagName('img')[0].src;
		}}
		href={downloadableLink}
		download={'qr' + '-' + textToQR.replace(/[^a-zA-Z0-9 ]/g, '') + '.' + selectedImageFormat}
	>
		<Button class="w-full">
			<DownloadIcon></DownloadIcon>
			Download
		</Button>
	</a>
</div>
