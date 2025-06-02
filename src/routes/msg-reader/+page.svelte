<script lang="ts">
	import { parse } from '@molotochok/msg-viewer';
	import { Input } from '$lib/components/ui/input';
	import { Label } from '$lib/components/ui/label';
	import { Textarea } from '$lib/components/ui/textarea';
	import { ScrollArea } from '$lib/components/ui/scroll-area';
	import { content } from '../../content';

	type Message = ReturnType<typeof parse>;
	type Attachments = Message['attachments'];

	let files: FileList | undefined = $state(undefined);
	let bodyString: string = $state('');
	let subject: string = $state('');
	let sender: string = $state('');
	let toRecipients: string = $state('');
	let ccRecipients: string = $state('');
	let attachments: Attachments = $state([]);

	let message: Message | undefined = $derived.by(() => {
		if (files !== undefined && (files as FileList).length > 0) {
			let file = files[0] as File;
			file.arrayBuffer().then((buffer) => {
				let parsed = parse(new DataView(buffer));
				console.log(parsed);
				bodyString = parsed.content.body;
				subject = parsed.content.subject;
				sender = parsed.content.senderName + ' <' + parsed.content.senderEmail + '>';
				toRecipients = parsed.content.toRecipients;
				ccRecipients = parsed.content.ccRecipients;
				attachments = parsed.attachments;
				return parsed as Message;
			});
		}
		return undefined;
	});

	function formatFileSize(bytes: number, decimals = 1): string {
		if (bytes === 0) return '0 B';

		const k = 1024;
		const sizes = ['B', 'KB', 'MB', 'GB', 'TB', 'PB'];
		const i = Math.floor(Math.log(bytes) / Math.log(k));

		const value = parseFloat((bytes / Math.pow(k, i)).toFixed(decimals));
		return `${value} ${sizes[i]}`;
	}
</script>

<div class="flex h-full w-full flex-col gap-4 space-y-4">
	<div>
		<h1 class="text-2xl font-bold">.Msg Reader</h1>
		<i>
			{content.utilities.find((el) => el.url == '/msg-reader')?.description}
		</i>
	</div>

	<div class="grid w-full max-w-sm items-center gap-1.5">
		<Label for="file">Choose .msg file</Label>
		<Input id="file" type="file" bind:files />
	</div>

	<div id="mailPreview" class="h-full gap-2 rounded-md border p-4">
		{#if bodyString}
			<label for="">Attachments:</label>
			<div class="">
				<ScrollArea orientation="horizontal" class="mb-8 space-x-2 pb-4">
					<div class="flex flex-row space-x-2">
						{#each attachments as attachment}
							<a
								href={URL.createObjectURL(
									new Blob([attachment.content], { type: attachment.mimeType })
								)}
								download={attachment.displayName}
							>
								<div class="flex-col rounded-sm border p-2">
									<Label class="cursor-pointer">
										<strong>{attachment.displayName} </strong>
									</Label>
									<Label class="cursor-pointer"
										>{formatFileSize(attachment.content.byteLength)}</Label
									>
								</div>
							</a>
						{/each}
					</div>
				</ScrollArea>
			</div>

			<div class="mb-8 space-y-2">
				<Label for="subject"><strong>Subject:</strong></Label>
				<p id="subject">{subject}</p>
			</div>

			<div class="mb-8 space-y-2">
				<Label for="sender"><strong>Sender:</strong></Label>
				<p id="sender">{sender}</p>
			</div>

			<div class="mb-8 space-y-2">
				<Label for="to"><strong>To:</strong></Label>
				<p id="to">{toRecipients}</p>
			</div>

			{#if ccRecipients != ''}
				<div class="mb-8 space-y-2">
					<Label for="cc"><strong>Cc:</strong></Label>
					<p id="c">{ccRecipients}</p>
				</div>
			{/if}

			<div class="mb-8 space-y-2">
				<Label for="mailBody"><strong>Mail Body:</strong></Label>
				<Textarea value={bodyString} class="" id="mailBody" />
			</div>
		{/if}
	</div>

	<!-- Triggers message variable with binding -->
	{message}
</div>
