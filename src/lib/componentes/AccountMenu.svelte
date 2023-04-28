<!-- src/AccountMenu.svelte -->
<script lang="ts">
    import { page } from '$app/stores';
    import { onMount } from 'svelte';
    import User from 'svelte-icons/fa/FaUser.svelte';
  
    let menuOpen = false;
  
    onMount(() => {
        const handleClickOutside = (e: any) => {
            if (e.target?.closest('.account-menu')) return;
            menuOpen = false;
        };
    
        document.addEventListener('click', handleClickOutside);
        return () => {
            document.removeEventListener('click', handleClickOutside);
        };
    });
</script>
  
    <div class="relative account-menu">
        <button
            class="text-white flex items-center space-x-1 w-5"
            on:click={() => (menuOpen = !menuOpen)}
        >
            <User />
        </button>
    {#if menuOpen}
        <div
            class="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-md shadow-md z-10"
        >
            {#if $page.data?.authenticated}
                <a
                    href="/account"
                    on:click={() => (menuOpen = false)}
                    class="block px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-primary dark:hover:bg-yellow-500 hover:text-white"
                >
                    Profile
                </a>
                <a
                    href="/account/orders"
                    on:click={() => (menuOpen = false)}
                    class="block px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-primary dark:hover:bg-yellow-500 hover:text-white"
                >
                    Orders
                </a>
                <!-- <a
                    href="/account/settings"
                    class="block px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-primary dark:hover:bg-yellow-500 hover:text-white"
                >
                    Settings
                </a> -->
                <hr class="border-gray-200 dark:border-gray-700 my-1">
                <form method="post" action="/logout">
                    <button
                        class="w-full text-left px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-primary dark:hover:bg-yellow-500 hover:text-white"
                    >
                        Logout
                </button>
                </form>
            {:else}
                <a
                    href="/login"
                    class="block px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-primary dark:hover:bg-yellow-500 hover:text-white"
                >
                    Login
            </a>
            {/if}
        </div>
    {/if}
</div>
  