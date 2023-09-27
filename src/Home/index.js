import { useEffect, useState } from "react";
import { getMemberStatus } from "../service/api";
import "./index.scss";
import Spinner from "../Spinner";
import { API_STATUS } from "../utility/constants";
const Home = () => {
  const [membersByRank, setMembersByRank] = useState([]);
  const [updatedAt, setUpdatedAt] = useState("");
  const [apiStatus, setApiStatus] = useState(API_STATUS.NOT_STARTED);
  const [round, setRound] = useState("");

  const getData = () => {
    setApiStatus(API_STATUS.IN_PROGRESS);
    getMemberStatus().then((data) => {
      setApiStatus(API_STATUS.SUCCESS);
      if (!data) {
        return;
      }
      setMembersByRank(data?.members.sort((a, b) => a.rank - b.rank));
      setUpdatedAt(data?.time);
      setRound(data?.round? data?.round : "");
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
  return (
    <div className="home">
      <div className="home-header-container">
        {round !== "" && <div className="round">சுற்று - {round}</div>}
        <div className="home-header">
          <div className="updated-at">
            <span>{updatedAt}</span> - இல் புதுபிக்கப்பட்டது
          </div>
          <div>
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
            <div className={`members a${index}`} key={member.name}>
              <div className="left-side">
                <div className="part1">
                  <div className="number">{member.no}</div>
                  <div className={`image ${member.team}`}>
                    <img src={`/images/${member.no}.png`} loading="lazy"></img>
                  </div>
                </div>
                <div className="part2">
                  <div className="name">{member.name}</div>
                  <div className="votes">
                    <div>வாக்குகள்: {member.votes}</div>
                    <div>நிலை: {member.rank}</div>
                  </div>
                </div>
              </div>
              <div className="part3">{getVoteDifference(member, index)}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Home;
