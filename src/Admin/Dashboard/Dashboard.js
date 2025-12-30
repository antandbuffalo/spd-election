import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { generateFestivalAnalytics } from "../../service/api";
import { APP_ROUTES } from "../../utility/constants";
import { useAuth } from "../../firebase/AuthContext";
import "./Dashboard.scss";
const Dashboard = () => {
  const navigate = useNavigate();
  const { signOut } = useAuth();
  const [isGenerating, setIsGenerating] = useState(false);

  const festivalAnalytics = async () => {
    console.log("Generating festival analytics");
    setIsGenerating(true);
    await generateFestivalAnalytics();
    setIsGenerating(false);
  };

  const onLogout = async () => {
    try {
      await signOut();
      navigate(APP_ROUTES.login);
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };
  return (
    <div className="dashboard">
      <div className="dashboard__header">
        <h2 className="title">Dashboard</h2>
        <button onClick={onLogout} className="logout-btn">
          Logout
        </button>
      </div>
      <div className="dashboard__links">
        <a href={APP_ROUTES.home}>Home</a>
        <a href={APP_ROUTES.reviewList}>Review List</a>
        <a href={APP_ROUTES.hostAnalytics}>Hostname Analytics</a>
      </div>
      <button
        onClick={festivalAnalytics}
        className="festival-analytics-btn"
        disabled={isGenerating}
      >
        {isGenerating ? "Generating..." : "Generate Festival Analytics"}
      </button>
    </div>
  );
};

export default Dashboard;
