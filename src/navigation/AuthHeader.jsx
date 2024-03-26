import { NavLink } from "react-router-dom";
import { useAuthInfo } from "../context/AuthContext";

export default function AuthHeader() {
  const { logout, isLoggedIn } = useAuthInfo();

  return (
    <div className="header-container">
      <div className="header-wrapper">
        <NavLink to="/landing-page" className="header-link">
          Fitness Tracker
        </NavLink>

        {isLoggedIn ? (
          <div />
        ) : (
          <NavLink to="/login" className="header-link">
            Login
          </NavLink>
        )}

        <NavLink to="/my-workouts" className="header-link">
          my workouts
        </NavLink>

        <NavLink to="/add-workout" className="header-link">
          + workout
        </NavLink>

        <NavLink to="/add-gym" className="header-link">
          + gym
        </NavLink>

        <NavLink to="/add-exercise" className="header-link">
          + exercise
        </NavLink>

        <NavLink to="/add-user" className="header-link">
          + user
        </NavLink>

        <button onClick={logout} className="header-link">
          Log out
        </button>
      </div>
    </div>
  );
}
