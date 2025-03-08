import { useEffect, useMemo, useState } from "react";
import "./App.scss";
import Home from "./Home";
import { broughtToYouBy, enableReview, isCountingStarted, startTime, title } from "./utility/config";
import {
  convertMillisecondsToTime,
  getUUID,
  isReviewClosed,
  isReviewSubmitted,
} from "./utility/util";
import ViewCount from "./ViewCount";
import FlipNumbers from "react-flip-numbers";
import IconEye from "./Icons/IconEye";
import Review from "./Review";
import { useNavigate } from "react-router-dom";
import { addUser } from "./service/api";
import MyName from "./MyName";
import IconComment from "./Icons/IconComment";
import IconUser from "./Icons/IconUser";

function App() {
  const [time, setTime] = useState("");
  const [showCountDown, setShowCountDown] = useState(false);
  const [totalVotes, setTotalVotes] = useState(0);
  const [countedVotes, setCountedVotes] = useState(0);
  const [viewCount, setViewCount] = useState(0);
  const [commentCount, setCommentCount] = useState(0);
  const [userCount, setUserCount] = useState(0);
  const [showReview, setShowReview] = useState(!isReviewSubmitted() && enableReview);

  const navigate = useNavigate();

  const isMobile = useMemo(() => {
    return window.innerWidth < 900;
  }, [window.innerWidth]);

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

  const viewCountResponse = (data) => {
    if (!data) {
      return;
    }
    setViewCount(data?.viewCount);
    setCommentCount(data?.commentCount);
    setUserCount(data?.uniqueUserCount);
  };

  const onClickReviewClose = () => {
    setShowReview(false);
  };

  const openReview = () => {
    setShowReview(true);
  };

  const onClickComment = () => {
    navigate("/review-list");
  }

  return (
    <div className="App">
      {/* {showReview && (
        <div className="review-transparent">
          <Review isFirstLoad={true} closeHandler={onClickReviewClose} />
        </div>
      )} */}

      <header className="App-header">
        <div>{title}</div>
        {showCountDown && !isCountingStarted && (
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
        {isCountingStarted && (
          <div className="vote-details">
            <div>
              பதிவான வாக்குகள்:
              <FlipNumbers
                height={numberHeight}
                width={numberWidth}
                play
                perspective={100}
                duration={1}
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
                duration={1}
                numbers={countedVotes + ""}
              />
            </div>
            <div>
              சதவிகிதம்:
              <FlipNumbers
                height={numberHeight}
                width={numberWidth}
                play
                perspective={100}
                duration={1}
                numbers={getPercentage(countedVotes, totalVotes)}
              />
            </div>
            <div className="count-container">
              <div className="live-count" style={{ display: "flex" }}>
                <IconEye />
                <FlipNumbers
                  height={14}
                  width={10}
                  play
                  perspective={100}
                  duration={1}
                  numbers={viewCount + ""}
                />
              </div>
              {/* <div className="live-count" style={{ display: "flex" }} onClick={onClickComment}>
                <IconComment />
                <FlipNumbers
                  height={14}
                  width={10}
                  play
                  perspective={100}
                  duration={1}
                  numbers={commentCount + ""}
                />
              </div>
              <div className="live-count" style={{ display: "flex" }}>
                <IconUser />
                <FlipNumbers
                  height={14}
                  width={10}
                  play
                  perspective={100}
                  duration={1}
                  numbers={userCount + ""}
                />
              </div> */}
            </div>
          </div>
        )}
      </header>
      <Home sendApiResponse={getApiResponse} openReview={openReview} />
      <div className="view-count">
        <ViewCount sendViewCount={viewCountResponse} />
      </div>
      <footer>
        <MyName />
        <div className="team">{broughtToYouBy}</div>
        <br />
      </footer>
    </div>
  );
}

export default App;
