import { Routes, Route } from "react-router-dom";
import App from "../App";
import Review from "../Review";
import ReviewList from "../ReviewList";
import { APP_ROUTES } from "../utility/constants";
import Admin from "../Admin";
import Disclaimer from "../Disclaimer";
import ContactUs from "../ContactUs";

const AppRoutes = () => {
  return (
    <div>
      <Routes>
        <Route path={APP_ROUTES.home} element={<App />} />
        <Route path={APP_ROUTES.review} element={<Review />} />
        <Route path={APP_ROUTES.reviewList} element={<ReviewList />} />
        <Route path={APP_ROUTES.admin} element={<Admin />} />
        <Route path={APP_ROUTES.disclaimer} element={<Disclaimer />} />
        <Route path={APP_ROUTES.contactUs} element={<ContactUs />} />
      </Routes>
    </div>
  );
};

export default AppRoutes;
