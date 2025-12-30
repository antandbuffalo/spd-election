import { useEffect } from "react";
import "./index.scss";
import { useNavigate } from "react-router-dom";
import { APP_ROUTES } from "../../utility/constants";
import { useAuth } from "../../firebase/AuthContext";

const Login = () => {
  const navigate = useNavigate();
  const { user, signInWithGoogle, signOut } = useAuth();

  useEffect(() => {
    if (user) {
      navigate(APP_ROUTES.admin);
    }
  }, [user, navigate]);

  const onClickGoogleLogin = async () => {
    try {
      await signInWithGoogle();
      navigate(APP_ROUTES.admin);
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  const onClickLogout = async () => {
    try {
      await signOut();
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <div className="login">
      <h1>Login</h1>
      {user ? (
        <div className="user-info">
          <img
            src={user.photoURL || "/icons/IconUserGreen.svg"}
            alt={user.displayName}
            className="user-avatar"
          />
          <p className="user-name">{user.displayName}</p>
          <p className="user-email">{user.email}</p>
          <div className="submit logout">
            <button onClick={onClickLogout}>Logout</button>
          </div>
        </div>
      ) : (
        <div className="submit google-login">
          <button onClick={onClickGoogleLogin}>
            <img src="/icons/google-icon.svg" alt="Google" className="google-icon" />
            Sign in with Google
          </button>
        </div>
      )}
    </div>
  );
};

export default Login;
