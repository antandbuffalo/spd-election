import { useEffect, useState } from "react";
import { deleteReview, getReviewList } from "../service/api";
import "./index.scss";
import { APP_ROUTES, REVIEW_MOOD } from "../utility/constants";
import { useNavigate } from "react-router-dom";
import IconClose from "../Icons/IconClose";
import IconEye from "../Icons/IconEye";
import ViewCount from "../ViewCount";
import FlipNumbers from "react-flip-numbers";
import MyName from "../MyName";
import { isAdmin } from "../utility/util";

const ReviewList = () => {
  const [reviews, setReviews] = useState([]);
  const [viewCount, setViewCount] = useState(0);
  const [goodCount, setGoodCount] = useState(0);
  const [badCount, setBadCount] = useState(0);

  const navigate = useNavigate();
  useEffect(() => {
    getReviewList().then((data) => {
      console.log(data);
      setReviews(data);
      let tempGoodCount = 0,
        tempBadCount = 0;
      data.forEach((item) => {
        item.mood === REVIEW_MOOD.GOOD ? tempGoodCount++ : tempBadCount++;
      });
      setGoodCount(tempGoodCount);
      setBadCount(tempBadCount);
    });
  }, []);

  const getDateTime = (data) => {
    return `${new Date(data.createdAt).toLocaleDateString()}, ${new Date(
      data.createdAt
    ).toLocaleTimeString()}`;
  };

  const onClickDeleteReview = (data) => {
    deleteReview({ id: data.id, token: localStorage.getItem("token") }).then(
      (response) => {
        if (response?.status === "success") {
          setReviews(reviews.filter((item) => item.id !== data.id));
        }
      }
    );
  };

  const getReviewCard = (data) => {
    if (!data || !data.comment) {
      return null;
    }
    return (
      <div className={`review-card ${data.mood.toLowerCase()}`}>
        <div className="comment">{data.comment}</div>
        <div className="name">- {data.name}</div>
        <div className="created-at">{getDateTime(data)}</div>
        {isAdmin() && (
          <div className="delete">
            <button onClick={() => onClickDeleteReview(data)}>Delete</button>
          </div>
        )}
      </div>
    );
  };

  const addReview = () => {
    navigate("/review?pageName=review-list");
  };
  const onClickClose = () => {
    navigate(APP_ROUTES.home);
  };
  const viewCountResponse = (response) => {
    setViewCount(response.viewCount);
  };
  return (
    <div className="reviews">
      <header className="App-header">
        <div className="view-count">
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
        <div>கருத்துக்கள்</div>
        <div className="btn-close" onClick={onClickClose}>
          <IconClose />
        </div>
      </header>
      <div className="review-btn-container">
        <button className="review-button" onClick={addReview}>
          கருத்து சேர்க்க
        </button>
        <div className="mood-count">
          <div className="good">
            தொடரவும்:
            <FlipNumbers
              height={14}
              width={10}
              play
              perspective={100}
              duration={1}
              numbers={goodCount + ""}
            />
          </div>
          <div className="bad">
            தொடர வேண்டாம்:
            <FlipNumbers
              height={14}
              width={10}
              play
              perspective={100}
              duration={1}
              numbers={badCount + ""}
            />
          </div>
        </div>
      </div>
      <div className="reviews-container">
        {reviews.map((item) => {
          return getReviewCard(item);
        })}
      </div>
      <ViewCount sendViewCount={viewCountResponse} />
      <MyName />
    </div>
  );
};
export default ReviewList;
