import { showStatus } from "../utility/config";
import "./index.scss";
const TeamDetails = ({ membersByRank = [] }) => {
  const topFive = membersByRank.slice(0, 5);
  const getTeamCount = (team) => {
    if(!showStatus) return "";
    return topFive.filter((member) => member.team === team).length;
  };
  return (
    <div className="team-details">
      <div className="team-container">
        <div className="team A">{getTeamCount("A")}</div>மக்கள் அணி கூட்டணி
      </div>
      <div className="team-container">
        <div className="team B">{getTeamCount("B")}</div>சமூக முன்னேற்ற அணி
      </div>
      <div className="team-container">
        <div className="team C">{getTeamCount("C")}</div>இளைஞர் நலச்சங்கம்
      </div>
      <div className="team-container">
        <div className="team D">{getTeamCount("D")}</div>சுயேட்சை
      </div>
    </div>
  );
};
export default TeamDetails;
