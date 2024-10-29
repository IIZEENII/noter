<script lang="ts">
	import Note from '$lib/notes/ui/note.svelte';
	import { getAllNotes } from '$lib/notes/usecases/get-all-notes';
	let notesPromise = $state.raw(getAllNotes());
</script>

<h1 class="text-xl font-medium">MY NOTES</h1>

<div class="grid grid-cols-4 small:grid-cols-1 desktop:grid-cols-4 gap-2 tablet:grid-cols-3 phone:grid-cols-2">
	{#await notesPromise}
		loading notes ...
	{:then notes}
		{#each notes as note}
			<Note {...note} />
		{/each}
	{/await}
</div>