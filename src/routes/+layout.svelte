<script>
	import '../app.css';
	import { Toaster } from '$lib/shared/ui/sonner';
	import { toast } from 'svelte-sonner';
	import FilterList from '$lib/shared/ui/filter-list.svelte';
	import Searcher from '$lib/shared/ui/searcher.svelte';
	import LinkButton from '$lib/shared/ui/button.svelte';

	let { children } = $props();

	$effect(() => {
		window.addEventListener('offline', () => {
			toast.error('connection lost');
		});

		window.addEventListener('online', () => {
			toast.success('connection back');
		});
	});
</script>

<Toaster visibleToasts={1} position="bottom-center" />

<main class="px-4 py-5 grid gap-8 max-w-screen-xl m-auto">
	<div class="grid gap-5">
		<header class="flex gap-4 justify-between">
			<Searcher />
			<LinkButton />
		</header>
		<FilterList />
	</div>
	{@render children()}
</main>
