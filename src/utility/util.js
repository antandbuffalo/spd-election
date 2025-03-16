import { lsKeys } from "./constants";

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

const createMembersMap = (members) => {
  const currMembersMap = new Map();
  for (let i = 0; i < members.length; i++) {
    const member = members[i];
    currMembersMap.set(member.no, member);
  }
  return currMembersMap;
}

const updateMembersWithStats = (sortByRank, currMembersMap) => {
  for (let i = 0; i < sortByRank.length; i++) {
    const member = sortByRank[i];
    const currRank = currMembersMap.get(member.no).rank;
    const newRank = member.rank;
    if (newRank > currRank) {
      sortByRank[i].change = -1;
    }
    else if (newRank < currRank) {
      sortByRank[i].change = 1;
    }
    else {
      sortByRank[i].change = 0;
    }
  }
}

export const leadingTrailing = (data) => {
  const sortByRank = data?.members.sort((a, b) => a.rank - b.rank);
  try {
    const curr = JSON.parse(localStorage.getItem(lsKeys.curr_status));
    if (!curr) {
      localStorage.setItem(lsKeys.curr_status, JSON.stringify(data));
      return sortByRank;
    }
    // current data is available. so check date
    const currDate = parseDate(curr.time).getTime();
    const newDate = parseDate(data?.time).getTime();
    if (newDate > currDate) {
      const currMembersMap = createMembersMap(curr.members);
      updateMembersWithStats(sortByRank, currMembersMap);
      return sortByRank;
    }
    if (currDate === newDate) {
      const prev = JSON.parse(localStorage.getItem(lsKeys.prev_status));
      if (!prev) {
        return sortByRank;
      }
      // current and new received are equal. check with prev.
      const prevMembersMap = createMembersMap(prev.members);
      updateMembersWithStats(sortByRank, prevMembersMap);
      return sortByRank;
    }
    // currDate > newDate - likely won't occur
    return sortByRank;
  }
  catch {
    localStorage.setItem(lsKeys.curr_status, JSON.stringify(data));
    return sortByRank;
  }
}