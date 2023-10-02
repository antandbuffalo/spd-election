import { useEffect, useMemo, useState } from "react";
import "./App.scss";
import Home from "./Home";
import { isCountingStarted, startTime } from "./utility/config";
import { convertMillisecondsToTime } from "./utility/util";
import ViewCount from "./ViewCount";
import FlipNumbers from "react-flip-numbers";
import IconEye from "./Icons/IconEye";

function App() {
  const [time, setTime] = useState("");
  const [showCountDown, setShowCountDown] = useState(false);
  const [nameColor, setNameColor] = useState({ color: "#52ff7d" });
  const [totalVotes, setTotalVotes] = useState(0);
  const [countedVotes, setCountedVotes] = useState(0);
  const [viewCount, setViewCount] = useState(0);

  const isMobile = useMemo(() => {
    return window.innerWidth < 900;
  }, [window.innerWidth]);

  const numberWidth = useMemo(() => {
    return window.innerWidth > 900 ? 14 : 10;
  }, [window.innerWidth]);

  const numberHeight = useMemo(() => {
    return window.innerWidth > 900 ? 18 : 14;
  }, [window.innerWidth]);

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
      if (isMobile) {
        setNameColor({ color: `rgb(${red}, ${green}, ${blue})` });
      }
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
      if (isNaN(percentage)) {
        return 0;
      }
      return ((countedVotes / totalVotes) * 100).toFixed(2);
    } catch (e) {
      console.log("error calculating percentage", e);
      return 0;
    }
  };

  const viewCountResponse = (data) => {
    if (!data) {
      return;
    }
    setViewCount(data?.viewCount);
  };

  return (
    <div className="App">
      <header className="App-header">
        <div>சு பெ தேவஸ்தானம் தேர்தல் முடிவுகள் 2023</div>
        {showCountDown && (
          <div className="timer">
            <span>இன்னும்</span>
            <FlipNumbers
              height={20}
              width={18}
              numbers={time}
              perspective={100}
              play
              duration={1}
            />
            {/* <span>{time}</span> */}
            <span>மணித்துளிகளில்</span>
          </div>
        )}
        {isCountingStarted && (
          <div className="vote-details">
            <div>
              பதிவான வாக்குகள்:
              <FlipNumbers
                height={numberHeight}
                width={numberWidth}
                play
                perspective={100}
                duration={1}
                numbers={totalVotes + ""}
              />
            </div>
            <div>
              எண்ணப்பட்ட வாக்குகள்:
              <FlipNumbers
                height={numberHeight}
                width={numberWidth}
                play
                perspective={100}
                duration={1}
                numbers={countedVotes + ""}
              />
            </div>
            <div>
              சதவிகிதம்:
              <FlipNumbers
                height={numberHeight}
                width={numberWidth}
                play
                perspective={100}
                duration={1}
                numbers={getPercentage(countedVotes, totalVotes)}
              />
            </div>
            <div className="live-count" style={{"display": "flex"}}>
              <IconEye />
              <FlipNumbers
                height={14}
                width={10}
                play
                perspective={100}
                duration={1}
                numbers={viewCount + ""}
              />
            </div>
          </div>
        )}
      </header>
      <Home sendApiResponse={getApiResponse} />
      <div className="view-count">
        <ViewCount sendViewCount={viewCountResponse} />
      </div>
      <footer>
        <div className="footer" style={nameColor}>
          Developed by Jeyabalaji
        </div>
        <div className="team">மக்கள் அணி கூட்டணி</div>
        <br />
      </footer>
    </div>
  );
}

export default App;
