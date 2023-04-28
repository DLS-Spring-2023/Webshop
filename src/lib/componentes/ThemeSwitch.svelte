<script lang="ts">
	import { onMount } from "svelte";
    import Sun from 'svelte-icons/fa/FaSun.svelte'
    import Moon from 'svelte-icons/fa/FaMoon.svelte'

    let theme = 'light';

    onMount(() => {
        if (!('theme' in localStorage) ) {
            localStorage.theme = window.matchMedia('(prefers-color-scheme: dark)').matches 
                ? 'dark' 
                : 'light';
        }

        // On page load or when changing themes, best to add inline in `head` to avoid FOUC
        if (localStorage.theme === 'dark') {
            document.documentElement.classList.add('dark')
            theme = 'dark';
        } else {
            document.documentElement.classList.remove('dark')
            theme = 'light';
        } 
    });

    const toggleTheme = () => {
        if (theme === 'light') {
            document.documentElement.classList.add('dark')
            theme = 'dark';
            localStorage.theme = 'dark'
        } else {
            document.documentElement.classList.remove('dark')
            theme = 'light';
            localStorage.theme = 'light'
        }
    }
</script>

<button type="button" class="w-6" on:click={toggleTheme}>
    {#if theme === 'dark'}
        <Sun/>
    {:else}
        <Moon/>
    {/if}
</button>