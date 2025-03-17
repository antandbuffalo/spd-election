import { useEffect, useMemo, useState } from "react";
import { getMemberStatus } from "../service/api";
import "./index.scss";
import Spinner from "../Spinner";
import { API_STATUS, APP_ROUTES } from "../utility/constants";
import {
  countingStatus,
  countingStatuses,
  currentStatusDesc,
  currentStatusTitle,
  enableReview,
  memberFetchInterval,
  requiredNumberOfCandidates,
  showStatus,
  showVoteDiff,
} from "../utility/config";
import TeamDetails from "../TeamDetails";
import { useNavigate } from "react-router-dom";
import { formatUpdatedAt, leadingTrailing } from "../utility/util";
import FlipNumbers from "react-flip-numbers";
// import { getImage } from "../storage/imageCache";
const Home = ({ sendApiResponse }) => {
  const [membersByRank, setMembersByRank] = useState([]);
  const [updatedAt, setUpdatedAt] = useState("");
  const [apiStatus, setApiStatus] = useState(API_STATUS.NOT_STARTED);
  const [round, setRound] = useState(0);
  const [totalVotes, setTotalVotes] = useState(0);
  const navigate = useNavigate();

  // getImage("images/sabai_2025/1.png").then((data) => {
  //   console.log(data);
  // })

  const isCounting = countingStatus !== countingStatuses.NOT_STARTED;

  const isMobile = useMemo(() => {
    return window.innerWidth < 900;
  }, [window.innerWidth]);

  const getData = () => {
    setMembersByRank([]);
    setApiStatus(API_STATUS.IN_PROGRESS);
    getMemberStatus().then((data) => {
      setApiStatus(API_STATUS.SUCCESS);
      if (!data) {
        return;
      }
      if (isCounting) {
        const formatted = leadingTrailing(data);
        console.log(formatted);
        // setMembersByRank(data?.members.sort((a, b) => a.rank - b.rank));
        setMembersByRank(formatted);
      }
      else {
        setMembersByRank(data?.members);
      }

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
    }, memberFetchInterval);
    // return the ref
    return () => clearInterval(interval);
  };
  useEffect(() => {
    getData();
    if (countingStatus === countingStatuses.STARTED || countingStatus === countingStatuses.FINAL_ROUND) {
      // invoke the startTimer function and destory the interval
      const clearFn = startTimer();
      return () => {
        clearFn();
      };
    }
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
    if (isCounting && index < requiredNumberOfCandidates) {
      return `required-candidate`;
    }
    return "";
  };

  const shouldShowStatus = (status, index) => {
    return (isCounting || countingStatus === countingStatuses.ENDED) && status;
    //  && index < requiredNumberOfCandidates;
  };

  const shouldAddEmptySpace = (status, index) => {
    return (isCounting || countingStatus === countingStatuses.ENDED) && status && index > requiredNumberOfCandidates - 1;
  };

  const openReview = () => {
    navigate(APP_ROUTES.reviewList);
  };

  const getRankClass = (index) => {
    if (index < requiredNumberOfCandidates) {
      return "positive";
    }
    return "";
  }

  const getStatContent = (member) => {
    if (member.change === 0) {
      return <span style={{ color: "#555" }}>மாற்றம் இல்லை</span>
    }
    if (member.change === 1) {
      return <span>முன்னிலை</span>
    }
    return <span style={{ color: "#ff0000" }}>பின்னடைவு</span>
  }

  return (
    <div className="home">
      <div className="home-header-container">
        <div className="home-header">
          <div></div>
          <div className="title">
            {countingStatus === countingStatuses.NOT_STARTED ? currentStatusTitle.default : currentStatusTitle.started}
            {currentStatusDesc.default !== "" && (
              <div className="current-status">{countingStatus === countingStatuses.NOT_STARTED ? currentStatusDesc.started : currentStatusDesc.default}</div>
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
                புதுப்பி
              </button>
            )}
          </div>
        </div>
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
                        className="photo"
                        src={`/images/sabai_2025/${member.no}.png`}
                        loading="lazy"
                      ></img>
                      {isCounting && showVoteDiff && (
                        <div className="diff">
                          {/* {index !== 0 && <img className="icon-down" src="/icons/IconDownRed.svg" />} */}
                          <FlipNumbers
                            height={14}
                            width={12}
                            numbers={getVoteDifference(member, index) + ""}
                            perspective={100}
                            play
                            duration={3}
                          />
                        </div>
                      )}
                    </div>
                  </div>

                </div>
                <div className="part2">
                  <div className="name">{member.name}</div>
                  {isCounting && (
                    <div>
                      <div className="votes">
                        <div>வாக்குகள்:</div>
                        {/* <span className="count"> */}
                        {/* {member.votes} */}
                        <FlipNumbers
                          height={14}
                          width={12}
                          numbers={member.votes + ""}
                          perspective={100}
                          play
                          duration={3}
                        />
                        {/* </span> */}
                        {/* ({Math.round(((member.votes / totalVotes) * 100))} %) */}
                      </div>
                      <div className={`rank ${getRankClass(index)}`}>
                        <div>நிலை: </div>
                        <FlipNumbers
                          height={14}
                          width={12}
                          numbers={member.rank + ""}
                          perspective={100}
                          play
                          duration={3}
                        />

                      </div>
                    </div>
                  )}
                  {shouldShowStatus(showStatus, index) && (
                    <div
                      className={`status ${countingStatus !== countingStatuses.FINAL_ROUND && countingStatus !== countingStatuses.ENDED ? "animation" : ""}`}
                    >
                      {(countingStatus === countingStatuses.FINAL_ROUND || countingStatus === countingStatuses.ENDED) && <span>வெற்றி</span>}
                      {/* {(countingStatus !== countingStatuses.FINAL_ROUND && countingStatus !== countingStatuses.ENDED) && <span>முன்னிலை</span>} */}
                      {(countingStatus !== countingStatuses.FINAL_ROUND && countingStatus !== countingStatuses.ENDED) && getStatContent(member)}
                    </div>
                  )}
                  {/* {shouldAddEmptySpace(showStatus, index) && <div>&nbsp;</div>} */}
                </div>
              </div>
              {(isCounting && showVoteDiff) && (
                <div className="part3">
                  {/* {index !== 0 && <img className="icon-down" src="/icons/IconDownRed.svg" />} */}
                  <FlipNumbers
                    height={18}
                    width={14}
                    numbers={getVoteDifference(member, index) + ""}
                    perspective={100}
                    play
                    duration={3}
                  />
                </div>
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
