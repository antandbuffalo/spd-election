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
  useEffect(() => {
    getData();
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
      {membersByRank.map((member) => {
        return (
          <div className="members">
            <div className="number">{member.no}</div>
            <div className="image">
              <img src={`/images/${member.no}.png`} loading="lazy"></img>
            </div>
            <div className="name">{member.name}</div>
            <div className="rank">{member.votes}</div>
          </div>
        );
      })}
    </div>
  );
};

export default Home;
