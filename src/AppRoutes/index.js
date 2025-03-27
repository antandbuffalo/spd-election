import { Routes, Route } from "react-router-dom";
import App from "../App";
import Review from "../Review";
import ReviewList from "../ReviewList";
import { APP_ROUTES } from "../utility/constants";
import Login from "../Admin/Login";
import Disclaimer from "../Disclaimer";
import ContactUs from "../ContactUs";
import HostAnalytics from "../HostAnalytics/HostAnalytics";
import Dashboard from "../Admin/Dashboard/Dashboard";

const AppRoutes = () => {
  return (
    <div>
      <Routes>
        <Route path={APP_ROUTES.home} element={<App />} />
        <Route path={APP_ROUTES.review} element={<Review />} />
        <Route path={APP_ROUTES.reviewList} element={<ReviewList />} />
        <Route path={APP_ROUTES.admin} element={<Dashboard />} />
        <Route path={APP_ROUTES.login} element={<Login />} />
        <Route path={APP_ROUTES.disclaimer} element={<Disclaimer />} />
        <Route path={APP_ROUTES.contactUs} element={<ContactUs />} />
        <Route path={APP_ROUTES.hostAnalytics} element={<HostAnalytics />} />
      </Routes>
    </div>
  );
};

export default AppRoutes;
