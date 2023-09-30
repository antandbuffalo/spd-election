import { useEffect, useState } from "react";
import { getMemberStatus } from "../service/api";
import "./index.scss";
import Spinner from "../Spinner";
import { API_STATUS } from "../utility/constants";
import { isCountingStarted, isFinalRound, showStatus } from "../utility/config";
import TeamDetails from "../TeamDetails";
const Home = ({ sendApiResponse }) => {
  const [membersByRank, setMembersByRank] = useState([]);
  const [updatedAt, setUpdatedAt] = useState("");
  const [apiStatus, setApiStatus] = useState(API_STATUS.NOT_STARTED);
  const [round, setRound] = useState(0);

  const getData = () => {
    setApiStatus(API_STATUS.IN_PROGRESS);
    getMemberStatus().then((data) => {
      setApiStatus(API_STATUS.SUCCESS);
      if (!data) {
        return;
      }
      setMembersByRank(data?.members.sort((a, b) => a.rank - b.rank));
      setUpdatedAt(data?.time);
      setRound(data?.round ? data?.round : 0);
      sendApiResponse(data);
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
    const clearFn = startTimer();
    return () => {
      clearFn();
    };
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

  return (
    <div className="home">
      <div className="home-header-container">
        <div className="home-header">
          <div className="title">
            {round !== 0 && (
              <div>
                சுற்று
                <span>{round}</span>
                முடிவுகள்
              </div>
            )}
            {round === 0 && (
              <div>
                <div>தற்போதைய நிலவரம்</div>
              </div>
            )}
            <div className="updated-at">{updatedAt}</div>
          </div>
          <div className="btn-container">
            {apiStatus === API_STATUS.IN_PROGRESS && (
              <Spinner className="spinner" />
            )}
            {apiStatus !== API_STATUS.IN_PROGRESS && (
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
                      <div>வாக்குகள்: {member.votes}</div>
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
