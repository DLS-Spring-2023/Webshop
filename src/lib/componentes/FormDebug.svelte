<script lang="ts">
    import { PUBLIC_MODE } from "$env/static/public";
	import SuperDebug from "sveltekit-superforms/client/SuperDebug.svelte";

    export let data: any;
</script>

{#if PUBLIC_MODE === 'development'}
    <SuperDebug data={data}/>
{/if}