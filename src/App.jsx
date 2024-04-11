import "./styles/App.scss";
import { Switch, Route } from "react-router-dom";

import Header from "./navigation/Header";
import AuthHeader from "./navigation/AuthHeader";
import Footer from "./navigation/Footer";
import DefaultContainer from "./routing/DefaultContainer";
import LandingPage from "./pages/LandingPage";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";
// import { useAuthInfo } from "./context/AuthContext";

function App() {
  // const { isLoggedIn } = useAuthInfo();
  // const [authToken, setAuthToken] = useState(null);
  const authToken = Cookies.get("auth_token");
  console.log(authToken);

  // useEffect(() => {
  //   const token = Cookies.get("auth_token");
  //   setAuthToken(token);
  // }, []);

  return (
    <div className="App">
      {authToken ? <AuthHeader /> : <Header />}

      <Switch>
        <Route component={DefaultContainer} />
        <Route exact path="/" component={LandingPage} />
      </Switch>

      <Footer />
    </div>
  );
}

export default App;
