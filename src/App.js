import { useEffect, useMemo, useState } from "react";
import "./App.scss";
import Home from "./Home";
import {
  broughtToYouBy,
  countingStatus,
  countingStatuses,
  enableReview,
  startTime,
  title,
} from "./utility/config";
import {
  convertMillisecondsToTime,
  getUUID,
  isReviewSubmitted,
} from "./utility/util";
import ViewCount from "./ViewCount";
import FlipNumbers from "react-flip-numbers";
import Review from "./Review";
import { useNavigate } from "react-router-dom";
import { addUser, useViewCount } from "./service/api";
import MyName from "./MyName";
import { APP_ROUTES, hostCloudFlare, hostFirebase } from "./utility/constants";

function App() {
  const [time, setTime] = useState("");
  const [showCountDown, setShowCountDown] = useState(false);
  const [totalVotes, setTotalVotes] = useState(0);
  const [countedVotes, setCountedVotes] = useState(0);
  const [validVotes, setValidVotes] = useState(0);
  const [inValidVotes, setInvalidVotes] = useState(0);
  const [showReview, setShowReview] = useState(
    !isReviewSubmitted() && enableReview
  );

  const { data: viewCountData } = useViewCount();

  const viewCount = viewCountData?.liveCount || 0;
  const commentCount = viewCountData?.commentCount || 0;
  const userCount = viewCountData?.uniqueUserCount || 0;

  const navigate = useNavigate();

  const numberWidth = useMemo(() => {
    return window.innerWidth > 900 ? 14 : 10;
  }, [window.innerWidth]);

  const numberHeight = useMemo(() => {
    return window.innerWidth > 900 ? 18 : 14;
  }, [window.innerWidth]);

  const calculateTime = () => {
    const diff = startTime - new Date().getTime();
    if (diff > 0) {
      setShowCountDown(true);
      setTime(convertMillisecondsToTime(diff));
      return false;
    } else {
      setShowCountDown(false);
      return true;
    }
  };

  useEffect(() => {
    addUser({ id: getUUID() });

    if (!isReviewSubmitted() && enableReview) {
      setShowReview(true);
      // navigate("/review?pageName=review-list");
    } else {
      setShowReview(false);
    }
    calculateTime();
    const interval = setInterval(() => {
      const isClear = calculateTime();
      if (isClear) {
        clearInterval(interval);
      }
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  const getApiResponse = (response) => {
    setTotalVotes(response?.totalVotes);
    setCountedVotes(response?.countedVotes);
    setValidVotes(response?.totalVotes - response?.invalidVotes);
    setInvalidVotes(response?.invalidVotes);
  };

  const getPercentage = (countedVotes, totalVotes) => {
    try {
      const percentage = countedVotes / totalVotes;
      if (isNaN(percentage)) {
        return 0;
      }
      return ((countedVotes / totalVotes) * 100).toFixed(2);
    } catch (e) {
      console.log("error calculating percentage", e);
      return 0;
    }
  };

  // this will receive the view count response from ViewCount component
  // const viewCountResponse = (data) => {
  //   if (!data) {
  //     return;
  //   }
  //   setViewCount(data?.liveCount);
  //   setCommentCount(data?.commentCount);
  //   setUserCount(data?.uniqueUserCount);
  // };

  const onClickReviewClose = () => {
    sessionStorage.setItem("reviewClosed", true);
    setShowReview(false);
  };

  const openReview = () => {
    setShowReview(true);
  };

  const onClickComment = () => {
    navigate(APP_ROUTES.reviewList);
  };

  const alternateHost = hostCloudFlare.includes(window?.location.hostname)
    ? hostFirebase
    : hostCloudFlare;

  return (
    <div className="App">
      {showReview && (
        <div className="review-transparent">
          <Review isFirstLoad={true} closeHandler={onClickReviewClose} />
        </div>
      )}

      <header className="App-header">
        <div>{title}</div>
        {showCountDown && countingStatus === countingStatuses.NOT_STARTED && (
          <div className="timer">
            <span>இன்னும்</span>
            <FlipNumbers
              height={20}
              width={18}
              numbers={time}
              perspective={100}
              play
              duration={1}
            />
            {/* <span>{time}</span> */}
            <span>மணித்துளிகளில்</span>
          </div>
        )}
        {countingStatus !== countingStatuses.NOT_STARTED && (
          <div className="vote-details">
            <div>
              பதிவான வாக்குகள்:
              <FlipNumbers
                height={numberHeight}
                width={numberWidth}
                play
                perspective={100}
                duration={2}
                numbers={totalVotes + ""}
              />
            </div>
            <div>
              எண்ணப்பட்ட வாக்குகள்:
              <FlipNumbers
                height={numberHeight}
                width={numberWidth}
                play
                perspective={100}
                duration={2}
                numbers={countedVotes + ""}
              />
            </div>
            <div>
              செல்லுபடியான வாக்குகள்:
              <FlipNumbers
                height={numberHeight}
                width={numberWidth}
                play
                perspective={100}
                duration={2}
                numbers={validVotes + ""}
              />
            </div>
            <div>
              செல்லாத வாக்குகள்:
              <FlipNumbers
                height={numberHeight}
                width={numberWidth}
                play
                perspective={100}
                duration={2}
                numbers={inValidVotes + ""}
              />
            </div>
            <div>
              சதவிகிதம்:
              <FlipNumbers
                height={numberHeight}
                width={numberWidth}
                play
                perspective={100}
                duration={2}
                numbers={getPercentage(countedVotes, totalVotes)}
              />
            </div>
          </div>
        )}
        <div className="count-container">
          <div className="live-count" style={{ display: "flex" }}>
            <img src="/icons/IconEyeGreen.svg" />
            <FlipNumbers
              height={14}
              width={10}
              play
              perspective={100}
              duration={3}
              numbers={viewCount + ""}
            />
          </div>
          {enableReview && (
            <div
              className="live-count comment"
              style={{ display: "flex" }}
              onClick={onClickComment}
            >
              <img src="/icons/IconCommentGreen.svg" />
              <FlipNumbers
                height={14}
                width={10}
                play
                perspective={100}
                duration={3}
                numbers={commentCount + ""}
              />
            </div>
          )}

          <div className="live-count" style={{ display: "flex" }}>
            <img src="/icons/IconUserGreen.svg" />
            <FlipNumbers
              height={14}
              width={10}
              play
              perspective={100}
              duration={3}
              numbers={userCount + ""}
            />
          </div>
        </div>
      </header>
      <Home sendApiResponse={getApiResponse} openReview={openReview} />
      <div className="view-count">
        <ViewCount />
      </div>
      <footer>
        <div className="other-pages">
          <a href={APP_ROUTES.disclaimer}>பொறுப்புத் துறப்பு</a>
          <a href={APP_ROUTES.contactUs}>எங்களை தொடர்பு கொள்ள</a>
        </div>
        <br />
        <a href={alternateHost}>
          தேர்தல் முடிவுகளை இந்த வலை தளத்திலும் நீங்கள் தெரிந்து கொள்ளலாம்.
          <br />
          {alternateHost}
        </a>
        <br />
        <br />
        <div className="team">{broughtToYouBy}</div>
        <MyName />
      </footer>
    </div>
  );
}

export default App;
