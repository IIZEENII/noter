<script lang="ts">
	import { onMount } from 'svelte';

	let content: string = $state('<p>Escribe aquí...</p>');
	let history: string[] = $state([]);
	let redoStack: string[] = $state([]);
	let editor: HTMLElement;

	function saveHistory() {
		history.push(content);
		redoStack = [];
	}

	function undo() {
		if (history.length > 0) {
			redoStack.push(content);
			content = history.pop()!;
			updateEditor();
		}
	}

	function redo() {
		if (redoStack.length > 0) {
			history.push(content);
			content = redoStack.pop()!;
			updateEditor();
		}
	}

	function toggleBold() {
		const selection = window.getSelection();
		if (selection!.rangeCount > 0) {
			const span = document.createElement('strong');
			const range = selection!.getRangeAt(0);
			range.surroundContents(span);
			saveHistory();
		}
	}

	function setFontSize(size: number) {
		const selection = window.getSelection();
		if (selection!.rangeCount > 0) {
			const span = document.createElement('span');
			span.style.fontSize = `${size}px`;
			const range = selection!.getRangeAt(0);
			range.surroundContents(span);
			saveHistory();
		}
	}

	function updateEditor() {
		content = editor.innerHTML;
	}

	onMount(() => {
		editor.innerHTML = content;
	});
</script>

{#snippet toolbar()}
	<div class="flex justify-between w-full border-b-[1px] border-gray h-14">
		<input
			class="text-xl px-4 outline-none text-ellipsis min-w-40 w-full bg-transparent"
			type="text"
			placeholder="Title"
		/>
		<div class="flex">
			<button aria-label="undo" onclick={undo} class="bg-gray-200 p-2">
				<span>
					<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
						><path
							fill="currentColor"
							d="M7 19v-2h7.1q1.575 0 2.738-1T18 13.5T16.838 11T14.1 10H7.8l2.6 2.6L9 14L4 9l5-5l1.4 1.4L7.8 8h6.3q2.425 0 4.163 1.575T20 13.5t-1.737 3.925T14.1 19z"
						/>
					</svg>
				</span>
			</button>
			<button aria-label="redo" onclick={redo} class="bg-gray-200 p-2">
				<span>
					<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
						<path
							fill="currentColor"
							d="M9.9 19q-2.425 0-4.163-1.575T4 13.5t1.738-3.925T9.9 8h6.3l-2.6-2.6L15 4l5 5l-5 5l-1.4-1.4l2.6-2.6H9.9q-1.575 0-2.738 1T6 13.5T7.163 16T9.9 17H17v2z"
						/>
					</svg>
				</span>
			</button>
			<button aria-label="bold" onclick={toggleBold} class="bg-gray-200 p-2">
				<span>
					<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24">
						<g fill="none">
							<path
								d="m12.593 23.258l-.011.002l-.071.035l-.02.004l-.014-.004l-.071-.035q-.016-.005-.024.005l-.004.01l-.017.428l.005.02l.01.013l.104.074l.015.004l.012-.004l.104-.074l.012-.016l.004-.017l-.017-.427q-.004-.016-.017-.018m.265-.113l-.013.002l-.185.093l-.01.01l-.003.011l.018.43l.005.012l.008.007l.201.093q.019.005.029-.008l.004-.014l-.034-.614q-.005-.018-.02-.022m-.715.002a.02.02 0 0 0-.027.006l-.006.014l-.034.614q.001.018.017.024l.015-.002l.201-.093l.01-.008l.004-.011l.017-.43l-.003-.012l-.01-.01z"
							/>
							<path
								fill="currentColor"
								d="M13 2.5a5.5 5.5 0 0 1 4.213 9.036a5.5 5.5 0 0 1-2.992 9.96L14 21.5H6.1a1.6 1.6 0 0 1-1.593-1.454L4.5 19.9V4.1a1.6 1.6 0 0 1 1.454-1.593L6.1 2.5zm1 11H7.5v5H14a2.5 2.5 0 0 0 0-5m-1-8H7.5v5H13a2.5 2.5 0 0 0 0-5"
							/>
						</g>
					</svg>
				</span>
			</button>
			<button aria-label="h1" onclick={() => setFontSize(24)} class="bg-gray-200 p-2">
				<span>
					<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24">
						<path
							fill="none"
							stroke="currentColor"
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="3"
							d="M2.243 4.493v7.5m0 0v7.502m0-7.501h10.5m0-7.5v7.5m0 0v7.501m4.501-8.627l2.25-1.5v10.126m0 0h-2.25m2.25 0h2.25"
						/>
					</svg>
				</span>
			</button>
			<button aria-label="save" onclick={redo} class="bg-gray-200 p-2">
				<span>
					<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
						<path
							fill="currentColor"
							d="M3 5a2 2 0 0 1 2-2h11.586A2 2 0 0 1 18 3.586l2.707 2.707A1 1 0 0 1 21 7v12a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2zm6 14h6v-6H9zm8 0h2V7.414l-2-2V7a2 2 0 0 1-2 2H9a2 2 0 0 1-2-2V5H5v14h2v-6a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2zM9 5v2h6V5z"
						/>
					</svg>
				</span>
			</button>
		</div>
	</div>
{/snippet}

<div class="flex flex-col gap-2 items-center h-svh">
	{@render toolbar()}
	<div
		bind:this={editor}
		oninput={updateEditor}
		contenteditable="true"
		class="outline-none w-full h-full overflow-y-auto px-4 text-lg"
	></div>
</div>
