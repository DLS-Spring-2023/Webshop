<script lang="ts">
    import ImageCarousel from "$lib/componentes/ImageCarousel.svelte";
    import type { PageData } from "./$types";
  
    export let data: PageData;

    const { product } = data; 

    const stock = product.stock > 5 ? product.stock  + " left": product.stock > 0 ? "Less than 5 left" : "Sold out";
</script>
  
<section class="container mx-auto px-4 py-8">
    <div class="flex justify-evenly">
        <div>
            <ImageCarousel images="{product.images}" />
        </div>
        <div class="flex flex-col justify-between rounded-md p-4 bg-white dark:bg-slate-700">
            <div>
                <h1 class="text-3xl font-semibold text-gray-800 dark:text-gray-100">{product.title}</h1>
                <p class="text-xl text-primary dark:text-yellow-500 font-semibold mt-2 mb-4">${product.price}</p>
                <p class="text-gray-600 dark:text-gray-400 mb-4">{product.description}</p>
                <p class="text-gray-600 dark:text-gray-400 mb-4"><strong>Brand:</strong> {product.brand}</p>
                <p class="text-gray-600 dark:text-gray-400 mb-4"><strong>Category:</strong> {product.category}</p>
                <p class="text-gray-600 dark:text-gray-400 mb-4"><strong>Stock:</strong> {stock}</p>
            </div>
            <button class="w-fit bg-primary dark:bg-yellow-500 hover:bg-opacity-90 text-white py-2 px-4 rounded-md">
                Add to Cart
            </button>
        </div>
    </div>
</section>