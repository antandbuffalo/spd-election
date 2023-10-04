import { useEffect, useMemo, useState } from "react";
import { getMemberStatus } from "../service/api";
import "./index.scss";
import Spinner from "../Spinner";
import { API_STATUS, APP_ROUTES } from "../utility/constants";
import {
  currentStatus,
  enableReview,
  isCountingStarted,
  isFinalRound,
  showStatus,
} from "../utility/config";
import TeamDetails from "../TeamDetails";
import ViewCount from "../ViewCount";
import { useNavigate } from "react-router-dom";
const Home = ({ sendApiResponse }) => {
  const [membersByRank, setMembersByRank] = useState([]);
  const [updatedAt, setUpdatedAt] = useState("");
  const [apiStatus, setApiStatus] = useState(API_STATUS.NOT_STARTED);
  const [round, setRound] = useState(0);
  const [viewCountData, setViewCountData] = useState({});
  const [totalVotes, setTotalVotes] = useState(0);
  const navigate = useNavigate();

  const isMobile = useMemo(() => {
    return window.innerWidth < 900;
  }, [window.innerWidth]);

  const getData = () => {
    setApiStatus(API_STATUS.IN_PROGRESS);
    getMemberStatus().then((data) => {
      setApiStatus(API_STATUS.SUCCESS);
      if (!data) {
        return;
      }
      setMembersByRank(data?.members.sort((a, b) => a.rank - b.rank));
      // setMembersByRank(data?.members);
      setUpdatedAt(data?.time);
      setRound(data?.round ? data?.round : 0);
      sendApiResponse(data);
      setTotalVotes(data?.totalVotes);
    });
  };
  const startTimer = () => {
    //fetch data every 1 minute
    const interval = setInterval(() => {
      getData();
    }, 60000);
    // return the ref
    return () => clearInterval(interval);
  };
  useEffect(() => {
    getData();
    // invoke the startTimer function and destory the interval
    // const clearFn = startTimer();
    // return () => {
    //   clearFn();
    // };
  }, []);
  const refresh = () => {
    getData();
  };
  const getVoteDifference = (member, index) => {
    if (index === 0) {
      return "";
    }
    const prevMember = membersByRank[index - 1];
    return member.votes - prevMember.votes;
  };

  const getFlashBgClass = (index) => {
    if (isCountingStarted) {
      return `a${index}`;
    }
  };

  const shouldShowStatus = (status, index) => {
    return isCountingStarted && status && index < 5;
  };

  const shouldAddEmptySpace = (status, index) => {
    return isCountingStarted && status && index > 4;
  };

  const openReview = () => {
    navigate(APP_ROUTES["review-list"]);
  };

  return (
    <div className="home">
      <div className="home-header-container">
        <div className="home-header">
          <div className="title">
            <div>
              {enableReview && (
                <button
                  className="review-button"
                  onClick={openReview}
                  disabled={apiStatus === API_STATUS.IN_PROGRESS}
                >
                  கருத்துக்களை பார்க்க
                </button>
              )}
            </div>
            {currentStatus !== "" && (
              <div className="current-status">{currentStatus}</div>
            )}
          </div>
          <div className="btn-container">
            {apiStatus === API_STATUS.IN_PROGRESS && (
              <Spinner className="spinner" />
            )}
            {apiStatus !== API_STATUS.IN_PROGRESS && !enableReview && (
              <button
                className="refresh-button"
                onClick={refresh}
                disabled={apiStatus === API_STATUS.IN_PROGRESS}
              >
                Refresh
              </button>
            )}
          </div>
        </div>
      </div>
      <div className="members-container">
        {membersByRank.map((member, index) => {
          return (
            <div
              className={`members ${getFlashBgClass(index)}`}
              key={member.name}
            >
              <div className="left-side">
                <div className="part-1-container">
                  <div className="part1">
                    <div className="number">{member.no}</div>
                    <div className={`image ${member.team}`}>
                      <img
                        src={`/images/${member.no}.png`}
                        loading="lazy"
                      ></img>
                    </div>
                  </div>
                  {isCountingStarted && (
                    <div className="diff">
                      {getVoteDifference(member, index)}
                    </div>
                  )}
                </div>
                <div className="part2">
                  <div className="name">{member.name}</div>
                  {isCountingStarted && (
                    <div className="votes">
                      <div>
                        வாக்குகள்: <span className="count">{member.votes}</span>
                        {/* ({Math.round(((member.votes / totalVotes) * 100))} %) */}
                      </div>
                      <div className="rank">நிலை: {member.rank}</div>
                    </div>
                  )}
                  {shouldShowStatus(showStatus, index) && (
                    <div
                      className={`status ${!isFinalRound ? "animation" : ""}`}
                    >
                      {isFinalRound && <span>வெற்றி</span>}
                      {!isFinalRound && <span>முன்னிலை</span>}
                    </div>
                  )}
                  {shouldAddEmptySpace(showStatus, index) && <div>&nbsp;</div>}
                </div>
              </div>
              {isCountingStarted && (
                <div className="part3">{getVoteDifference(member, index)}</div>
              )}
            </div>
          );
        })}

        <div className="members team-count">
          <TeamDetails membersByRank={membersByRank} />
        </div>
      </div>
    </div>
  );
};

export default Home;
