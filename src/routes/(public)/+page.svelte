<script lang="ts">
	import Carousel from "$lib/componentes/Carousel.svelte";
    import type { PageData } from "./$types";

    export let data: PageData;

    const { sections } = data;
</script>

<div class="p-0 mb-20 text-white">
    {#each sections as section}
        <div class="p-2 m-4 my-4 rounded-md bg-secondary font-bold text-lg">
            {section.title}
        </div>

        <Carousel products={section.products} />
    {/each}
</div>
