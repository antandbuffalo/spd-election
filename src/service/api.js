export const getMemberStatus = async () => {
  // const isLocal = window.location.host.includes("localhost");
  try {
    const response = await fetch("memberStatus.json");
    const json = await response.json();
    return json;
  } catch (e) {
    console.log(e);
    return null;
  }
};
