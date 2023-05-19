<script lang="ts">
    import type { PageData } from './$types';
    
    export let data: PageData;
  
    type Item = { name: string; quantity: number; price: number; };
    type Order = { _id: string; customer_id: string; customer_email: string; order_date: string; items: Item[]; total_price: number; };
    
    let orders: Order[] = data.orders;
</script>

  
<div class="flex items-center justify-center w-full">
    <div class="bg-white dark:bg-slate-700 p-8 rounded-md shadow-md w-full">
        <h2 class="text-2xl font-semibold mb-6 text-center text-primary dark:text-yellow-500">Your Orders</h2>
        {#each orders as order (order._id)}
            <div class="border p-4 rounded-md mb-6 dark:text-white">
                <h3 class="text-lg font-semibold mb-2">Order ID: {order._id}</h3>
                <p>Order Date: {new Date(order.order_date).toLocaleString()}</p>
                <p>Total Price: ${order.total_price}</p>
                <h4 class="text-md font-semibold mt-4 mb-2">Items:</h4>
                <ul>
                {#each order.items as item (item.name)}
                    <li class="mb-2">{item.name} x {item.quantity} - ${item.price}</li>
                {/each}
                </ul>
            </div>
        {/each}
    </div>
</div>
  