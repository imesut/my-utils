<script lang="ts">
	import '../app.css';

	import type { LayoutProps } from './$types';
	import { page } from '$app/state';
	import { flattenedContentList } from '../content';

	import { Separator } from '$lib/components/ui/separator/index.js';
	import { ModeWatcher } from 'mode-watcher';
	import AppSidebar from '$lib/components/app-sidebar.svelte';
	import * as Breadcrumb from '$lib/components/ui/breadcrumb/index.js';
	import * as Sidebar from '$lib/components/ui/sidebar/index.js';

	let { children }: LayoutProps = $props();

	let currentPath = $derived(page.url.pathname);
	let currentTitle = $derived(flattenedContentList.filter((c) => c.url == currentPath)[0]?.title ?? "");
</script>

<svelte:head>
	<title>{currentTitle} ・ mesut's utils</title>
</svelte:head>

<ModeWatcher />
<Sidebar.Provider style="--sidebar-width: 19rem;">
	<AppSidebar {currentPath} />
	<Sidebar.Inset>
		<header class="flex h-16 shrink-0 items-center gap-2 px-4">
			<Sidebar.Trigger class="-ml-1" />
			<Separator orientation="vertical" class="mr-2 data-[orientation=vertical]:h-4" />
			<Breadcrumb.Root>
				<Breadcrumb.List>
					<Breadcrumb.Item>
						<Breadcrumb.Page>{currentTitle}</Breadcrumb.Page>
					</Breadcrumb.Item>
				</Breadcrumb.List>
			</Breadcrumb.Root>
		</header>
		<div class="flex flex-1 flex-col gap-4 p-4 pt-0">
			{@render children()}
		</div>
	</Sidebar.Inset>
</Sidebar.Provider>
