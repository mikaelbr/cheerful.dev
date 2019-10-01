<script>
  export let faces;
  import { isHappy, isOneFaceHappy, getMaxHappiness } from "./_utils";

  function happinessToEmoji(factor) {
    if (factor > 0.2) {
      return "😀";
    }
    if (factor > 0.4) {
      return "😃";
    }
    if (factor > 0.6) {
      return "😄";
    }
    if (factor > 0.8) {
      return "😁";
    }
    if (factor >= 1) {
      return "😆";
    }
    return "😐";
  }

  let emoji = happinessToEmoji(getMaxHappiness(faces));
</script>

<style>
  .emoji {
    font-size: 3rem;
    text-align: center;
  }

  .emotionText {
    font-style: italic;
    font-size: 0.9rem;
  }
</style>

<p class="emoji">{emoji}</p>
<p class="emotionText">
  {#if faces.length === 0}
    I couldn't find a face, so I honestly don't know if they are cheerful or
    not.
  {:else if faces.length > 1 && isOneFaceHappy(faces)}
    ... looks like several people, but atleast one of them are cheerful!
  {:else if faces.length > 1 && !isOneFaceHappy(faces)}
    ... looks like several people, and none of them look really cheerful.
  {:else if faces.length && isHappy(faces[0])}
    ...looks like one cheerful developer!
  {:else}... doesn't look like the most cheerful developer.{/if}
</p>
