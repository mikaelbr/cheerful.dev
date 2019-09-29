<script>
  export let github;
</script>

<style>

</style>

<h1>
  <a href={github.html_url}>
    <span>{github.name}</span>
    <img src={github.avatar_url} alt={github.name} />
  </a>
</h1>
