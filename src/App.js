import { useEffect, useState } from "react";
import "./App.scss";
import Home from "./Home";
import { startTime } from "./utility/config";
import { convertMillisecondsToTime } from "./utility/util";

function App() {
  const [time, setTime] = useState("");
  const [showCountDown, setShowCountDown] = useState(false);
  const [nameColor, setNameColor] = useState({ color: "#aaa" });

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
      const hue = Math.floor(Math.random() * 255);
    }, 10000);

    return () => {
      clearInterval(interval);
      clearInterval(colorInterval);
    };
  }, []);

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
      </header>
      <Home />
      <footer>
        <div className="footer" style={nameColor}>
          Developed by Jeyabalaji
        </div>
      </footer>
    </div>
  );
}

export default App;
