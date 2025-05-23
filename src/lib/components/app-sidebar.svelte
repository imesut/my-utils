<script lang="ts">
	import type { ComponentProps } from 'svelte';

	type AppSideBarProps = {
		currentPath: string;
	} & ComponentProps<typeof Sidebar.Root>;

	let { ref = $bindable(null), ...restProps }: AppSideBarProps = $props();

	import { resetMode, setMode } from 'mode-watcher';
	import { buttonVariants } from '$lib/components/ui/button/index.js';

	import * as Sidebar from '$lib/components/ui/sidebar/index.js';
	import * as DropdownMenu from '$lib/components/ui/dropdown-menu/index.js';

	import SunIcon from '@lucide/svelte/icons/sun';
	import MoonIcon from '@lucide/svelte/icons/moon';
	import GalleryVerticalEndIcon from '@lucide/svelte/icons/gallery-vertical-end';

	import { content } from '../../content';
</script>

<Sidebar.Root variant="floating" {...restProps}>
	<Sidebar.Header>
		<Sidebar.Menu>
			<Sidebar.MenuItem>
				<Sidebar.MenuButton size="lg">
					{#snippet child({ props })}
						<div class="flex w-full flex-row">
							<a href="/" {...props}>
								<div
									class="bg-sidebar-primary text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg"
								>
									<GalleryVerticalEndIcon class="size-4" />
								</div>
								<div class="flex flex-col gap-0.5 leading-none">
									<span class="font-medium">Mesut's Utils</span>
								</div>
							</a>

							<div>
								<DropdownMenu.Root>
									<DropdownMenu.Trigger
										class={buttonVariants({ variant: 'outline', size: 'icon' })}
									>
										<SunIcon
											class="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0"
										/>
										<MoonIcon
											class="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100"
										/>
										<span class="sr-only">Toggle theme</span>
									</DropdownMenu.Trigger>
									<DropdownMenu.Content align="end">
										<DropdownMenu.Item onclick={() => setMode('light')}>Light</DropdownMenu.Item>
										<DropdownMenu.Item onclick={() => setMode('dark')}>Dark</DropdownMenu.Item>
										<DropdownMenu.Item onclick={() => resetMode()}>System</DropdownMenu.Item>
									</DropdownMenu.Content>
								</DropdownMenu.Root>
							</div>
						</div>
					{/snippet}
				</Sidebar.MenuButton>
			</Sidebar.MenuItem>
		</Sidebar.Menu>
	</Sidebar.Header>
	<Sidebar.Content>
		<Sidebar.Group>
			<Sidebar.Menu class="gap-2">
				{#each content as item (item.title)}
					<Sidebar.MenuItem>
						<Sidebar.MenuButton isActive={restProps.currentPath == item.url}>
							{#snippet child({ props })}
								<a href={item.url} class="font-medium" {...props}>
									{item.title}
								</a>
							{/snippet}
						</Sidebar.MenuButton>
					</Sidebar.MenuItem>
				{/each}
			</Sidebar.Menu>
		</Sidebar.Group>
	</Sidebar.Content>
</Sidebar.Root>
