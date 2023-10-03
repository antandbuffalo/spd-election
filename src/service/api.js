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
  // crypto.randomUUID
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
