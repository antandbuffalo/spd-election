import { useEffect, useState } from "react";
import { getViewCount } from "../service/api";
import "./index.scss";
import FlipNumbers from "react-flip-numbers";
import { API_STATUS, viewCountApiInterval } from "../utility/constants";

const ViewCount = ({ sendViewCount = () => { } }) => {
  const [viewCount, setViewCount] = useState(0);
  const [totalUserCount, setTotalUserCount] = useState(0);

  const getData = async () => {
    const data = await getViewCount();
    if (!data) {
      return;
    }
    sendViewCount(data);
    setViewCount(data?.viewCount);
    setTotalUserCount(data?.uniqueUserCount);
  };

  useEffect(() => {
    getData();

    let timer = null;
    const fetchAndSchedule = async () => {
      await getData();
      timer = setTimeout(fetchAndSchedule, viewCountApiInterval);
    }
    timer = setTimeout(fetchAndSchedule, viewCountApiInterval);

    return () => {
      clearTimeout(timer);
    };
  }, []);
  return (
    <div className="view-count-container">
      <div>
        தற்போதைய பார்வையாளர்கள்:
        <FlipNumbers
          height={16}
          width={12}
          color="#ffc027"
          background="#282c34"
          play
          perspective={100}
          duration={3}
          numbers={viewCount + ""}
        />
      </div>
      <div>
        மொத்த பார்வையாளர்கள்:
        <FlipNumbers
          height={16}
          width={12}
          color="#ffc027"
          background="#282c34"
          play
          perspective={100}
          duration={3}
          numbers={totalUserCount + ""}
        />
      </div>
    </div>
  );
};
export default ViewCount;
