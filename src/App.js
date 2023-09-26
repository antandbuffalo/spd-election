import { useEffect, useState } from "react";
import "./App.scss";
import Home from "./Home";
import { startTime } from "./utility/config";
import { convertMillisecondsToTime } from "./utility/util";

function App() {
  const [time, setTime] = useState("");
  const [showCountDown, setShowCountDown] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      const diff = startTime - new Date().getTime();
      if (diff > 0) {
        setShowCountDown(true);
        setTime(convertMillisecondsToTime(diff));
      } else {
        setShowCountDown(false);
        clearInterval(interval);
      }
    }, 1000);
    return () => clearInterval(interval);
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
        <div className="footer">Brought to you by Jeyabalaji</div>
      </footer>
    </div>
  );
}

export default App;
