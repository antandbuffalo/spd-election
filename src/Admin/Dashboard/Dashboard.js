import { APP_ROUTES } from "../../utility/constants";
import "./Dashboard.scss";
const Dashboard = () => {
  return (
    <div className="dashboard">
      <h2 className="title">Dashboard</h2>
      <a href={APP_ROUTES.home}>Home</a>
      <a href={APP_ROUTES.reviewList}>Review List</a>
      <a href={APP_ROUTES.hostAnalytics}>Hostname Analytics</a>
    </div>
  );
};

export default Dashboard;
