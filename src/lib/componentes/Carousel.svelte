<script lang="ts">
	import type { Product } from "$lib/types/types";
	import ProductPreview from "./ProductPreview.svelte";
    import ArrowLeft from 'svelte-icons/fa/FaArrowAltCircleLeft.svelte';
    import ArrowRight from 'svelte-icons/fa/FaArrowAltCircleRight.svelte';

    export let products: Product[];
  
    let carousel: HTMLDivElement;
  
    const scroll = (direction: number) => {
        carousel.scrollBy({
            left: direction * carousel.clientWidth,
            behavior: 'smooth',
        });
    };
</script>
  
<div class="relative">
    <button
        class="absolute left-0 top-1/2 w-8 transform -translate-y-1/2 bg-white dark:bg-gray-800 p-0 rounded-full shadow-md text-primary dark:text-yellow-500 z-10"
        on:click={() => scroll(-1)}
    >
        <ArrowLeft />
    </button>

    <div
        class="overflow-x-hidden"
        bind:this={carousel}
    >
        <div class="flex space-x-4 px-4">
            {#each products as product (product.id)}
                <ProductPreview product={product} />
                {/each}
                <div class="w-4 text-transparent">.</div>
        </div>
    </div>

    <button
        class="absolute right-0 top-1/2 w-8 transform -translate-y-1/2 bg-white dark:bg-gray-800 p-0 rounded-full shadow-md text-primary dark:text-yellow-500 z-10"
        on:click={() => scroll(1)}
    >
        <ArrowRight />
    </button>
</div>