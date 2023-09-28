import { useEffect, useState } from "react";
import "./App.scss";
import Home from "./Home";
import { isCountingStarted, startTime } from "./utility/config";
import { convertMillisecondsToTime } from "./utility/util";

function App() {
  const [time, setTime] = useState("");
  const [showCountDown, setShowCountDown] = useState(false);
  const [nameColor, setNameColor] = useState({ color: "#52ff7d" });
  const [totalVotes, setTotalVotes] = useState(0);
  const [countedVotes, setCountedVotes] = useState(0);

  const calculateTime = () => {
    const diff = startTime - new Date().getTime();
    if (diff > 0) {
      setShowCountDown(true);
      setTime(convertMillisecondsToTime(diff));
      return false;
    } else {
      setShowCountDown(false);
      return true;
    }
  };

  useEffect(() => {
    calculateTime();
    const interval = setInterval(() => {
      const isClear = calculateTime();
      if (isClear) {
        clearInterval(interval);
      }
    }, 1000);

    const colorInterval = setInterval(() => {
      const red = Math.floor(Math.random() * 255);
      const green = Math.floor(Math.random() * 255);
      const blue = Math.floor(Math.random() * 255);
      // setNameColor({color: `rgb(${red}, ${green}, ${blue})`});
    }, 1000);

    return () => {
      clearInterval(interval);
      clearInterval(colorInterval);
    };
  }, []);

  const getApiResponse = (response) => {
    setTotalVotes(response?.totalVotes);
    setCountedVotes(response?.countedVotes);
  };

  const getPercentage = (countedVotes, totalVotes) => {
    try {
      const percentage = countedVotes / totalVotes;
      if(isNaN(percentage)) {
        return 0;
      }
      return ((countedVotes / totalVotes) * 100).toFixed(2);
    } catch (e) {
      console.log("error calculating percentage", e);
      return 0;
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <div>சு பெ தேவஸ்தானம் தேர்தல் முடிவுகள் 2023</div>
        {showCountDown && (
          <div className="timer">
            <span>இன்னும்</span>
            <span>{time}</span>
            <span>மணித்துளிகளில்</span>
          </div>
        )}
        {isCountingStarted && (
          <div className="vote-details">
            <div>பதிவான வாக்குகள்: {totalVotes}</div>
            <div>எண்ணப்பட்ட வாக்குகள்: {countedVotes}</div>
            <div>சதவிகிதம்: {getPercentage(countedVotes, totalVotes)}</div>
          </div>
        )}
      </header>
      <Home sendApiResponse={getApiResponse} />
      <footer>
        <div className="footer" style={nameColor}>
          Developed by Jeyabalaji
        </div>
      </footer>
    </div>
  );
}

export default App;
