import { useEffect, useState } from "react";
import { getMemberStatus } from "../service/api";
import "./index.scss";
const Home = () => {
  const [membersByRank, setMembersByRank] = useState([]);
  const [updatedAt, setUpdatedAt] = useState("");

  const getData = () => {
    getMemberStatus().then((data) => {
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
        <div className="members-heading">
          <div className="number">எண்</div>
          <div className="name">பெயர்</div>
          <div className="rank">நிலவரம்</div>
        </div>
        <div className="updated-at">
          <div>Updated At: {updatedAt}</div>
          <div className="refresh-button" onClick={refresh}>
            Refresh
          </div>
        </div>
      </div>
      {membersByRank.map((member) => {
        return (
          <div className="members">
            <div className="number">{member.no}</div>
            <div className="image">
              <img src={`/images/${member.no}.png`} loading="lazy"></img>
            </div>
            <div className="name">{member.name}</div>
            <div className="rank">{member.rank}</div>
          </div>
        );
      })}
    </div>
  );
};

export default Home;
