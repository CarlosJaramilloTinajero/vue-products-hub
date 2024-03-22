export const deepClone = obj => JSON.parse(JSON.stringify(obj));

export const randomBoolean = () => Math.random() < .4;

export const randomNumber = max => Math.floor(Math.random() * max);