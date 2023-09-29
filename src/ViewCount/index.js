import { useEffect, useState } from "react";
import { getViewCount } from "../service/api";
import "./index.scss";
import FlipNumbers from "react-flip-numbers";

const ViewCount = () => {
  const [viewCount, setViewCount] = useState(0);
  const getData = () => {
    getViewCount().then((data) => {
      if (!data) {
        return;
      }
      setViewCount(data?.viewCount);
    });
  };
  useEffect(() => {
    getData();
    // invoke the startTimer function and destory the interval
    const interval = setInterval(() => {
      getData();
    }, 10000);
    return () => {
      clearInterval(interval);
    };
  }, []);
  return (
    <div className="view-count-container">
      தற்போதைய பார்வையாளர்கள்:
      <FlipNumbers
        height={16}
        width={16}
        color="#ffc027"
        background="#282c34"
        play
        perspective={100}
        duration={1}
        numbers={viewCount + ""}
      />
    </div>
  );
};
export default ViewCount;
