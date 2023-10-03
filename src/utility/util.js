export const roundToTwoDigits = (num) => {
  if (num < 10) {
    return `0${num}`;
  }
  return num;
};
export const convertMillisecondsToTime = (milliseconds) => {
  const seconds = Math.floor(milliseconds / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);
  if (days === 0) {
    return `${roundToTwoDigits(hours) % 24} : ${roundToTwoDigits(
      minutes % 60
    )} : ${roundToTwoDigits(seconds % 60)}`;
  }
  return `${days} : ${roundToTwoDigits(hours % 24)} : ${roundToTwoDigits(
    minutes % 60
  )} : ${roundToTwoDigits(seconds % 60)}`;
};

export const getUUID = () => {
  if (localStorage.getItem("uuid")) {
    return localStorage.getItem("uuid");
  }
  const uuid = crypto.randomUUID();
  localStorage.setItem("uuid", uuid);
  return uuid;
};

export const isReviewSubmitted = () => {
  return localStorage.getItem("reviewed");
};
