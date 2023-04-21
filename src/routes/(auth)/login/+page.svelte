<script lang="ts">
    import { page } from '$app/stores';
    import { superForm } from 'sveltekit-superforms/client';
    import SuperDebug from 'sveltekit-superforms/client/SuperDebug.svelte';
    import type { PageData } from './$types';

    export let data: PageData;

    let isLogin = true;

    const ref = $page.url.searchParams.get('ref');

    const { 
        form: loginForm, 
        errors: loginErrors, 
        enhance: loginEnhance,
        message: loginMessage
    } = superForm(data.loginForm);

    const { 
        form: registerForm,
        errors: registerErrors,
        enhance: registerEnhance,
        message: registerMessage
    } = superForm(data.registerForm);

    $: form = isLogin ? loginForm : registerForm;
    $: errors = isLogin ? loginErrors : registerErrors;
    $: message = isLogin ? loginMessage : registerMessage;
    $: enhance = isLogin ? loginEnhance : registerEnhance;

</script>

<SuperDebug data={form}/>

<div class="flex items-center justify-center mt-20">
    <div class="bg-white dark:bg-gray-800 p-8 rounded-md shadow-md w-full max-w-md">
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
                        type="name" id="name" name="name" 
                        class="w-full px-4 py-2 rounded-md border border-gray-300 dark:border-gray-700 dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-secondary" required
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
                    type="email" id="email" name="email" 
                    class="w-full px-4 py-2 rounded-md border border-gray-300 dark:border-gray-700 dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-secondary" required
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
                    type="password" id="password" name="password" 
                    class="w-full px-4 py-2 rounded-md border border-gray-300 dark:border-gray-700 dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-secondary" required
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
                    <input type="password" id="repassword" name="repassword" class="w-full px-4 py-2 rounded-md border border-gray-300 dark:border-gray-700 dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-secondary" required>
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
            <button type="submit" class="w-full py-2 bg-primary hover:bg-opacity-90 text-white rounded-md">
                {isLogin ? 'Login' : 'Register'}
            </button>

            <input type="hidden" name="ref" value="{ref}">
        </form>
        
        <div class="w-full flex justify-center">
            <button 
                on:click={() => isLogin = !isLogin} 
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

