<script>
  export let faces;

  const happynessFactor = 0.2;

  function isOneFaceHappy(faces) {
    return faces.some(isHappy);
  }

  function isHappy(face) {
    return face.faceAttributes.emotion.happiness >= happynessFactor;
  }
</script>

<style>

</style>

{#if faces.length === 0}
  <p>
    I couldn't find a face, so I honestly don't know if they are cheerful or
    not.
  </p>
{:else if faces.length > 1 && isOneFaceHappy(faces)}
  <p>... looks like several people, but atleast one of them are cheerful! 😄</p>
{:else if faces.length > 1 && !isOneFaceHappy(faces)}
  <p>... looks like several people, and none of them look really cheerful.</p>
{:else if isHappy(faces[0])}
  <p>...looks like one cheerful developer! 😁</p>
{:else}
  <p>... doesn't look like the most cheerful developer.</p>
{/if}
