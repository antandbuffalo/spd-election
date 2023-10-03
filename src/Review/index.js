import { useEffect, useState } from "react";
import IconClose from "../Icons/IconClose";
import "./index.scss";
import { REVIEW_MOOD } from "../utility/constants";
import { getUUID } from "../utility/util";
import { submitReview } from "../service/api";
const Review = ({ onClickClose }) => {
  const [reviewMood, setReviewMood] = useState(REVIEW_MOOD.GOOD);
  const [reviewComment, setReviewComment] = useState("");
  const [name, setName] = useState("");

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
      mood: reviewMood,
      comment: reviewComment,
      name: name,
      id: getUUID(),
    };
    console.log(review);
    submitReview(review).then((response) => {
      console.log(response);
      if (response?.status === "success") {
        localStorage.setItem("reviewed", true);
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

        <button className="submit" onClick={onClickSubmitReview}>
          அனுப்புக
        </button>
      </div>
      <br />
      <br />
    </div>
  );
};

export default Review;
