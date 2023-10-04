import { Routes, Route } from "react-router-dom";
import App from "../App";
import Review from "../Review";
import ReviewList from "../ReviewList";
import { APP_ROUTES } from "../utility/constants";
import Admin from "../Admin";

const AppRoutes = () => {
  return (
    <div>
      <Routes>
        <Route path={APP_ROUTES.home} element={<App />} />
        <Route path={APP_ROUTES.review} element={<Review />} />
        <Route path={APP_ROUTES["review-list"]} element={<ReviewList />} />
        <Route path={APP_ROUTES.admin} element={<Admin />} />
      </Routes>
    </div>
  );
};

export default AppRoutes;
