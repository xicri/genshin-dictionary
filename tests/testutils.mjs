export function getRandomPort() {
  const min = 1024; // max well known port number is 1023
  const max = 65535; // max port number is 65535

  return Math.floor(Math.random() * (max - min) + min);
}
