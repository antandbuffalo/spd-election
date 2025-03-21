import { fetchConfig } from "../service/api";
import { countingStatus, memberFetchInterval, showStatus, showVoteDiff, startTime } from "./config";
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
  const membersMap = new Map();
  for (let i = 0; i < members.length; i++) {
    const member = members[i];
    membersMap.set(member.no, member);
  }
  return membersMap;
}

const updateMembersWithStats = (sortByRank, prevMembersMap) => {
  for (let i = 0; i < sortByRank.length; i++) {
    const member = sortByRank[i];
    const currRank = prevMembersMap.get(member.no).rank;
    const newRank = member.rank;
    sortByRank[i].change = currRank - newRank;
  }
}

export const leadingTrailing = (data) => {
  const sortedByRank = data?.members.sort((a, b) => a.rank - b.rank);

  try {
    let curr = JSON.parse(localStorage.getItem(lsKeys.curr_status));
    let prev = JSON.parse(localStorage.getItem(lsKeys.prev_status));

    if (!curr) {
      localStorage.setItem(lsKeys.curr_status, JSON.stringify(data));
      return sortedByRank;
    }

    // current data is available. so check date
    const newDate = parseDate(data?.time).getTime();
    const currDate = parseDate(curr.time).getTime();

    if (newDate === currDate && !prev) {
      return sortedByRank;
    }

    // // newDate < currDate - likely won't occur
    if (newDate < currDate && !prev) {
      return sortedByRank;
    }

    if (newDate > currDate) {
      // new data is available
      localStorage.setItem(lsKeys.prev_status, JSON.stringify(curr));
      localStorage.setItem(lsKeys.curr_status, JSON.stringify(data));
      prev = curr;
      curr = data;
    }

    // both curr and prev available
    const prevMembersMap = createMembersMap(prev.members);
    updateMembersWithStats(sortedByRank, prevMembersMap);
    return sortedByRank;
  }
  catch {
    localStorage.setItem(lsKeys.curr_status, JSON.stringify(data));
    return sortedByRank;
  }
}

export const getConfig = async () => {
  const config = await fetchConfig();
  if (config) return config;
  return {
    "memberFetchInterval": memberFetchInterval,
    "startTime": startTime,
    "countingStatus": countingStatus,
    "showStatus": showStatus,
    "showVoteDiff": showVoteDiff
  }

}