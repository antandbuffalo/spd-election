import { useState } from "react";
import { generateFestivalAnalytics } from "../../service/api";
import { APP_ROUTES } from "../../utility/constants";
import "./Dashboard.scss";
const Dashboard = () => {
  const [isGenerating, setIsGenerating] = useState(false);

  const festivalAnalytics = async () => {
    console.log("Generating festival analytics");
    setIsGenerating(true);
    await generateFestivalAnalytics();
    setIsGenerating(false);
  };
  return (
    <div className="dashboard">
      <h2 className="title">Dashboard</h2>
      <a href={APP_ROUTES.home}>Home</a>
      <a href={APP_ROUTES.reviewList}>Review List</a>
      <a href={APP_ROUTES.hostAnalytics}>Hostname Analytics</a>
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
