<script lang="ts">
    import { addToCart, removeFromCart, decreaseQuantity, getCart, type CartItem } from '$lib/cart/cart';
	import { onMount } from 'svelte';
    
    let cart: CartItem[];
  
    const updateCart = () => {
      cart = getCart();
    };
  
    const checkout = () => {
      // Implement the checkout logic here
      console.log("Proceeding to checkout");
    };

    onMount(() => {
        updateCart();
    });
</script>
  
  <main class="container mx-auto px-4 py-8">
    <h1 class="text-3xl font-semibold text-gray-800 dark:text-gray-100 mb-4">Shopping Cart</h1>
    {#if !cart || cart.length === 0}
      <p class="text-gray-600 dark:text-gray-400">Your cart is empty.</p>
    {:else}
      <div class="grid grid-cols-1 gap-8">
        {#each cart as item (item.id)}
          <div class="flex items-center justify-between">
            <div>
              <h2 class="text-xl font-semibold text-gray-800 dark:text-gray-100">{'item.title'}</h2>
              <p class="text-gray-600 dark:text-gray-400">Quantity: {item.quantity}</p>
            </div>
            <div class="flex items-center space-x-2">
              <button
                class="bg-primary dark:bg-yellow-500 hover:bg-opacity-90 text-white px-2 py-1 rounded-md"
                on:click={() => { addToCart(item.id); updateCart(); }}
              >
                +
              </button>
              <button
                class="bg-primary dark:bg-yellow-500 hover:bg-opacity-90 text-white px-2 py-1 rounded-md"
                on:click={() => { decreaseQuantity(item.id); updateCart(); }}
              >
                -
              </button>
              <button
                class="bg-red-500 hover:bg-opacity-90 text-white px-2 py-1 rounded-md"
                on:click={() => { removeFromCart(item.id); updateCart(); }}
              >
                Remove
              </button>
            </div>
          </div>
        {/each}
        <button
          class="bg-primary dark:bg-yellow-500 hover:bg-opacity-90 text-white py-2 px-4 rounded-md"
          on:click={checkout}
        >
          Checkout
        </button>
      </div>
    {/if}
  </main>
  