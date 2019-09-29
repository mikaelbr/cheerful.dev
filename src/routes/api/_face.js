const fetch = require("node-fetch");

const key = "d6fecad76c17462f85b8c0574bbe4c07";
const baseUrl =
  "https://cheerful-dev.cognitiveservices.azure.com/face/v1.0/detect";
const params =
  "?returnFaceId=true&returnFaceLandmarks=false&returnFaceAttributes=emotion";

const fullUrl = baseUrl + params;

export async function getEmotion(image) {
  try {
    let result = await fetch(fullUrl, {
      method: "POST",
      body: JSON.stringify({ url: image }),
      headers: {
        "Content-Type": "application/json",
        "Ocp-Apim-Subscription-Key": key
      }
    });
    let json = await result.json();
    return json;
  } catch (e) {
    return [];
  }
}
