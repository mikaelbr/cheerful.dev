const fetch = require("node-fetch");

const key = process.env.AZURE_KEY;
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
