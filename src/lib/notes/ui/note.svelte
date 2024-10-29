<script lang="ts">
	import type { Note } from '../note';
	let note: Partial<Note> = $props();
</script>

<article class="bg-white py-6 px-4 rounded-lg grid gap-2 break-inside">
	<h4 class="text-xl font-semibold">
		{note.title}
	</h4>
	<p>
		{note.content}
	</p>
</article>
