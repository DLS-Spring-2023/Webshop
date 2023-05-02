<script lang="ts">
    import ArrowLeft from 'svelte-icons/fa/FaArrowAltCircleLeft.svelte';
    import ArrowRight from 'svelte-icons/fa/FaArrowAltCircleRight.svelte';

    export let images: string[] = [];
    
    $: selectedIndex = images ? 0 : 0;
    let thumbnailContainer: HTMLDivElement;
    let largeImageContainer: HTMLDivElement;
  
    const selectImage = (index: number) => {
        selectedIndex = index;
        largeImageContainer.scrollTo({
            left: index-2,
            behavior: 'smooth',
        });
    };
  
    const scrollThumbnails = (direction: number) => {
        thumbnailContainer.scrollBy({
            left: direction * 150,
            behavior: 'smooth',
        });
    };
</script>

<svelte:head>
    {#each images as image}
        <link rel="preload" as="image" href={image} />
    {/each}
</svelte:head>
  
<div class="p-4 rounded-md bg-white dark:bg-slate-700">
    <div class="flex flex-col w-80">
        <div
            class="relative overflow-x-hidden w-80 h-80 rounded-md"
            bind:this={largeImageContainer}
        >
            <div
                class="absolute top-0 left-0 w-80 h-80 flex"
                style="transform: translateX(-{selectedIndex * 100}%); transition: transform 0.3s"
            >
                {#each images as image (image)}
                    <img
                        src="{image}"
                        alt="Large preview"
                        class="w-80 h-80 object-cover"
                    />
                {/each}
            </div>
        </div>
        <div class="relative mt-4">
            <button
                class="absolute -left-2 top-1/2 w-8 transform -translate-y-1/2 bg-white dark:bg-gray-800 p-0 rounded-full shadow-md text-primary dark:text-yellow-500 z-10"
                on:click={() => scrollThumbnails(-1)}
            >
                <ArrowLeft />
            </button>
            <div
                class="overflow-x-hidden"
                bind:this={thumbnailContainer}
            >
                <div class="flex space-x-2 p-2 opacity-50">
                    {#each images as image, index (image)}
                        <div>
                            <button
                            class="w-20 h-20 border-2 border-transparent focus:border-rose-400 rounded-lg dark:focus:border-yellow-500 focus:outline-none"
                            on:click={() => selectImage(index)}
                            >
                            <img
                                src="{image}"
                                alt={`Thumbnail ${index + 1}`}
                                class="w-full h-full object-cover rounded-md"
                            />
                            </button>
                        </div>
                    {/each}
                </div>
            </div>
            <button
                class="absolute -right-2 top-1/2 w-8 transform -translate-y-1/2 bg-white dark:bg-gray-800 p-0 rounded-full shadow-md text-primary dark:text-yellow-500 z-10"
                on:click={() => scrollThumbnails(1)}
            >
                <ArrowRight />
            </button>
        </div>
    </div>
</div>