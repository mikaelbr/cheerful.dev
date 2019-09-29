const happynessFactor = 0.2;

export function isOneFaceHappy(faces) {
  return faces.some(isHappy);
}

export function isHappy(face) {
  return face.faceAttributes.emotion.happiness >= happynessFactor;
}
