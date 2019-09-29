export async function getAndShowResult(data, res) {
  try {
    const user = await data;
    res.writeHead(200, {
      "Content-Type": "application/json"
    });
    res.end(JSON.stringify(user));
  } catch (e) {
    res.writeHead(404, {
      "Content-Type": "application/json"
    });

    console.error(e);

    res.end(
      JSON.stringify({
        message: `Not found`
      })
    );
  }
}
