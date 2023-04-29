<script lang="ts">
    import { page } from "$app/stores";
    import type { PageData } from "./$types";
    import FormDebug from "$lib/componentes/FormDebug.svelte";
	import { superForm } from "sveltekit-superforms/client";

    export let data: PageData;

    let edit = false;
    let loading = false;
    
    const { form, errors, enhance, message, constraints, reset } = superForm(data.form, {
        invalidateAll: true,
        clearOnSubmit: 'none',
        onSubmit: () => loading = true,
        onResult: ({result}) => {
            loading = false;
            if (result.status === 200) {
                edit = false;
            }
        },
    });

    const cancel = () => {
        edit = false;
        reset({ keepMessage: false });
    }
</script>


<section class="w-full">
    <div class="mx-auto px-4">
        <h1 class="text-3xl font-semibold mb-8 text-primary bg-highlight p-3 rounded-md shadow-md">Account Details</h1>
        <!-- <FormDebug data={[$form, $errors]}/> -->
        <form method="post" action="?/edit" class="bg-highlight p-8 rounded-md shadow-md" use:enhance>
            <div class="mb-6">
                <h2 class="text-xl font-semibold mb-4 text-primary">Personal Information</h2>
                <div class="grid grid-cols-2 gap-4 text-primary">
                    <div>
                        <label for="name" class="block font-bold mb-1">Name</label>
                        {#if edit}
                            <input 
                                name="name" 
                                id="name" 
                                type="text" 
                                disabled={loading}
                                class="text-gray-500 {loading ? 'dark:text-gray-100' : ''} border border-gray-300 dark:border-gray-700 px-3 py-2 rounded-md w-full" 
                                {...$constraints.name}
                                bind:value={$form.name} 
                            />
                            {#if $errors.name}
                                <p class="text-red-500 text-sm mt-1">{$errors.name}</p>
                            {/if}
                        {:else}
                            <p class="text-gray-900 dark:text-gray-100">{$form.name}</p>
                        {/if}
                    </div>
                    <div>
                        <label for="email" class="block font-bold mb-1">Email</label>
                        {#if edit}
                            <input 
                                name="email" 
                                id="email" 
                                type="text" 
                                disabled={loading}
                                class="text-gray-500 {loading ? 'dark:text-gray-100' : ''} border border-gray-300 dark:border-gray-700 px-3 py-2 rounded-md w-full" 
                                {...$constraints.email}
                                bind:value={$form.email} 
                            />
                            {#if $errors.email}
                                <p class="text-red-500 text-sm mt-1">{$errors.email}</p>
                            {/if}
                        {:else}
                            <p class="text-gray-900 dark:text-gray-100">{$form.email}</p>
                        {/if}
                    </div>
                    <div>
                        <label for="address" class="block font-bold mb-1">Address</label>
                        {#if edit}
                            <input 
                                name="address" 
                                id="address" 
                                type="text" 
                                disabled={loading}
                                class="text-gray-500 {loading ? 'dark:text-gray-100' : ''} border border-gray-300 dark:border-gray-700 px-3 py-2 rounded-md w-full" 
                                {...$constraints.address}
                                bind:value={$form.address} 
                            />
                            {#if $errors.address}
                                <p class="text-red-500 text-sm mt-1">{$errors.address}</p>
                            {/if}
                        {:else}
                            <p class="text-gray-900 dark:text-gray-100">{$form.address}</p>
                        {/if}
                    </div>
                    <div>
                        <label for="phone" class="block font-bold mb-1">Phone</label>
                        {#if edit}
                            <input 
                                name="phone" 
                                id="phone" 
                                type="text" 
                                disabled={loading}
                                class="text-gray-500 {loading ? 'dark:text-gray-100' : ''} border border-gray-300 dark:border-gray-700 px-3 py-2 rounded-md w-full" 
                                {...$constraints.phone}
                                bind:value={$form.phone} 
                            />
                            {#if $errors.phone}
                                <p class="text-red-500 text-sm mt-1">{$errors.phone}</p>
                            {/if}
                        {:else}
                            <p class="text-gray-900 dark:text-gray-100">{$form.phone}</p>
                        {/if}
                    </div>
                </div>
            </div>
            <div>
                {#if loading}
                    <div class="animate-spin rounded-full h-7 w-7 border-t-2 border-b-2 border-primary"></div>
                    
                {:else if edit}
                    <div class="flex justify-between items-center">
                        <button
                            type="submit"
                            disabled={loading}
                            class="bg-primary font-semibold hover:bg-opacity-90 text-white px-4 py-2 rounded-md"
                        >
                            Save
                        </button>
                        <button
                            type="button"
                            on:click={cancel}
                            disabled={loading}
                            class="bg-secondary font-semibold hover:bg-opacity-90 text-white px-4 py-2 rounded-md"
                        >
                            Cancel
                        </button>
                    </div>
                {:else}
                    <button
                        type="button"
                        on:click={() => edit = !edit} 
                        class="bg-primary font-semibold hover:bg-opacity-90 text-white px-4 py-2 rounded-md"
                    >
                        Edit Account Details
                    </button>
                {/if}
            </div>
        </form>
    </div>
  </section>