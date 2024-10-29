<script lang="ts">
	interface Props {
		regex: RegExp;
		textHelper: string;
		placeholder: string;
		name: string;
		type?: 'email' | 'password' | 'text';
	}

	let { regex, type = 'text', ...props }: Props = $props();
	let isFocused = $state(false);
	let value = $state('');

	function setAsFocused() {
		isFocused = true;
	}
</script>

<label class="flex flex-col h-16 justify-end gap-1">
	<span class="text-danger text-xs">
		{#if isFocused && !regex.test(value)}
			{props.textHelper}
		{/if}
	</span>
	<input
		class="outline-none bg-gray h-11 rounded-md px-4"
		onfocus={setAsFocused}
		{type}
		{...props}
		bind:value
	/>
</label>
