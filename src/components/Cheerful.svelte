<script>
  import { onMount } from "svelte";
  import Happy from "./Happy.svelte";
  import { isOneFaceHappy } from "./_utils";

  export let username;

  let data = {};
  let isLoading = true;
  let error;

  onMount(async function() {
    try {
      const res = await fetch(`api/${username}.json`);
      const json = await res.json();

      data = json;
      console.log(data);
      if (isOneFaceHappy(data.faces)) {
        document.title = data.user.name + " looks cheerful";
      }
    } catch (e) {
      console.error("Error: ", e);
      error = e.message;
    } finally {
      isLoading = false;
    }
  });
</script>

<style>
  .github {
    margin: auto;
    width: var(--size__width);
    max-width: var(--size__maxWidth);
  }

  .githubContent {
    display: flex;
  }
  .githubContent__metadata {
    flex: 1;

    padding: 2rem;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }
  .githubContent__avatar img {
    display: block;
  }

  .githubContent__metadata h1 a {
    color: var(--color__primaryText);
    transition: all 500ms ease-in;
    text-decoration: none;
    font-size: 2rem;
    font-weight: bold;
    text-align: center;
    display: block;
  }
  .githubContent__metadata h1 a:hover {
    color: var(--color__textHover);
  }
</style>

<section class="github">
  <div class="contentBox">
    <article class="contentBox__inner githubContent">
      {#if isLoading}
        <p>Loading</p>
      {:else if error}
        <p>Error: {error}</p>
      {:else}
        <div class="githubContent__metadata">
          <h1>
            <a href={data.user.html_url}>{data.user.name}</a>
          </h1>
          <Happy faces={data.faces} />
        </div>
        <figure class="githubContent__avatar">
          <a href={data.user.html_url}>
            <img src={data.user.avatar_url} alt={data.user.name} />
          </a>
        </figure>
      {/if}
    </article>
  </div>
</section>
