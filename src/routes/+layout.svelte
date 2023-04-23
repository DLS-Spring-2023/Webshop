<script>
    import AccountMenu from "$lib/componentes/AccountMenu.svelte";
    import "../app.css";
    
</script>

<header class="bg-primary text-white">
    <nav class="relative container mx-auto px-4 py-4 flex items-center justify-between">
        <a href="/" class="text-xl font-semibold">Webshop</a>
        
            <form action="#" method="get" class="relative">
                <input type="text" name="search" placeholder="Search" class="rounded-md w-100 pl-10 pr-4 py-2 bg-gray-200 dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-secondary">
                <button type="submit" class="absolute left-0 top-0 ml-2 mt-2">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                </button>
            </form>
        
      
        <div class="hidden md:flex space-x-4">
            <!-- <a href="/" class="text-white">Home</a>
            <a href="/" class="text-white">Products</a>
            <a href="/" class="text-white">About</a>
            <a href="/" class="text-white">Contact</a> -->
            <AccountMenu />
            <!-- <a href="/account" class="text-white w-5"><User/></a> -->
        </div>
        
    </nav>
  </header>
  
<slot />

<style lang="postcss">

</style>