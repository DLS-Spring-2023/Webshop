<script lang="ts">
	import LoadingSpinner from '$lib/componentes/LoadingSpinnerSpecial.svelte';
import type { PageData } from './$types';
    
    export let data: PageData;
</script>

<div class="text-center mt-20">
    
    <LoadingSpinner/>
    
    <div class="bg-primary text-white px-3 py-1 mt-4 rounded-full inline-block animate-pulse">
        <span class="font-semibold">Under Construction</span>
    </div>
</div>