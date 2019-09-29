<script context="module">
  export async function preload(page, session) {
    const { slug } = page.params;
    return { slug };
  }
</script>

<script>
  import Cheerful from "../components/Cheerful.svelte";
  export let slug;
</script>

<svelte:head>
  <title>Cheerful dev?</title>
</svelte:head>

<Cheerful username={slug} />
