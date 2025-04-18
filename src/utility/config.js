export const title = "ஸௌராஷ்ட்ர ஸபை தேர்தல் முடிவுகள் 2025";

export const countingStatuses = {
  NOT_STARTED: "NOT_STARTED",
  IN_PROGRESS: "IN_PROGRESS",
  ENDED: "ENDED",
};

// this is used to show any news on the top
export const currentStatusTitle = {
  default: "வேட்பாளர்கள்",
  started: "தற்போதைய நிலவரம்",
};
export const currentStatusDesc = {
  default: "",
  started: "பதிவான வாக்குகள்: 5313",
};

export const enableReview = true;

// this is used to define the teams
export const teams = [
  { key: "A", title: "மக்கள் அணி", show: true },
  { key: "B", title: "சமூக முன்னேற்ற அணி", show: true },
  { key: "C", title: "இளைஞர் நலச்சங்கம்" },
  { key: "D", title: "சுயேட்சை" },
];

// this is the footer that displays from which team we do this
export const broughtToYouBy = "மக்கள் அணி";

export const requiredNumberOfCandidates = 11;

// the images will get from server until it matches this date in local
export const imageUpdatedAt = "2025-03-09 00:00:00";

// interval to fetch members in loop. 1 min = 60000
export const memberFetchInterval = 60000;

// the time to start counting. used for count down
export const startTime = new Date("2025-03-23 23:00:00").getTime();

// STARTED - will show extra details like, total number of votes, current count etc
// FINAL_ROUND - this shows whether the candidate won or not. showStatus should be true for this
// NOT_STARTED, IN_PROGRESS, ENDED
export const countingStatus = countingStatuses.ENDED;

// to fetch live count from api for projector
export const projector = false;
