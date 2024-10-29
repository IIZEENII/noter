<script>
	import FilterList from '$lib/shared/ui/filter-list.svelte';
	import Searcher from '$lib/shared/ui/searcher.svelte';
	import LinkButton from '$lib/shared/ui/button.svelte';
	let { children } = $props();
</script>

<main class="px-4 py-8 grid gap-8 max-w-screen-xl m-auto">
	<header class="flex gap-4 justify-between">
		<Searcher />
		<LinkButton />
	</header>
	{@render children()}
</main>
