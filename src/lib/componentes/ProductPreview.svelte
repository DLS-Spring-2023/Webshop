<script lang="ts">
    import Cart from 'svelte-icons/fa/FaShoppingCart.svelte';
    import Check from 'svelte-icons/fa/FaCheck.svelte'
	import type { Product } from "$lib/types/types";
	import { addToCart, existsInCart } from '$lib/cart/cart';
	import { browser } from '$app/environment';

    export let product: Product;
    
    const desc = product.description.length > 50 ? product.description.slice(0, 50) + '...' : product.description;
    const title = product.title.length > 30 ? product.title.slice(0, 30) + '...' : product.title;

    $: isInCart = browser && existsInCart(product.id);
    let loading = false;

    const add = () => {
        loading = true;
        addToCart(product.id);
        isInCart = true;
        setTimeout(() => {
            loading = false;
        }, 1000);
    }
</script>

<svelte:head>
    <link rel="preload" as="image" href={product.thumbnail} />
</svelte:head>

<div class="relative">
    <a href={`/products/${product.id}`}>
        <div class="w-56 h-96 bg-white dark:bg-slate-700 shadow-md rounded-md p-4 flex flex-col">
            <div>
                <img src="{product.thumbnail}" alt="{title}" class="w-full h-40 object-cover mb-4 rounded-md" />
            </div>
            <div class="flex-1">
                <h3 class="text-gray-700 dark:text-gray-300 text-base font-semibold mb-2">{title}</h3>
                <p class="text-gray-500 dark:text-gray-400 mb-4">{desc}</p>
            </div>
            <div class="flex items-center justify-between">
                <p class="text-primary dark:text-yellow-500 font-semibold text-lg">${product.price}</p>
            </div>
        </div>
    </a>
    {#if loading} 
        <div class="absolute bottom-2 right-2 rounded-lg w-10 h-10 p-2 text-green-600 bg-slate-200 dark:bg-slate-600">
            <div class="animate-spin rounded-full h-6 w-6 border-t-2 border-b-2 border-primary"></div>
        </div>
    {:else}
        {#if isInCart}
            <div class="absolute bottom-2 right-2 rounded-lg w-10 h-10 p-2 text-green-600 bg-slate-200 dark:bg-slate-600">
                <Check />
            </div>
        {:else}
            <button 
                on:click={add}
                type="button" 
                class="absolute bottom-2 right-2 rounded-lg w-10 h-10 p-2 text-primary bg-slate-200 dark:bg-slate-600 hover:bg-slate-300 hover:dark:bg-slate-500">
                <Cart />
            </button>
        {/if}
    {/if}
</div>