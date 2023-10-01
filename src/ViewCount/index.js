import { useEffect, useState } from "react";
import { getViewCount } from "../service/api";
import "./index.scss";
import FlipNumbers from "react-flip-numbers";
import { API_STATUS } from "../utility/constants";

const ViewCount = ({ sendViewCount }) => {
  const [viewCount, setViewCount] = useState(0);
  const [viewCountApiStatus, setViewCountApiStatus] = useState(
    API_STATUS.NOT_STARTED
  );
  const getData = () => {
    setViewCountApiStatus(API_STATUS.IN_PROGRESS);
    getViewCount().then((data) => {
      setViewCountApiStatus(API_STATUS.SUCCESS);
      if (!data) {
        return;
      }
      sendViewCount(data);
      setViewCount(data?.viewCount);
    });
  };
  useEffect(() => {
    getData();
    // invoke the startTimer function and destory the interval
    const interval = setInterval(() => {
      if (viewCountApiStatus !== API_STATUS.IN_PROGRESS) {
        getData();
      }
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
        width={12}
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
