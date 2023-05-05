<script lang="ts">

    export let size = 10;
</script>

<div class="flex items-center justify-center">
    <div style="width: {size}rem">
        <svg class="w-200 h-200" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
            <circle cx="40" cy="40" r="15" fill="none" stroke="currentColor" stroke-width="5" class="text-green-500 stroke-current spin-1" />
            <circle cx="40" cy="40" r="30" fill="none" stroke="currentColor" stroke-width="5" class="text-blue-500 stroke-current spin-2" />
            <circle cx="40" cy="40" r="25" fill="none" stroke="currentColor" stroke-width="5" class="text-yellow-500 stroke-current spin-3" />
            <circle cx="40" cy="40" r="10" fill="none" stroke="currentColor" stroke-width="5" class="text-red-500 stroke-current spin-4" />
            <circle cx="100" cy="100" r="5" fill="currentColor" class="text-yellow-500 fill-current" />
        </svg>
    </div>
</div>

<style>
    .spin-1 { animation: spin-1 1s linear infinite; }
    .spin-2 { animation: spin-2 1.5s linear infinite; }
    .spin-3 { animation: spin-1 2s linear infinite; }
    .spin-4 { animation: spin-2 2.5s linear infinite; }

    @keyframes spin-1 {
        0% { transform: translate(50%, 50%) rotate(0deg); }
        100% { transform: translate(50%, 50%) rotate(360deg); }
    }

    @keyframes spin-2 {
        0% { transform: translate(50%, 50%) rotate(0deg); }
        100% { transform: translate(50%, 50%) rotate(-360deg); }
    }
</style>