import { NavLink } from "react-router-dom";

export default function Header() {
  return (
    <header className="header-container">
      <div className="header-wrapper">
        <NavLink to="/landing-page" className="header-link">
          Fitness Tracker
        </NavLink>

        <NavLink to="/login" className="header-link">
          Login
        </NavLink>
      </div>
    </header>
  );
}
