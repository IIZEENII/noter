<script lang="ts">
	import { modalStore } from './modal.store.svelte';
</script>

{#if modalStore().isOpen}
	<div class="modal">
		<svelte:component this={modalStore().component} />
	</div>
{/if}
