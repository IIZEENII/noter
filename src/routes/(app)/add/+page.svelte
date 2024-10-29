<script lang="ts">
	import type { Note } from '$lib/notes/note';
	import Tiptap from '$lib/notes/ui/tiptap.svelte';
	let note: Note = $state({ id: Date.now().toString(), title: '', content: 'Write here' });
</script>

<Tiptap />
