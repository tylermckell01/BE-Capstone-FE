import { useState } from "react";
import { useAuthInfo } from "../context/AuthContext";
import Cookies from "js-cookie";

export default function LoginForm() {
  const { isLoggedIn, setIsLoggedIn, setGetAuthToken } = useAuthInfo();

  const [loginCreds, setLoginCreds] = useState({
    email: "",
    password: "",
  });

  const handleFieldUpdate = (e) => {
    const { name, value } = e.target;

    setLoginCreds((previous) => ({ ...previous, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await fetch("http://127.0.0.1:8086/user/auth", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(loginCreds),
    })
      .then((res) => res.json())
      .then((data) => data);

    console.log("res: ", response);

    if (response) {
      setIsLoggedIn(true);
      console.log("authentication successful");
      Cookies.set("auth_token", response.auth_info.auth_token);
      return response;
    } else {
      console.error("authentication failed");
    }
  };

  return (
    <div className="login-form-wrapper">
      login form
      <form onSubmit={handleSubmit}>
        <div className="email-wrapper">
          <label htmlFor="email">Email</label>
          <input
            id="email"
            name="email"
            value={loginCreds.email}
            type="text"
            className="email-field"
            onChange={handleFieldUpdate}
          />
        </div>
        <div className="password-wrapper">
          <label htmlFor="password">Password</label>
          <input
            id="password"
            name="password"
            value={loginCreds.password}
            type="password"
            className="password-field"
            onChange={handleFieldUpdate}
          />
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}
