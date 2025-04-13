import {
  countingStatus,
  countingStatuses,
  requiredNumberOfCandidates,
} from "../utility/config";
import "./index.scss";
import FlipNumbers from "react-flip-numbers";
import { candidates } from "../utility/constants";

const MemberCard = ({ member, index, prevMember }) => {
  const isCounting = countingStatus !== countingStatuses.NOT_STARTED;

  const getVoteDifference = (member, prevMember) => {
    if (!prevMember) {
      return "";
    }
    return `(${Math.abs(member.votes - prevMember.votes)})`;
  };
  const getRankClass = (index) => {
    if (index < requiredNumberOfCandidates) {
      return "positive";
    }
    return "";
  };
  const showCurrentStatus = () => {
    return countingStatus === countingStatuses.IN_PROGRESS;
  };
  const getStatContent = (member) => {
    const changeContent = `(${member.rank + member.change} -> ${member.rank})`;
    if (member.change === 0) {
      return <span style={{ color: "#444" }}>மாற்றம் இல்லை</span>;
    } else if (member.change > 0) {
      return <span>முன்னிலை</span>;
    } else if (member.change < 0) {
      return <span style={{ color: "#ff0000" }}>பின்னடைவு</span>;
    } else {
      return "";
    }
  };
  const showVictoryStatus = () => {
    return (
      countingStatus === countingStatuses.ENDED &&
      index < requiredNumberOfCandidates
    );
  };
  return (
    <div className="member-card">
      <div className="members" key={member.no}>
        <div className="left-side">
          <div className="part-1-container">
            <div className="part1">
              <div className="number">{member.no}</div>
              <div
                className={`image ${member.team} ${
                  countingStatus === countingStatuses.IN_PROGRESS
                    ? "in-progress"
                    : ""
                }`}
              >
                {countingStatus === countingStatuses.IN_PROGRESS && (
                  <div
                    className={`index-overlay ${
                      index >= requiredNumberOfCandidates
                        ? "below-required"
                        : ""
                    }`}
                  >
                    {index + 1}
                  </div>
                )}
                <img
                  className="photo"
                  src={`/images/sabai_2025/${member.no}.png`}
                  loading="lazy"
                />
              </div>
            </div>
          </div>
          <div className="part2">
            <div className="name">{candidates[member.no]}</div>
            {isCounting && (
              <div>
                <div className="votes">
                  வாக்குகள்:
                  <span className="count">{member.votes}</span>
                  {/* ({Math.round(((member.votes / totalVotes) * 100))} %) */}
                  <span className="change">
                    {getVoteDifference(member, prevMember)}
                  </span>
                </div>
                <div className={`rank ${getRankClass(index)}`}>
                  <div>நிலை: </div>
                  <FlipNumbers
                    height={14}
                    width={11}
                    numbers={member.rank + ""}
                    perspective={100}
                    play
                    duration={3}
                  />
                </div>
              </div>
            )}

            <div
              className={`status ${
                countingStatus === countingStatuses.IN_PROGRESS
                  ? "animation"
                  : ""
              }`}
            >
              {showVictoryStatus(index) && <span>வெற்றி</span>}
              {showCurrentStatus() && getStatContent(member)}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MemberCard;
