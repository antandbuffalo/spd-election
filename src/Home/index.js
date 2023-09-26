import { useEffect, useState } from "react";
import { getMemberStatus } from "../service/api";
import "./index.scss";
const Home = () => {
  const [membersByRank, setMembersByRank] = useState([]);
  const [updatedAt, setUpdatedAt] = useState("");
  const [refreshing, setRefreshing] = useState(false);

  const getData = () => {
    setRefreshing(true);
    getMemberStatus().then((data) => {
      setRefreshing(false);
      setMembersByRank(data?.members.sort((a, b) => a.rank - b.rank));
      setUpdatedAt(data?.time);
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
    }
  }, []);
  const refresh = () => {
    getData();
  };
  return (
    <div className="home">
      <div className="home-header">
        <div className="updated-at">தற்போதய நிலவரம்: {updatedAt}</div>
        <button
          className="refresh-button"
          onClick={refresh}
          disabled={refreshing}
        >
          Refresh
        </button>
      </div>
      <div className="members-container">
        {membersByRank.map((member) => {
          return (
            <div className="members" key={member.name}>
              <div className="part1">
                <div className="number">{member.no}</div>
                <div className="image">
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
          );
        })}
      </div>
    </div>
  );
};

export default Home;
