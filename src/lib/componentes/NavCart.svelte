<script lang="ts">
    import Cart from 'svelte-icons/fa/FaShoppingCart.svelte'
    import CartStore from '$lib/stores/CartStore'

    $: cart = CartStore.cart;
    $: total = $cart.length;
</script>

<a href="/cart" class="relative text-white w-7">
    <Cart/>
    {#if total > 0}
        <span class="absolute -top-2 -right-2 bg-green-600 text-xs rounded-full w-4 h-4 flex items-center justify-center">
            {total}
        </span>
    {/if}

</a>




