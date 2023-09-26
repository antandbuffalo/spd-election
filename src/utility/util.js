export const convertMillisecondsToTime = (milliseconds) => {
  const seconds = Math.floor(milliseconds / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);
  if(days === 0) {
    return `${hours % 24} : ${minutes % 60} : ${seconds % 60}`;
  }
  return `${days} : ${hours % 24} : ${minutes % 60} : ${seconds % 60}`;
}