<script lang="ts">
    import { slide } from 'svelte/transition'
    import Remove from 'svelte-icons/md/MdRemoveCircle.svelte';
    import Add from 'svelte-icons/md/MdAddCircle.svelte';
    import Close from 'svelte-icons/md/MdClose.svelte'
    import CartStore from '$lib/stores/CartStore';

    let cart = CartStore.cart;
  
    $: itemTotal = $cart.reduce((total, item) => total + item.price * item.quantity, 0);
    $: shipping = itemTotal > 999 ? 0 : 13.99;
    $: total = itemTotal + shipping;

    const checkout = () => {
      // Implement the checkout logic here
      console.log("Proceeding to checkout");
    };
</script>
  
<section class="px-4 py-8 m-8 rounded-lg bg-highlight">
    {#if $cart.length === 0}
        <p class="text-gray-600 dark:text-gray-400">Your cart is empty.</p>
    {:else}
        <div class="grid grid-cols-1">
            <div class="flex justify-between text-lg font-bold dark:text-white">
                <h2>Products</h2>
                <h2>Total</h2>
            </div>

            {#each $cart as item (item.id)}
                <div out:slide|local={{duration: 200}}>
                    <hr class="bg-gray-600 my-4"/>
                    <div class="flex items-center justify-between">
                        <div class="flex items-center space-x-4">
                            <img src="{item.thumbnail}" alt="{item.title}" class="w-14 h-14 object-cover rounded-md" />
                            <div>
                                <a href={`/products/${item.id}`} class="text-xl font-semibold text-gray-800 dark:text-gray-100">{item.title}</a>
                                <div class="flex items-center">
                                    <p class="text-gray-600 dark:text-gray-400">Quantity: {item.quantity}</p>
                                    <!-- increase and decrease buttons -->
                                    <button
                                        class="text-primary hover:bg-opacity-90 w-6 rounded-md ml-4"
                                        on:click={() => CartStore.increaseQuantity(item.id)}
                                    >
                                        <Add/>
                                    </button>
                                    <button
                                        class="text-primary w-6 rounded-md ml-4"
                                        on:click={() => CartStore.decreaseQuantity(item.id)}
                                    >
                                        <Remove/>
                                    </button>
                                    <button
                                        class="text-red-500 w-7 rounded-md ml-4"
                                        on:click={() => CartStore.removeFromCart(item.id)}
                                    >
                                        <Close/>
                                    </button>
                                    
                                </div>
                            </div>
                        </div>
                        <div class="text-xl font-semibold text-gray-800 dark:text-gray-100">
                            ${(item.price * item.quantity).toFixed(2)}
                        </div>
                    </div>
                </div>
            {/each}

            
        </div>
    {/if}
</section>
  
<section class="px-4 py-8 m-8 rounded-lg bg-highlight">
    
    <div class="flex justify-end items-center">
        <div class="text-md text-gray-800 dark:text-gray-100 mr-4 flex flex-col items-end">
            <p class="w-fit">Items total</p>
            <p class="w-fit">Shipping cost</p>
            <p class="w-fit font-bold">Total</p>
        </div>
        <div class="text-md text-gray-800 dark:text-gray-100">
            <p>${itemTotal.toFixed(2)}</p>
            <p>${shipping.toFixed(2)}</p>
            <p class="font-bold">${total.toFixed(2)}</p>
        </div>
    </div>
    <div class="flex justify-end">
        <button
            class="bg-primary dark:bg-yellow-500 hover:bg-opacity-90 text-white py-2 px-4 rounded-md mt-4"
            on:click={checkout}
        >
            Checkout
        </button>
    </div>

</section>