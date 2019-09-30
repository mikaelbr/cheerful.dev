<script>
  import Cheerful from "../components/Cheerful.svelte";

  const isDev = process.env.NODE_ENV === "development";
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
  form {
    margin: auto;
    width: var(--size__width);
    max-width: var(--size__maxWidth);
  }
  fieldset {
    border: 0;
  }
  legend {
    width: 90%;
    margin: 0 auto;
    text-align: center;
    font-size: 2rem;
  }

  .searchInput label {
    flex: 1;
    display: flex;
    justify-content: flex-start;
    align-content: stretch;
  }
  .searchInput input {
    width: 100%;
    font-size: 1.2rem;
    padding: 1.2rem;
    border: 0;
    outline-offset: -2px;

    font-family: "Libre Baskerville", serif;
    font-style: italic;
    color: var(--color__primaryText);
  }
  .searchInput input::placeholder {
    font-family: "Libre Baskerville", serif;
    font-style: italic;
    color: var(--color__fadedText);
  }
  .searchInput button {
    --background: var(--color__button);

    background: var(--background);
    border: 0;
    font-family: "Libre Baskerville", serif;
    font-size: 1rem;
    text-align: center;

    max-width: 8rem;
    cursor: pointer;

    transition: all 500ms ease-in;
    padding-right: 0.5rem;
  }
  .searchInput button:hover {
    --background: var(--color__buttonHover);
  }
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
      <legend>
        Find a cheerful developer by searching their Github username
      </legend>

      <div class="searchInput contentBox">
        <div class="contentBox__inner">
          <label for="github">
            <input
              type="text"
              name="github"
              bind:value={github}
              required
              placeholder="Type a Github username"
              id="github"
              aria-required="true" />
          </label>

          <button type="submit">Are they cheerful?</button>
        </div>
      </div>

      {#if error}
        <p class="error">{error}</p>
      {/if}
    </fieldset>
  </form>
{/if}
