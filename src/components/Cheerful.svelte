<script>
  import { onMount } from "svelte";
  import Happy from "./Happy.svelte";
  import { isOneFaceHappy } from "./_utils";

  export let username;

  let isLoading = true;
  let data;
  let error = "";

  onMount(async function() {
    try {
      const res = await fetch(`api/${username}.json`);
      const json = await res.json();

      if (res.status >= 300) {
        throw new Error(json.message);
      }

      data = json;
      if (isOneFaceHappy(data.faces)) {
        document.title = data.user.name + " looks cheerful";
      }
    } catch (e) {
      console.error("Error: ", e);
      error = e;
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

    position: relative;
    z-index: 10;
  }
  .githubContent__metadata::before {
    content: "";
    display: block;
    position: absolute;
    top: 0;
    bottom: 0;
    right: -5rem;
    width: 100%;
    z-index: -1;

    background: url("/separator.svg") right center no-repeat;
  }

  .githubContent__avatar {
    flex: 1;
  }
  .githubContent__avatar img {
    display: block;
    max-width: 100%;
    max-height: 100%;
  }

  .githubContent__follow {
    font-size: 0.8rem;
    font-style: italic;

    margin-top: 0.5rem;
  }

  .githubContent__metadata h1 {
    color: var(--color__primaryText);
    font-size: 2rem;
    font-weight: bold;
    text-align: center;
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
        <div class="githubContent__metadata">
          <h1>Loading...</h1>
          <img src="/loading.svg" alt="Loading" />
        </div>
        <figure class="githubContent__avatar">
          <img src="/duck.jpg" alt="Loading duck" />
        </figure>
      {:else if data}
        <div class="githubContent__metadata">
          <h1>
            <a href={data.user.html_url}>{data.user.name || data.user.login}</a>
          </h1>
          <Happy faces={data.faces} />

          <p class="githubContent__follow">
            They have {data.user.followers} people following them, why don't you
            <a href={data.user.html_url}>increase that?</a>
          </p>
        </div>
        <figure class="githubContent__avatar">
          <a href={data.user.html_url}>
            <img
              src={data.user.avatar_url}
              alt={data.user.name || data.user.login} />
          </a>
        </figure>
      {:else}
        <div class="githubContent__metadata">
          <h1>Oh no...</h1>
          <p>Failed duck {error}</p>
        </div>
        <figure class="githubContent__avatar">
          <img src="/duck.jpg" alt="Loading duck" />
        </figure>
      {/if}
    </article>
  </div>
</section>
