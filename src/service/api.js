import { showLiveViewCount } from "../utility/config";
import { viewCountApiUrl } from "../utility/constants";
import { getUUID } from "../utility/util";

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
  const isLocal = window.location.host.includes("localhost");
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
