<script>
  import Cheerful from "../components/Cheerful.svelte";

  const isDev = process.env.NODE_ENV !== "production";
  const hostname = process.env.HOSTNAME || "cheerful.dev";
  const schema =
    typeof window !== "undefined" ? window.location.protocol : "https";

  let username = getUsernameFromURL();
  let github;
  let error;

  async function redirectToUserpage() {
    error = undefined;
    if (!github) {
      error = "Username cannot be empty";
      return;
    }

    if (isDev) {
      document.location = "/" + github;
    } else {
      let url = `${schema}//${github}.${hostname}`;
      if (location.port) {
        url += ":" + location.port;
      }
      document.location = url;
    }
  }

  function getUsernameFromURL() {
    if (typeof location === "undefined") {
      return undefined;
    }
    let split = location.hostname.split("." + hostname);
    if (split.length < 2) {
      return undefined;
    }
    return split[0];
  }
</script>

<style>

</style>

<svelte:head>
  <title>Cheerful dev?</title>
</svelte:head>

{#if username}
  <Cheerful {username} />
{/if}

{#if !username}
  <form action="/" on:submit|preventDefault={redirectToUserpage}>
    <fieldset>
      <legend>Know a cheerful dev?</legend>

      <label for="github">
        <h2>Username</h2>
        <input
          type="text"
          name="github"
          bind:value={github}
          required
          id="github"
          aria-required="true" />
      </label>

      <button type="submit">Are they cheerful?</button>

      {#if error}
        <p class="error">{error}</p>
      {/if}
    </fieldset>
  </form>
{/if}
