<script lang="ts">
    import type { PageData } from "./$types";

    export let data: PageData;
</script>
  
<div class="flex items-center justify-center py-12">
    <div class="bg-white dark:bg-gray-800 p-8 rounded-md shadow-md w-full max-w-md">
        <h2 class="text-2xl font-semibold mb-6 text-center text-primary dark:text-yellow-500">Order Confirmation</h2>
        <p>Order ID: {data.order._id}</p>
        <p>Order Date: {new Date(data.order.order_date).toLocaleString()}</p>
        <h3 class="text-lg font-semibold mb-4">Items:</h3>
        <ul>
            {#each data.order.items as item (item.name)}
                <li class="mb-2">{item.quantity}x {item.name} - ${item.price}</li>
            {/each}
        </ul>
        <p class="mt-6 font-semibold">Total Price: ${data.order.total_price}</p>
    </div>
</div>