export const title = "ஸௌராஷ்ட்ர ஸபை தேர்தல் முடிவுகள் 2025";
export const startTime = new Date("2025-03-23 23:30:00").getTime();

export const showLiveViewCount = true;

// this will show extra details like, total number of votes, current counted etc
export const isCountingStarted = false;

// this shows whether the candidate is trailing or heading
export const showStatus = true;

// this shows whether the candidate won or not. showStatus should be true for this
export const isFinalRound = true;

// this is used to show any news on the top
export const currentStatusTitle = { default: "வேட்பாளர்கள்", started: "தற்போதைய நிலவரம்" };
export const currentStatusDesc = { default: "", started: "வாக்குப்பதிவு" };


export const enableReview = false;

// this is used to define the teams.
export const teams = [
    { key: "A", title: "மக்கள் அணி கூட்டணி", show: true },
    { key: "B", title: "சமூக முன்னேற்ற அணி", show: true },
    { key: "C", title: "இளைஞர் நலச்சங்கம்" },
    { key: "D", title: "சுயேட்சை" }
];

// this is the footer that displays from which team we do this
export const broughtToYouBy = "மக்கள் அணி கூட்டணி";