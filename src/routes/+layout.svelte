<script>
    import Shipping from 'svelte-icons/md/MdLocalShipping.svelte'
    import MoneyOff from 'svelte-icons/md/MdMoneyOff.svelte'
    import Star from 'svelte-icons/fa/FaRegStar.svelte'
    import Home from 'svelte-icons/md/MdHome.svelte'

    import AccountMenu from "$lib/componentes/AccountMenu.svelte";
	import ThemeSwitch from "$lib/componentes/ThemeSwitch.svelte";
	import '$lib/stores/CartStore';
    import "../app.css";
	import NavCart from '$lib/componentes/NavCart.svelte';

    let categories = [{
        id: 1,
        name: "Category 1"
    }, {
        id: 2,
        name: "Category 2"
    }, {
        id: 3,
        name: "Category 3"
    }, {
        id: 4,
        name: "Category 4"
    }, {
        id: 5,
        name: "Category 5"
    }, {
        id: 6,
        name: "Category 6"
    }, {
        id: 7,
        name: "Category 7"
    }, {
        id: 8,
        name: "Category 8"
    }, {
        id: 9,
        name: "Category 9"
    }, {
        id: 10,
        name: "Category 10"
    }];
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
            <ThemeSwitch/>
            <AccountMenu />
            <NavCart />
        </div>
        
    </nav>

    <div class="px-4 py-2 flex items-center justify-between space-x-4 overflow-x-auto bg-highlight">
        <a
                href="/"
                class="text-gray-700 w-6 dark:text-gray-300 font-semibold hover:text-primary dark:hover:text-yellow-500"
            >
                <Home/>
            </a>
        {#each categories as category (category.id)}
            <a
                href="#"
                class="text-gray-700 dark:text-gray-300 font-semibold hover:text-primary dark:hover:text-yellow-500"
            >
                {category.name}
            </a>
        {/each}
    </div>
    
    <div class="w-full mx-auto px-4 py-2 flex items-center justify-evenly space-x-3 bg-primary shadow-md">
        <div class="flex">
            <div class="h-6 mr-2"><MoneyOff/></div>
            <p>FREE SHIPPING ON ORDERS OVER $999</p>
        </div>
        <div class="flex">
            <div class="h-6 mr-2"><Star/></div>
            <p>MORE THAN 8 MILLION 5-STAR REVIEWS</p>
        </div>
        <div class="flex">
            <div class="h-6 mr-2"><Shipping/></div>
            <p>ORDER BEFORE 17:00 AND RECEIVE TOMORROW</p>
        </div>
    </div>
</header>
  
<slot />

<style lang="postcss">

</style>