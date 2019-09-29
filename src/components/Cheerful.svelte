<script>
  import { onMount } from "svelte";
  import Github from "./Github.svelte";
  import Happy from "./Happy.svelte";

  export let username;

  let user = {};
  let isLoading = true;
  let error;

  onMount(async function() {
    try {
      const res = await fetch(`api/${username}.json`);
      const json = await res.json();

      user = json;
    } catch (e) {
      console.log(e);
      error = e.message;
    } finally {
      isLoading = false;
    }
  });
</script>

<style>

</style>

{#if isLoading}
  <p>Loading</p>
{:else if error}
  <p>Error: {error}</p>
{:else}
  <article>
    <Github github={user.user} />
    <Happy faces={user.faces} />
  </article>
{/if}
