import { useState } from "react";
import { login } from "../service/api";
import "./index.scss";
import { useNavigate } from "react-router-dom";
import { APP_ROUTES } from "../utility/constants";
const Admin = () => {
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const onClickSubmit = () => {
    login(password).then((response) => {
      if (response?.status === "success") {
        localStorage.setItem("token", response?.token);
        navigate(APP_ROUTES["review-list"]);
      }
    });
  };
  const onChangeText = (event) => {
    setPassword(event.target.value);
  };

  const onClickLogout = () => {
    localStorage.removeItem("token");
  };

  return (
    <div className="admin">
      <h1>Admin</h1>
      <div className="password">
        <input
          type="text"
          placeholder="Enter Admin Password"
          value={password}
          onChange={onChangeText}
        />
      </div>
      <br />
      <div className="submit">
        <button onClick={onClickSubmit}>Submit</button>
      </div>
      <br />
      <br />
      <div className="submit logout">
        <button onClick={onClickLogout}>Logout</button>
      </div>
    </div>
  );
};

export default Admin;
