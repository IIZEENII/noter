<script>
	import { createNote } from '$lib/notes/usecases/create-note';
</script>

<button
	onclick={() => createNote({ title: 'Title', category: 'category', content: 'content' })}
	aria-label="add note"
	class="grid items-center bg-primary text-base px-3 rounded-xl"
>
	<span>
		<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
			<path d="M12 5V19" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" />
			<path d="M5 12H19" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" />
		</svg>
	</span>
</button>
