<script lang="ts">
    import type { PageData } from "./$types";
    import ImageCarousel from "$lib/componentes/ImageCarousel.svelte";
    import Check from 'svelte-icons/fa/FaCheck.svelte'
    import CartStore from "$lib/stores/CartStore";

    $: cart = CartStore.cart;
  
    export let data: PageData;

    $: stock = data.product.stock > 5 ? data.product.stock  + " left": data.product.stock > 0 ? "Less than 5 left" : "Sold out";

    let loading = false;
    const add = () => {
        loading = true;
        setTimeout(() => {
            CartStore.addToCart(data.product);
            loading = false;
        }, 700);
    }
</script>
  
<section class="container mx-auto px-4 py-8">
    <div class="flex justify-evenly">
        <div>
            <ImageCarousel images="{data.product.images}" />
        </div>
        <div class="flex flex-col justify-between rounded-md p-4 bg-white dark:bg-slate-700">
            <div>
                <h1 class="text-3xl font-semibold text-gray-800 dark:text-gray-100">{data.product.title}</h1>
                <p class="text-xl text-primary dark:text-yellow-500 font-semibold mt-2 mb-4">${data.product.price}</p>
                <p class="text-gray-600 dark:text-gray-400 mb-4">{data.product.description}</p>
                <p class="text-gray-600 dark:text-gray-400 mb-4"><strong>Brand:</strong> {data.product.brand}</p>
                <p class="text-gray-600 dark:text-gray-400 mb-4"><strong>Category:</strong> {data.product.category}</p>
                <p class="text-gray-600 dark:text-gray-400 mb-4"><strong>Stock:</strong> {stock}</p>
            </div>

            {#if loading}
                <div class="animate-spin rounded-full ml-6 mb-1 h-8 w-8 border-t-2 border-b-2 border-primary dark:border-yellow-500"></div>
                
            {:else if data.product.stock === 0}
                <div class="w-fit bg-gray-400 dark:bg-gray-500 text-white py-2 px-4 rounded-md cursor-not-allowed">
                    Sold out
                </div>
            {:else if $cart.find(item => item.id === data.product.id)}
                <div class="flex justify-between">
                    <div class="flex w-fit h-10 bg-gray-400 dark:bg-gray-500 text-white font-semibold py-2 px-4 rounded-md">
                        <p>In Cart</p>
                        <div class="w-6 ml-4 text-green-400"><Check/></div>
                    </div>
                    <a href="/checkout" class="w-fit bg-primary dark:bg-yellow-500 hover:bg-opacity-90 text-white font-semibold py-2 px-4 rounded-md">
                        Checkout
                    </a>
                </div>
            {:else}
                <button 
                    on:click={add}
                    class="w-fit bg-primary dark:bg-yellow-500 hover:bg-opacity-90 text-white font-semibold py-2 px-4 rounded-md"
                >
                    Add to Cart
                </button>
            {/if}
        </div>
    </div>
</section>