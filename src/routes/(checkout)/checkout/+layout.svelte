<!-- CheckoutSteps.svelte -->
<script lang="ts">
    import { page } from '$app/stores';
    
    $: currentStep = $page.url.pathname.split('?')[0];
    $: currentIndex = steps.findIndex(step => step.path === currentStep);
    
    let steps = [
        { title: 'Shipping Addres', path: '/checkout/shipping' }, 
        { title: 'Delivery Method', path: '/checkout/shipping/delivery' }, 
        { title: 'Review', path: '/checkout/review' }, 
        { title: 'Payment', path: '/checkout/payment' }, 
        { title: 'Confirmation', path: '/checkout/confirmation' }
    ];
  </script>
  
<div class="flex justify-center mt-2">
    <div class="bg-white dark:bg-gray-600 p-2 rounded-full shadow-md w-fit">
        <ul class="flex justify-center">
            {#each steps as step, index (step)}
            <li>
                {#if currentIndex > index}
                    <a href="{step.path}" class="text-sm font-medium px-2 py-1 rounded-full {currentStep === step.path? 'bg-primary text-white' : 'text-gray-500 dark:text-gray-400'}">
                        {step.title}
                    </a>

                {:else}
                    <span class="text-sm font-medium px-2 py-1 rounded-full {currentStep === step.path? 'bg-primary text-white' : 'text-gray-500 dark:text-gray-400'}">
                        {step.title}
                    </span>
                {/if}
            </li>
            {/each}
        </ul>
    </div>
</div>
<slot/>