<script lang="ts">
	import { goto } from '$app/navigation';
	import type { ShippingAddress } from '$lib/types/types';
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

    onMount(() => {
        try {
            shippingAddress = JSON.parse(localStorage.getItem('shippingAddress') || '{}');
        } catch (_) {}
    });
  
    const saveAddress = () => {
        localStorage.setItem('shippingAddress', JSON.stringify(shippingAddress));
        goto('/checkout/shipping/delivery');
    };
</script>
  
<div class="flex items-center justify-center">
    <div class="bg-white dark:bg-gray-600 p-8 rounded-md shadow-md mt-4">
        <h2 class="text-2xl font-semibold mb-6 text-center text-primary dark:text-yellow-500">Shipping Address</h2>
        <form on:submit|preventDefault={saveAddress}>
            <div class="flex justify-center">
                <div class="mr-10">
                    <div class="mb-4">
                        <label for="firstName" class="block text-gray-700 dark:text-gray-300 mb-2">First Name</label>
                        <input bind:value={shippingAddress.firstName} type="text" id="firstName" name="firstName" required
                        class="w-full px-4 py-2 rounded-md border border-gray-300 dark:border-gray-700 dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-secondary" />
                    </div>
                    <div class="mb-4">
                        <label for="address1" class="block text-gray-700 dark:text-gray-300 mb-2">Address 1</label>
                        <input bind:value={shippingAddress.address1} type="text" id="address1" name="address1" required
                        class="w-full px-4 py-2 rounded-md border border-gray-300 dark:border-gray-700 dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-secondary" />
                    </div>
                    <div class="mb-4">
                        <label for="city" class="block text-gray-700 dark:text-gray-300 mb-2">City</label>
                        <input bind:value={shippingAddress.city} type="text" id="city" name="city" required
                        class="w-full px-4 py-2 rounded-md border border-gray-300 dark:border-gray-700 dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-secondary" />
                    </div>
                    <div class="mb-4">
                        <label for="zip" class="block text-gray-700 dark:text-gray-300 mb-2">Zip</label>
                        <input bind:value={shippingAddress.zip} type="text" id="zip" name="zip" required
                        class="w-full px-4 py-2 rounded-md border border-gray-300 dark:border-gray-700 dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-secondary" />
                    </div>

                    <button type="reset" class="w-72 py-2 mt-4 bg-slate-500 hover:bg-opacity-90 text-white rounded-md">Reset</button>
                </div>
                <div class="ml-10">
                    <div class="mb-4">
                        <label for="lastName" class="block text-gray-700 dark:text-gray-300 mb-2">Last Name</label>
                        <input bind:value={shippingAddress.lastName} type="text" id="lastName" name="lastName" required
                        class="w-full px-4 py-2 rounded-md border border-gray-300 dark:border-gray-700 dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-secondary" />
                    </div>
                    <div class="mb-4">
                        <label for="address2" class="block text-gray-700 dark:text-gray-300 mb-2">Address 2 (optional)</label>
                        <input bind:value={shippingAddress.address2} type="text" id="address2" name="address2"
                        class="w-full px-4 py-2 rounded-md border border-gray-300 dark:border-gray-700 dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-secondary" />
                    </div>
                    <div class="mb-4">
                        <label for="state" class="block text-gray-700 dark:text-gray-300 mb-2">State</label>
                        <input bind:value={shippingAddress.state} type="text" id="state" name="state"
                        class="w-full px-4 py-2 rounded-md border border-gray-300 dark:border-gray-700 dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-secondary" />
                    </div>
                    <div class="mb-4">
                        <label for="country" class="block text-gray-700 dark:text-gray-300 mb-2">Country</label>
                        <input bind:value={shippingAddress.country} type="text" id="country" name="country" required
                        class="w-full px-4 py-2 rounded-md border border-gray-300 dark:border-gray-700 dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-secondary" />
                    </div>

                    <button type="submit" class="w-72 py-2 mt-4 bg-primary hover:bg-opacity-90 text-white rounded-md">Save Address and Continue</button>
                </div>
            </div>
        </form>
    </div>
</div>