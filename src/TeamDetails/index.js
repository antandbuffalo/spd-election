import FlipNumbers from "react-flip-numbers";
import { showStatus, teams } from "../utility/config";
import "./index.scss";
const TeamDetails = ({ membersByRank = [] }) => {
  const topFive = membersByRank.slice(0, 5);
  const getTeamCount = (team) => {
    if (!showStatus) return "";
    return topFive.filter((member) => member.team === team).length;
  };
  return (
    <div className="team-details">
      {teams.map(team => {
        if (!team.show) return null;
        return (
          <div className="team-container">
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
