export const deepClone = obj => JSON.parse(JSON.stringify(obj));

export const randomBoolean = (percentage = .4) => Math.random() < percentage;

export const randomNumber = max => Math.floor(Math.random() * max);