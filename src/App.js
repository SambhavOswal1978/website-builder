import React, { useState, useEffect } from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router";
import AboutUs from "./Pages/HomePage/AboutUs.js";
import MainApp from "./Pages/HomePage/MainApp";
import LoginModule from "./Pages/LoginPage/LoginModule";
import TemplatesPage from "./Pages/Templates/TemplatesPage.js";
import WebsiteBuilder from "./Pages/WebsiteBuilderPage/WebsiteBuilder";


const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState("");
  const [selectedTemplate, setSelectedTemplate] = useState(null);

  const handleLogin = (username) => {
    setIsLoggedIn(true);
    setUsername(username);
  };

  useEffect(() => {
    document.title = 'Wizzy.dnd';
  }, []);

  const handleTemplateSelection = (templateData) => {
    setSelectedTemplate(templateData);
  };

  return (
    <Router>
      
        <Routes>
          <Route
            path="/"
            element={isLoggedIn ? (
              <MainApp username={username} />
            ) : (
              <LoginModule onLogin={handleLogin} />
            )}
          />
          <Route
            path="/websitebuilder"
            element={<WebsiteBuilder templateData={selectedTemplate} />}
          />
          <Route
            path="/templates"
            element={<TemplatesPage onTemplateSelect={handleTemplateSelection} />}
          />
          <Route
            path="/about-us"
            element={<AboutUs/>}
          />
        </Routes>
       
    </Router>
  );
};

export default App;