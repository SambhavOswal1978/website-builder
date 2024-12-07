import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginModule from "./Pages/LoginPage/LoginModule";
import MainApp from "./Pages/HomePage/MainApp";
import WebsiteBuilder from "./Pages/WebsiteBuilderPage/WebsiteBuilder";

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState("");

  const handleLogin = (username) => {
    setIsLoggedIn(true);
    setUsername(username);
  };

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            isLoggedIn ? (
              <MainApp username={username} />
            ) : (
              <LoginModule onLogin={handleLogin} />
            )
          }
        />
        <Route path="/website-builder" element={<WebsiteBuilder />} />
      </Routes>
    </Router>
  );
};

export default App;
