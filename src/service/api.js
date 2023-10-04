import { showLiveViewCount } from "../utility/config";
import { viewCountApiUrl } from "../utility/constants";
import { getUUID } from "../utility/util";

const isLocal = window.location.host.includes("localhost");

export const getMemberStatus = async () => {
  // const isLocal = window.location.host.includes("localhost");
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

export const getViewCount = async () => {
  const url =
    isLocal && !showLiveViewCount ? `http://localhost:3001` : viewCountApiUrl;

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
  const contextPath = "/add-user";
  const url = isLocal
    ? `http://localhost:3001${contextPath}`
    : `${viewCountApiUrl}${contextPath}`;

  try {
    const response = await fetch(url, {
      method: "POST",
      body: JSON.stringify(user),
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
  if(!id || !token) return;

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
      },
    });
    const json = await response.json();
    return json;
  } catch (e) {
    console.log(e);
    return null;
  }
};
