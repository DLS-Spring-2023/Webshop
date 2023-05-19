<script lang="ts">
    import type { PageData } from "./$types";
	import LoadingSpinner from "$lib/componentes/LoadingSpinner.svelte";
	import { onMount } from "svelte";
	import { goto } from "$app/navigation";
    import CartStore from "$lib/stores/CartStore";

    export let data: PageData;

    onMount(async () => {
        await fetch('/api/payment/?/actual', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            credentials: 'include',
            body: `data=${JSON.stringify(data.products)}`
        });
        
        CartStore.clear();
        
        await goto('/checkout/confirmation');
    });
</script>

<div class="flex justify-center mt-20">
    <LoadingSpinner size={10}/>
</div>