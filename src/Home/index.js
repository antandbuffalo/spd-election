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
} from "../utility/config";
import TeamDetails from "../TeamDetails";
import { useNavigate } from "react-router-dom";
import { leadingTrailing } from "../utility/util";
import MemberCard from "../MemberCard";
const Home = ({ sendApiResponse }) => {
  const [membersByRank, setMembersByRank] = useState([]);
  const [updatedAt, setUpdatedAt] = useState("");
  const [apiStatus, setApiStatus] = useState(API_STATUS.NOT_STARTED);
  const navigate = useNavigate();

  const isCounting = countingStatus !== countingStatuses.NOT_STARTED;

  const isMobile = useMemo(() => {
    return window.innerWidth < 900;
  }, [window.innerWidth]);

  const getData = async () => {
    setMembersByRank([]);
    setApiStatus(API_STATUS.IN_PROGRESS);
    const data = await getMemberStatus();
    setApiStatus(API_STATUS.SUCCESS);

    if (!data) {
      return;
    }
    if (isCounting) {
      const formatted = leadingTrailing(data);
      // setMembersByRank(data?.members.sort((a, b) => a.rank - b.rank));
      setMembersByRank(formatted);
    } else {
      setMembersByRank(data?.members);
    }

    setUpdatedAt(data?.time);
    sendApiResponse(data);
  };
  const startTimer = () => {
    let timer = null;
    const fetchAndSchedule = async () => {
      await getData();
      timer = setTimeout(fetchAndSchedule, memberFetchInterval);
    };
    timer = setTimeout(fetchAndSchedule, memberFetchInterval);

    // return the ref
    return () => clearTimeout(timer);
  };
  useEffect(() => {
    getData();
    if (countingStatus === countingStatuses.IN_PROGRESS) {
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

  const openReview = () => {
    navigate(APP_ROUTES.reviewList);
  };

  return (
    <div className="home">
      <div className="home-header-container">
        <div className="home-header">
          <div></div>
          <div className="title">
            {countingStatus === countingStatuses.NOT_STARTED
              ? currentStatusTitle.default
              : currentStatusTitle.started}
            {currentStatusDesc.default !== "" && (
              <div className="current-status">
                {countingStatus === countingStatuses.NOT_STARTED
                  ? currentStatusDesc.started
                  : currentStatusDesc.default}
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
            <MemberCard
              key={member.no}
              member={member}
              index={index}
              prevMember={index > 0 ? membersByRank[index - 1] : null}
            />
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
