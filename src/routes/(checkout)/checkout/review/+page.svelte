<!-- src/routes/review-order.svelte -->
<script lang="ts">
	import { goto } from '$app/navigation';
    import { onMount } from 'svelte';
    import CartStore from '$lib/stores/CartStore';

    const cart = CartStore.cart;
    
    let totalPrice: number;
    
    let shippingInfo: { name: string; address: string; city: string; country: string; postalCode: string; } = {
      name: 'John Doe',
      address: '123 Main St',
      city: 'Anytown',
      country: 'USA',
      postalCode: '12345',
    };

    let deliveryInfo: any = {}
  
    onMount(async () => {
        let shippingAddress = localStorage.getItem('shippingAddress');
        if (!shippingAddress) {
            return await goto('/checkout/shipping');
        }

        let deliveryMethod = localStorage.getItem('deliveryMethod');
        if (!deliveryMethod) {
            return await goto('/checkout/shipping/delivery');
        }

        let shipping = JSON.parse(shippingAddress);
        let delivery = JSON.parse(deliveryMethod);

        shippingInfo = {
            name: `${shipping.firstName} ${shipping.lastName}`,
            address: `${shipping.address1} ${shipping.address2}`,
            city: shipping.city,
            country: shipping.country,
            postalCode: shipping.zip,
        };

        totalPrice = $cart.reduce((acc, item) => acc + item.price * item.quantity, 0) + delivery.cost;

        deliveryInfo = delivery;
        
    });
  
    const goToPayment = () => {
        goto('/checkout/payment');
    };
</script>
  
<div class="flex items-center justify-center py-12">
    <div class="bg-white dark:bg-gray-800 p-8 rounded-md shadow-md w-full max-w-md">
        <h2 class="text-2xl font-semibold mb-2 text-center text-primary dark:text-yellow-500">Review Your Order</h2>
        <p class="text-center mb-6">{new Date().toLocaleDateString() }</p>
        
        <h3 class="text-lg font-semibold mb-4">Shipping Information:</h3>
        <p>{shippingInfo.name}</p>
        <p>{shippingInfo.address}</p>
        <p>{shippingInfo.postalCode} {shippingInfo.city}</p>
        <p>{shippingInfo.country}</p>
        
        <h3 class="text-lg font-semibold mt-4 mb-4">Delivery Method:</h3>
        <p>{deliveryInfo?.name} - ${deliveryInfo?.cost}</p>

        <h3 class="text-lg font-semibold mt-4 mb-4">Items:</h3>
        <ul>
            {#each $cart as item (item.id)}
            <li class="mb-2">{item.quantity}x {item.title} - ${item.price * item.quantity}</li>
            {/each}
        </ul>
        <p class="mt-6 font-semibold">Total Price: ${totalPrice}</p>
        <button class="w-full mt-6 py-2 bg-primary hover:bg-opacity-90 text-white rounded-md" on:click={goToPayment}>Proceed to Payment</button>
    </div>
</div>