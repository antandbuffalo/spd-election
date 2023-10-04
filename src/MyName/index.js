import { useEffect, useState } from "react";
import "./index.scss";

const MyName = () => {
  const [nameColor, setNameColor] = useState({ color: "#52ff7d" });

  useEffect(() => {
    const colorInterval = setInterval(() => {
      const red = Math.floor(Math.random() * 255);
      const green = Math.floor(Math.random() * 255);
      const blue = Math.floor(Math.random() * 255);

      setNameColor({ color: `rgb(${red}, ${green}, ${blue})` });
    }, 1000);

    return () => {
      clearInterval(colorInterval);
    };
  }, []);
  return (
    <div className="footer" style={nameColor}>
      Developed by Jeyabalaji
    </div>
  );
};

export default MyName;