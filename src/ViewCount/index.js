import { useViewCount } from "../service/api";
import "./index.scss";
import FlipNumbers from "react-flip-numbers";

const ViewCount = () => {
  const { data } = useViewCount();

  const viewCount = data?.liveCount || 0;
  const totalUserCount = data?.uniqueUserCount || 0;

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
