export const getMemberStatus = () => {
  const isLocal = window.location.host.includes("localhost");
  return fetch(
    isLocal
      ? "memberStatus.json"
      : "https://raw.githubusercontent.com/antandbuffalo/spd-election/main/public/memberStatus.json"
  )
    .then((response) => response.json())
    .then((data) => {
      return data;
    });
};
