<script>
	import FilterList from '$lib/shared/ui/filter-list.svelte';
	import Searcher from '$lib/shared/ui/searcher.svelte';
	import LinkButton from '$lib/shared/ui/button.svelte';
	import Logo from '$lib/shared/logo.svelte';
	let { children } = $props();
</script>

<header class="flex gap-4 items-center justify-between sticky w-full bg-white px-4 h-14">
	<Logo />
	<Searcher />
	<LinkButton />
</header>

<main class="px-4 py-6 grid gap-2 max-w-screen-xl m-auto">
	{@render children()}
</main>
