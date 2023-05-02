<script lang="ts">
    import { page } from '$app/stores';
    import { enhance, type SubmitFunction } from '$app/forms';
	import { onMount } from "svelte";
    import Sun from 'svelte-icons/fa/FaSun.svelte'
    import Moon from 'svelte-icons/fa/FaMoon.svelte'

    let theme: string = $page.data.theme;

    onMount(() => {
        theme = document.documentElement.classList.contains('dark')
            ? 'dark'
            : 'light';
    });

    const submitTheme: SubmitFunction = ({action}) => {
        const newTheme = action.searchParams.get('theme');

        if (newTheme === 'dark') {
            document.documentElement.classList.add('dark');
        } else if (newTheme === 'light') {
            document.documentElement.classList.remove('dark');
        }

        if (newTheme) theme = newTheme;
    }
</script>

<form method="post" use:enhance={submitTheme}>
    <button 
        type="submit" 
        formaction={`/?/setTheme&theme=${theme === 'dark' ? 'light' : 'dark'}`}
        class="w-6" 
    >
        {#if theme === 'dark'}
            <Sun/>
        {:else}
            <Moon/>
        {/if}
    </button>
</form>