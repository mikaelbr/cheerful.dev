const happynessFactor = 0.2;

function getHappy(face) {
  return face.faceAttributes.emotion.happiness;
}

export function isOneFaceHappy(faces) {
  return faces.some(isHappy);
}

export function isHappy(face) {
  return face.faceAttributes.emotion.happiness >= happynessFactor;
}

export function getMaxHappiness(faces) {
  return Math.max(0, ...faces.map(getHappy));
}
