import FlipNumbers from "react-flip-numbers";
import { showStatus } from "../utility/config";
import "./index.scss";
const TeamDetails = ({ membersByRank = [] }) => {
  const topFive = membersByRank.slice(0, 5);
  const getTeamCount = (team) => {
    if (!showStatus) return "";
    return topFive.filter((member) => member.team === team).length;
  };
  return (
    <div className="team-details">
      <div className="team-container">
        <div className="team A">
          <FlipNumbers
            height={14}
            width={10}
            play
            perspective={100}
            duration={1}
            numbers={getTeamCount("A") + ""}
          />
          {/* {getTeamCount("A")} */}
        </div>மக்கள் அணி கூட்டணி
      </div>
      <div className="team-container">
        <div className="team B">
          <FlipNumbers
            height={14}
            width={10}
            play
            perspective={100}
            duration={1}
            numbers={getTeamCount("B") + ""}
          />

        </div>சமூக முன்னேற்ற அணி
      </div>
      <div className="team-container">
        <div className="team C">
          <FlipNumbers
            height={14}
            width={10}
            play
            perspective={100}
            duration={1}
            numbers={getTeamCount("C") + ""}
          />
        </div>இளைஞர் நலச்சங்கம்
      </div>
      <div className="team-container">
        <div className="team D">
          <FlipNumbers
            height={14}
            width={10}
            play
            perspective={100}
            duration={1}
            numbers={getTeamCount("D") + ""}
          />

        </div>சுயேட்சை
      </div>
    </div>
  );
};
export default TeamDetails;
