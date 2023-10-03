import { useEffect, useState } from "react";
import IconClose from "../Icons/IconClose";
import "./index.scss";
import { API_STATUS, REVIEW_MOOD } from "../utility/constants";
import { getUUID, validateReviewRequest } from "../utility/util";
import { submitReview } from "../service/api";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import Spinner from "../Spinner";
const Review = () => {
  const [reviewMood, setReviewMood] = useState(REVIEW_MOOD.GOOD);
  const [reviewComment, setReviewComment] = useState("");
  const [name, setName] = useState("");
  const navigate = useNavigate();
  const [addReviewApiStatus, setAddReviewApiStatus] = useState(
    API_STATUS.NOT_STARTED
  );
  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const pageName = query.get('pageName');

  useEffect(() => {
    const htmlElement = document.querySelector("html");
    htmlElement.style.overflow = "hidden";

    return () => {
      const htmlElement = document.querySelector("html");
      htmlElement.style.overflow = "";
    };
  }, []);

  /**
   * @param {Event} event
   */
  const onReviewMoodChange = (event) => {
    if (event.target.checked) {
      setReviewMood(event.target.id);
    } else {
      setReviewMood("");
    }
  };
  const onClickSubmitReview = () => {
    const review = {
      mood: reviewMood?.trim(),
      comment: reviewComment?.trim(),
      name: name?.trim(),
      id: getUUID(),
    };
    if (!validateReviewRequest(review)) {
      return;
    }

    setAddReviewApiStatus(API_STATUS.IN_PROGRESS);
    submitReview(review).then((response) => {
      setAddReviewApiStatus(API_STATUS.SUCCESS);
      if (response?.status === "success") {
        // localStorage.setItem("reviewed", true);
        alert("கருத்துக்களை பகிர்ந்தமைக்கு நன்றி");
        onClickClose();
        return;
      }
      alert("திரும்ப முயற்சிக்கவும்");
    });
  };

  const onChangeComment = (event) => {
    setReviewComment(event.target.value);
  };
  const onChangeName = (event) => {
    setName(event.target.value);
  };

  const onClickClose = () => {
    sessionStorage.setItem("reviewClosed", true);
    if (!pageName) {
      navigate(-1);
    } else if (pageName === "home") {
      navigate("/");
    }
  };
  return (
    <div className="review">
      <div className="btn-close-container">
        <button onClick={onClickClose}>
          <IconClose />
        </button>
      </div>

      <div className="heading">
        இந்த வலைத்தளத்தை மேம்படுத்த, உங்கள் கருத்துக்களை பகிரவும்
      </div>
      <br />
      <br />
      <div className="content">
        <div className="good">
          <div>
            <input
              id={REVIEW_MOOD.GOOD}
              type="checkbox"
              checked={reviewMood === REVIEW_MOOD.GOOD}
              onChange={onReviewMoodChange}
            />
          </div>

          <label htmlFor={REVIEW_MOOD.GOOD}>
            இந்த வலைத்தளம் மிகவும் உபயோகமாக இருந்தது. இந்த சேவையை தொடரவும்
          </label>
        </div>
        <br />
        <br />
        <div className="bad">
          <input
            id={REVIEW_MOOD.BAD}
            type="checkbox"
            value="bad"
            checked={reviewMood === REVIEW_MOOD.BAD}
            onChange={onReviewMoodChange}
          />
          <label htmlFor={REVIEW_MOOD.BAD}>தொடர வேண்டாம்</label>
        </div>
        <br />
        <br />
        <div className="others">
          <label htmlFor="text">
            மேலும் உங்கள் கருத்துக்களை இங்கே பதிவிடவும்
          </label>
          <textarea
            rows={8}
            id="text"
            value={reviewComment}
            onChange={onChangeComment}
          ></textarea>
        </div>
        <br />
        <div className="your-name">
          <label htmlFor="name">
            உங்களுடைய பெயர் (விருப்பமிருந்தால் பகிரவும்)
          </label>
          <div>
            <input type="text" id="name" value={name} onChange={onChangeName} />
          </div>
        </div>
        <br />
        <br />
        {addReviewApiStatus === API_STATUS.IN_PROGRESS && (
          <div className="spinner-container">
            <Spinner />
          </div>
        )}
        {addReviewApiStatus !== API_STATUS.IN_PROGRESS && (
          <button
            className="submit"
            onClick={onClickSubmitReview}
            disabled={addReviewApiStatus === API_STATUS.IN_PROGRESS}
          >
            அனுப்புக
          </button>
        )}
      </div>
      <br />
      <br />
    </div>
  );
};

export default Review;
