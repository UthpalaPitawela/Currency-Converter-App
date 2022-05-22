import "./App.css";
import React, { useState } from "react";

import { getFromCache } from "./utils/cache";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ValidUser } from "./constants/constants";

import LoginComponent from "./components/login/LoginComponent";
import DashboardComponent from "./components/dashboard/DashboardComponent";
import Protected from "./components/router/ProtectedCompotent";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(getFromCache(ValidUser.EMAIL));
  const passIsLoggedIn = (isLogged) => {
    if (isLogged) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  };

  return (
    <div className="App">
      <React.Fragment>
        <Router>
          <Routes>
            <Route
              path="/"
              element={<LoginComponent passIsLoggedIn={passIsLoggedIn} />}
            />
            <Route
              path="/dashboard"
              element={
                <Protected isLoggedIn={isLoggedIn}>
                  <DashboardComponent isLoggedIn={isLoggedIn} />
                </Protected>
              }
            />
          </Routes>
        </Router>
      </React.Fragment>
    </div>
  );
}

export default App;
