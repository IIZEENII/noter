<script>
	import '../../app.css';
	import { Toaster } from '$lib/shared/ui/sonner';
	import { toast } from 'svelte-sonner';
	import Modal from '$lib/shared/ui/modal.svelte';

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
<Modal />

{@render children()}
