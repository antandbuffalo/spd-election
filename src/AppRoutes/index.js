import { Routes, Route, useNavigate } from "react-router-dom";
import App from "../App";
import Review from "../Review";
import { showReviewCloseConfirmation } from "../utility/util";
import ReviewList from "../ReviewList";

const AppRoutes = () => {
  const navigate = useNavigate();
  const onClickReviewClose = () => {
    if (showReviewCloseConfirmation()) {
      navigate("/");
    }
  };
  return (
    <div>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/review" element={<Review />} />
        <Route path="/review-list" element={<ReviewList />} />
      </Routes>
    </div>
  );
};

export default AppRoutes;
