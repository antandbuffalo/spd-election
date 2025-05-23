import { projector } from "../utility/config";
import { viewCountApiUrl } from "../utility/constants";
import { getUUID } from "../utility/util";

const isLocal = window.location.host.includes("localhost");
const memberStatusGithubUrl = `https://raw.githubusercontent.com/antandbuffalo/spd-election/refs/heads/feat/sabai-election/public/memberStatus.json`;

export const getMemberStatusFromGithub = async () => {
  try {
    const response = await fetch(
      `${memberStatusGithubUrl}?time=${new Date().getTime()}`
    );
    const json = await response.json();
    return json;
  } catch (e) {
    console.log(e);
    return null;
  }
};

export const getMemberStatusFromSource = async () => {
  try {
    const response = await fetch(
      `memberStatus.json?time=${new Date().getTime()}`
    );
    const json = await response.json();
    return json;
  } catch (e) {
    console.log(e);
    return null;
  }
};

export const getMemberStatus = async () => {
  // const dataFromGithub = await getMemberStatusFromGithub();
  // if(dataFromGithub) return dataFromGithub;

  const dataFromSource = await getMemberStatusFromSource();
  if (dataFromSource) return dataFromSource;

  return null;
};

export const getViewCount = async () => {
  const url = isLocal && !projector ? `http://localhost:3001` : viewCountApiUrl;
  try {
    const response = await fetch(
      `${url}?id=${getUUID()}&time=${new Date().getTime()}`
    );
    const json = await response.json();
    return json;
  } catch (e) {
    console.log(e);
    return null;
  }
};

export const submitReview = async (review) => {
  const contextPath = "/review";
  const url = isLocal
    ? `http://localhost:3001${contextPath}`
    : `${viewCountApiUrl}${contextPath}`;

  try {
    const response = await fetch(url, {
      method: "POST",
      body: JSON.stringify(review),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const json = await response.json();
    return json;
  } catch (e) {
    console.log(e);
    return null;
  }
};

export const getReviewList = async () => {
  const contextPath = "/review";
  const url = isLocal
    ? `http://localhost:3001${contextPath}`
    : `${viewCountApiUrl}${contextPath}`;

  try {
    const response = await fetch(url);
    const json = await response.json();
    return json;
  } catch (e) {
    console.log(e);
    return null;
  }
};

export const addUser = async (user) => {
  const hostname = window?.location?.hostname;
  console.log(hostname);
  const contextPath = "/add-user";
  const url =
    isLocal && !projector
      ? `http://localhost:3001${contextPath}`
      : `${viewCountApiUrl}${contextPath}`;

  try {
    const response = await fetch(url, {
      method: "POST",
      body: JSON.stringify({ ...user, hostname }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const json = await response.json();
    return json;
  } catch (e) {
    console.log(e);
    return null;
  }
};

export const login = async (password) => {
  const contextPath = "/login";
  const url = isLocal
    ? `http://localhost:3001${contextPath}`
    : `${viewCountApiUrl}${contextPath}`;

  try {
    const response = await fetch(url, {
      method: "POST",
      body: JSON.stringify({ password }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const json = await response.json();
    return json;
  } catch (e) {
    console.log(e);
    return null;
  }
};

export const deleteReview = async ({ id, token }) => {
  if (!id || !token) return;

  const contextPath = "/review";
  const url = isLocal
    ? `http://localhost:3001${contextPath}`
    : `${viewCountApiUrl}${contextPath}`;

  try {
    const response = await fetch(url, {
      method: "DELETE",
      body: JSON.stringify({ id, token }),
      headers: {
        "Content-Type": "application/json",
        "x-admin-token": token,
      },
    });
    const json = await response.json();
    return json;
  } catch (e) {
    console.log(e);
    return null;
  }
};

export const fetchConfig = async () => {
  try {
    const response = await fetch(`config.json?time=${new Date().getTime()}`);
    const json = await response.json();
    return json;
  } catch (e) {
    console.log(e);
    return null;
  }
};

export const getUsers = async () => {
  const contextPath = "/users";
  const url = isLocal
    ? `http://localhost:3001${contextPath}`
    : `${viewCountApiUrl}${contextPath}`;

  try {
    const response = await fetch(url, {
      headers: {
        "x-admin-token": localStorage.getItem("token") || "",
      },
    });

    if (!response.ok) {
      if (response.status === 401) {
        throw new Error("Unauthorized: Please login again");
      }
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const json = await response.json();
    return json;
  } catch (e) {
    console.log(e);
    return null;
  }
};

export const generateFestivalAnalytics = async () => {
  const contextPath = "/generate-festival-analytics";
  const url = isLocal
    ? `http://localhost:3001${contextPath}`
    : `${viewCountApiUrl}${contextPath}`;

  try {
    const response = await fetch(url, {
      headers: {
        "x-admin-token": localStorage.getItem("token") || "",
      },
    });
    const json = await response.json();
    return json;
  } catch (e) {
    console.log(e);
    return null;
  }
};
