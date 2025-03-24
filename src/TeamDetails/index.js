import FlipNumbers from "react-flip-numbers";
import { countingStatus, countingStatuses, requiredNumberOfCandidates, teams } from "../utility/config";
import "./index.scss";
const TeamDetails = ({ membersByRank = [] }) => {
  const selected = countingStatus === countingStatuses.STARTED || countingStatus === countingStatuses.FINAL_ROUND || countingStatus === countingStatuses.ENDED ? membersByRank.slice(0, requiredNumberOfCandidates) : membersByRank;
  const getTeamCount = (team) => {
    return selected.filter((member) => member.team === team).length;
  };
  return (
    <div className="team-details">
      {teams.map(team => {
        if (!team.show) return null;
        return (
          <div className="team-container" key={team.key}>
            <div className={`team ${team.key}`}>
              <FlipNumbers
                height={14}
                width={10}
                play
                perspective={100}
                duration={1}
                numbers={getTeamCount(team.key) + ""}
              />
            </div>
            {team.title}
          </div>
        )
      })}
    </div>
  );
};
export default TeamDetails;
