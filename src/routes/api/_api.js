const fetch = require("node-fetch");
const { getEmotion } = require("./_face");

const baseUrl = "https://api.github.com";

export async function getUser(username) {
  let result = await fetch(`${baseUrl}/users/${username}`);
  let data = await result.json();
  const image = data.avatar_url;
  const faces = await getEmotion(image);
  return { user: data, faces };
}
