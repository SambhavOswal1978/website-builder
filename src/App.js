import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginModule from "./Pages/LoginPage/LoginModule";
import MainApp from "./Pages/HomePage/MainApp";
import WebsiteBuilder from "./Pages/WebsiteBuilderPage/WebsiteBuilder";
import TemplatesPage from "./Pages/Templates/TemplatesPage.js";

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState("");
  const [selectedTemplate, setSelectedTemplate] = useState(null);

  const handleLogin = (username) => {
    setIsLoggedIn(true);
    setUsername(username);
  };

  const handleTemplateSelection = (templateData) => {
    setSelectedTemplate(templateData);
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
        <Route
          path="/websitebuilder"
          element={<WebsiteBuilder templateData={selectedTemplate} />}
        />
        <Route
          path="/templates"
          element={<TemplatesPage onTemplateSelect={handleTemplateSelection} />}
        />
      </Routes>
    </Router>
  );
};

export default App;
