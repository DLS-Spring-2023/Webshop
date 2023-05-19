<script lang="ts">
	import { goto } from '$app/navigation';
	import type { DeliveryMethod, ShippingAddress } from '$lib/types/types';
    import { onMount } from 'svelte';

    let shippingAddress: ShippingAddress = {
        firstName: '',
        lastName: '',
        address1: '',
        address2: '',
        city: '',
        state: '',
        zip: '',
        country: '',
    };

    let selectedDeliveryMethod: string = '';
    let deliveryMethods: DeliveryMethod[] = [
        { id: '1', name: 'Standard Delivery', description: '2-5 business days', cost: 0 },
        { id: '2', name: 'Express Delivery', description: 'Next day delivery', cost: 5 },
    ];

    onMount(() => {
        try {
            shippingAddress = JSON.parse(localStorage.getItem('shippingAddress') || '{}');
        } catch (e) {
            goto('/checkout/shipping');
        }
    });

    const selectDeliveryMethod = (methodId: string) => {
        selectedDeliveryMethod = methodId;
    };

    const continueToPayment = () => {
        if (!selectedDeliveryMethod) return;
        localStorage.setItem('deliveryMethod', JSON.stringify(deliveryMethods.find(method => method.id === selectedDeliveryMethod)));
        goto('/checkout/review');
    };
</script>
  
<div class="flex items-center justify-center py-12">
    <div class="bg-white dark:bg-gray-600 p-8 rounded-md shadow-md w-full max-w-md">
        <h2 class="text-2xl font-semibold mb-6 text-center text-primary dark:text-yellow-500">Select Delivery Method</h2>
        <div>
            {#each deliveryMethods as method (method.id)}
                <div class="flex items-center justify-between py-3 border-b border-gray-200 last:border-b-0">
                <div>
                    <h3 class="text-lg font-medium text-gray-900 dark:text-white">{method.name}</h3>
                    <p class="text-sm text-gray-600 dark:text-gray-400">{method.description}</p>
                </div>
                <div class="flex items-center">
                    <p class="text-lg font-medium text-gray-900 dark:text-white">${method.cost.toFixed(2)}</p>
                    <input on:change={() => selectDeliveryMethod(method.id)} type="radio" id="delivery-{method.id}" name="deliveryMethod" class="ml-6" value="{method.id}" bind:group={selectedDeliveryMethod} />
                </div>
                </div>
            {/each}

            <button disabled={!selectedDeliveryMethod} on:click={continueToPayment} class="w-full mt-6 py-2 {selectedDeliveryMethod ? 'bg-primary hover:bg-opacity-90' : 'bg-gray-400'} text-white rounded-md">Continue to Payment</button>
        </div>
    </div>
</div>