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

export const isReviewClosed = () => {
  return sessionStorage.getItem("reviewClosed");
};

export const showReviewCloseConfirmation = () => {
  const flag = window.confirm("கருத்துக்களை பகிராமல் வெளியேற வேண்டுமா?");
  return flag;
};

export const validateReviewRequest = (request) => {
  if (!request) return false;
  if (!request.mood) return false;
  return true;
};

export const isAdmin = () => {
  const token = localStorage.getItem("token");
  return token && token !== "";
};

const parseDate = (dateStr) => {
  const [datePart, timePart] = dateStr.split(", ");
  const [day, month, year] = datePart.split("/").map(Number);
  return new Date(year, month - 1, day, ...timePart.split(":").map(Number));
}

export const formatUpdatedAt = (input) => {
  if (!input) return "";

  const updatedAt = parseDate(input);
  console.log(updatedAt);
  const today = new Date();
  if (today.getDate() === updatedAt.getDate() && today.getMonth() === updatedAt.getMonth() && today.getFullYear() === updatedAt.getFullYear()) {
    return `Today ${input.split(" ")[1]}`;
  }
  return input;
}