import { NavLink } from "react-router-dom";
// import { useAuthInfo } from "../context/AuthContext";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import Cookies from "js-cookie";

export default function AuthHeader() {
  const history = useHistory();
  // const authToken = Cookies.get("auth_token");
  // const { logout, isLoggedIn } = useAuthInfo();

  const handleLogout = () => {
    // logout();
    Cookies.remove("auth_token");
    history.push("/");
  };

  return (
    <div className="header-container">
      <div className="header-wrapper">
        <NavLink to="/landing-page" className="header-link">
          Fitness Tracker
        </NavLink>

        {/* {!authToken && (
          <NavLink to="/login" className="header-link">
            Login
          </NavLink>
        )} */}

        <NavLink to="/my-workouts" className="header-link">
          my workouts
        </NavLink>

        <NavLink to="/add-workout" className="header-link">
          + workout
        </NavLink>

        <NavLink to="/add-gym" className="header-link">
          gyms
        </NavLink>

        <NavLink to="/add-exercise" className="header-link">
          exercises
        </NavLink>

        <NavLink to="/add-user" className="header-link">
          users
        </NavLink>

        <button onClick={handleLogout} className="header-link">
          Log out
        </button>
      </div>
    </div>
  );
}
