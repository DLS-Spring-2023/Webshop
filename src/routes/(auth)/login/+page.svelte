<script lang="ts">
    import { page } from '$app/stores';
    import { fly } from 'svelte/transition';
    import { superForm } from 'sveltekit-superforms/client';
    import type { PageData } from './$types';
	import FormDebug from '$lib/componentes/FormDebug.svelte';
	import { onMount } from 'svelte';
	import LoadingSpinner from '$lib/componentes/LoadingSpinner.svelte';

    export let data: PageData;

    let isLogin = true;
    let loading = false;
    let showMsg = false;

    const ref = $page.url.searchParams.get('ref');
    let msg = '';
    
    onMount(() => {
        msg = atob($page.url.searchParams.get('msg') || '');
        if (msg) {
            showMsg = true;
        }
    })

    const formOptions = {
        onSubmit: () => loading = true,
        onResult: () => loading = false,
    }

    const { 
        form: loginForm, 
        errors: loginErrors, 
        enhance: loginEnhance,
        message: loginMessage
    } = superForm(data.loginForm, formOptions);

    const { 
        form: registerForm,
        errors: registerErrors,
        enhance: registerEnhance,
        message: registerMessage
    } = superForm(data.registerForm, formOptions);

    $: form = isLogin ? loginForm : registerForm;
    $: errors = isLogin ? loginErrors : registerErrors;
    $: message = isLogin ? loginMessage : registerMessage;
    $: enhance = isLogin ? loginEnhance : registerEnhance;

</script>

<style lang="postcss">
    input {
        @apply block w-full px-4 py-2 rounded-md border border-gray-300 dark:border-gray-700 dark:bg-gray-600 dark:text-white focus:outline-none focus:ring-2;
    }
</style>

<!-- <FormDebug data={$form}/> -->

<div class="relative flex items-center justify-center mt-20">
    {#if showMsg} 
        <div 
            class="absolute top-0 right-0 mb-4 mr-4 bg-green-500 text-white px-4 py-2 rounded-md shadow-md"
            transition:fly|local={{ y: 50, delay: 300, duration: 500 }}    
            
        >
            {msg}
        </div>
    {/if}

    <div class="bg-highlight p-8 rounded-md shadow-md w-full max-w-md">
        <h2 class="text-2xl font-semibold mb-6 text-center text-primary dark:text-yellow-500">{isLogin ? 'Login' : 'Register'}</h2>
        {#if $message}
            <div class="text-red-500 text-sm mb-4">
                {$message}
            </div>
        {/if}
        <form action="?/{isLogin ? 'login' : 'register'}" method="post" use:enhance>
            {#if !isLogin}
                <div class="mb-4">
                    <label for="name" class="block text-gray-700 dark:text-gray-300 mb-2">Name</label>
                    <input 
                        bind:value={$registerForm.name}
                        disabled={loading}
                        type="name" id="name" name="name" 
                        required
                    >
                </div>
                {#if $registerErrors.name}
                    <div class="text-red-500 text-sm mb-4">
                        {$registerErrors.name}
                    </div>
                {/if}
            {/if}
            <div class="mb-4">
                <label for="email" class="block text-gray-700 dark:text-gray-300 mb-2">Email Address</label>
                <input 
                    bind:value={$form.email}
                    disabled={loading}
                    type="email" id="email" name="email" 
                    required
                >
            </div>
            {#if $errors.email}
                <small class="text-red-500 text-sm mb-4">
                    {$errors.email}
                </small>
            {/if}
            <div class="mb-4">
                <label for="password" class="block text-gray-700 dark:text-gray-300 mb-2">Password</label>
                <input 
                    bind:value={$form.password}
                    disabled={loading}
                    type="password" id="password" name="password" 
                    required
                >
                {#if $errors.password}
                    <div class="text-red-500 text-sm mb-4">
                        {$errors.password}
                    </div>
                {/if}
            </div>
            {#if !isLogin}
                <div>
                    <label for="repassword" class="block text-gray-700 dark:text-gray-300 mb-2">Repeat Password</label>
                    <input 
                        disabled={loading}
                        type="password" 
                        id="repassword" 
                        name="repassword" 
                        required
                    >
                </div>
                {#if $registerErrors.repassword}
                    <div class="text-red-500 text-sm mb-4">
                        {$registerErrors.repassword}
                    </div>
                {/if}
            {/if}
            <div class="my-4 flex items-center justify-between">
                {#if isLogin}
                    <a href="/resetpassword" class="text-sm text-primary dark:text-yellow-500 hover:underline">Forgot Password?</a>
                {/if}
            </div>
            <button 
                type="submit" 
                disabled={loading}
                class="w-full py-2 bg-primary hover:bg-opacity-90 text-white rounded-md"
            >
                {#if loading}
                    <div class="w-full flex justify-center">
                        <div class="animate-spin rounded-full h-6 w-6 border-t-2 border-b-2 border-white"></div>
                        <!-- <LoadingSpinner size={1.5} color={'white'}/> -->
                    </div>
                {:else}
                    {isLogin ? 'Login' : 'Register'}
                {/if}
            </button>

            <input type="hidden" name="ref" value="{ref}">
        </form>
        
        <div class="w-full flex justify-center">
            <button 
                on:click={() => isLogin = !isLogin} 
                disabled={loading}
                class="block text-center text-sm text-gray-700 dark:text-gray-300 mt-4 hover:underline"
            >
                {#if isLogin }
                    Don't have an account? Register
                {:else}
                    Already have an account? Login
                {/if}
            </button>
        </div>
    </div>
</div>

