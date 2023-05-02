<script lang="ts">
    import { enhance, type SubmitFunction } from '$app/forms';
	import type { Product } from '$lib/types/types';
	import { onMount } from 'svelte';

    let form: HTMLFormElement;
    let input: HTMLInputElement;
    let query = '';
    let queryTitle = '';
    let open = false;
    let loading = false;
    let results: Product[] = [];

    onMount(() => {
        const handleClickOutside = (e: any) => {
            if (e.target?.closest('.q-input')) return;
            open = false;
        };
    
        document.addEventListener('click', handleClickOutside);
        return () => {
            document.removeEventListener('click', handleClickOutside);
        };
    })

    const submitSearch: SubmitFunction = ({cancel}) => {
        if (query.length === 0) {
            open = false;
            cancel();
            return;
        }

        open = true;
        loading = true;
        queryTitle = query;

        return ({result}) => {
            if (result.type === 'success') {
                setTimeout(() => {
                    results = result.data as Product[];
                    loading = false;
                }, 500);
            }

        }
    }

    const onFocus = (e: HTMLInputElement) => {
        e.addEventListener('focus', () => {
            if (input.value.length > 0) {
                open = true;
            }
        });

        e.addEventListener('keydown', (e: KeyboardEvent) => {
            if (e.key === 'Escape') {
                open = false;
            }
        });
    }
</script>


<div class="relative flex flex-col items-center">
    <form 
        method="post" 
        action="/?/search" 
        class="relative" 
        bind:this={form}
        use:enhance={submitSearch}
    >
        <input 
            bind:value={query} 
            bind:this={input}
            use:onFocus
            type="text" 
            name="q" 
            placeholder="Search" 
            class="q-input rounded-md w-100 pl-10 pr-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-500 dark:text-white focus:outline-none focus:ring-2 focus:ring-secondary"
        >
        <button type="submit" class="absolute left-0 top-0 ml-2 mt-2 text-gray-500 dark:text-white">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
        </button>
    </form>

    {#if open}
        <div class="popout bg-highlight border-secondary">
            {#if loading}
                <div class="flex justify-center items-center h-full">
                    <div class="animate-spin rounded-full h-6 w-6 border-b-2 border-secondary"></div>
                </div>
            {:else}
                {#if results.length === 0}
                    <div class="flex justify-center items-center h-full">
                        <p class="text-gray-500">No results found</p>
                    </div>
                {:else}
                    <div class="flex justify-between items-center p-2">
                        <p class="text-gray-500">Results for "{queryTitle}"</p>
                        
                    </div>
                    <ul class="divide-y divide-gray-200">
                        {#each results as result}
                            <li>
                                <a href={`/products/${result.eid}`} class="p-2 flex items-center">
                                    <img src={result.thumbnail} alt={result.title} class="h-14 w-14 rounded-lg">
                                    <div class="ml-3 w-full">
                                        <div class="flex justify-between items-center">
                                            <div>
                                                <p class="text-sm font-semibold text-gray-900 dark:text-white">{result.title}</p>
                                                <p class="text-sm text-gray-500">
                                                    {result.description.length > 90 ? result.description.slice(0, 90) + '...' : result.description}
                                                </p>
                                            </div>
                                            <p class="ml-1 text-lg font-semibold text-gray-900 dark:text-white">${result.price}</p>
                                        </div>
                                    </div>
                                </a>
                            </li>
                        {/each}
                    </ul>
                {/if}
            {/if}
        </div>
    {/if}
</div>

<style land="postcss">
    .popout {
        @apply absolute h-72 mt-12 rounded-lg border-2 z-50 shadow-md overflow-y-auto;
        width: 48rem;
    }

</style>