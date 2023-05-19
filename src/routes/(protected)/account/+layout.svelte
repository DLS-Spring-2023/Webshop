<script lang="ts">
    import { page } from '$app/stores';
    
    enum Tab {
        Details = 'details',
        Orders = 'orders',
    }

    $: selectedTab = $page.url.pathname.endsWith('/orders') ? Tab.Orders : Tab.Details;

    $: header = document.querySelector('header');
    let margin = 0;
    const onScroll = () => {
        const scroll = window.scrollY;
        const headerHeight = header?.offsetHeight;
        
        if (scroll > (headerHeight || 200)) {
            margin = scroll - (headerHeight || 200);
        } else {
            margin = 0;
        }
        
    };
</script>

<svelte:window on:scroll={onScroll}/>

<style>
    .side-menu {
        height: calc(100vh - 12rem);
        width: 12rem;
    }
</style>

<main class=" flex p-4">
    <nav style="margin-top: {margin}px" class="side-menu col-span-1 mr-4 flex flex-col justify-between font-semibold dark:text-white bg-highlight rounded-md shadow-md p-4 space-y-4">
        <div class="flex flex-col">
            <a
                href="/account"
                class="w-full text-left py-2 px-4 rounded-md {selectedTab === Tab.Details ? 'bg-gray-200 dark:bg-slate-600' : ''}"
            >
                Details
            </a>
            <a
                href="/account/orders"
                class="w-full text-left py-2 px-4 rounded-md {selectedTab === Tab.Orders ? 'bg-gray-200 dark:bg-slate-600' : ''}"
            >
                Orders
            </a>
        </div>
        <form method="post" action="/logout">
            <button class="w-full text-center font-semibold bg-red-500 hover:bg-opacity-90 text-white focus:outline-none focus:bg-opacity-80 py-2 px-4 rounded-md">
                Logout
            </button>
        </form>
    </nav>
    
    <slot/>
</main>
