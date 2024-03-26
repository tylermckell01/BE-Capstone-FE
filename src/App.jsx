import "./styles/App.scss";
import { Switch, Route } from "react-router-dom";

import Header from "./navigation/Header";
import AuthHeader from "./navigation/AuthHeader";
import Footer from "./navigation/Footer";
import DefaultContainer from "./routing/DefaultContainer";
import LandingPage from "./pages/LandingPage";
import { useAuthInfo } from "./context/AuthContext";

function App() {
  const { isLoggedIn } = useAuthInfo();

  return (
    <div className="App">
      {isLoggedIn ? <AuthHeader /> : <Header />}

      <Switch>
        <Route component={DefaultContainer} />
        <Route exact path="/" component={LandingPage} />
      </Switch>

      <Footer />
    </div>
  );
}

export default App;
