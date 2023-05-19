<script lang="ts">
    import { page } from '$app/stores';
    import CartStore from '$lib/stores/CartStore';
	import { onMount } from 'svelte';

    const cart = CartStore.cart;

    let cartItems = '';
    let paymentSrc = '';

    onMount(() => {
        cartItems = $cart.map(item => item.eid + ':' + item.quantity).join(',');
        paymentSrc = `https://paymentiframe.com/tag.cgi?u=${$page.url.origin}/api/payment/?/initial&k=pk_0664cKxtpzh9waTUen65TTQtCUgp0&n0=cart&v0=${cartItems}&n1=user_id&v1=${$page.data.user_id}`;
        console.log(paymentSrc);
    });
    
</script>


  
<div class="flex items-center justify-center py-12">
    <div class="flex flex-col items-center bg-white dark:bg-gray-600 p-8 rounded-md shadow-md w-full max-w-md">
        <h2 class="text-2xl font-semibold mb-6 text-center text-primary dark:text-yellow-500">Payment Information</h2>
        <p class="text-gray-600 dark:text-gray-400 text-center mb-4">This is a demo. Please do not type in real credit card information</p>
        <iframe 
            title="Payment Form" 
            src="{paymentSrc}"
            frameBorder=0 
            height=250px 
            width=350px
        ></iframe>
    </div>
</div>