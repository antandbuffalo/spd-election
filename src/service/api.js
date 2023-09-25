export const getMemberStatus = () => {
  return fetch("https://raw.githubusercontent.com/antandbuffalo/spd-election/main/src/Home/memberStatus.json")
    .then((response) => response.json())
    .then((data) => {
      return data;
    });
}