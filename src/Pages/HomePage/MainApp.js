import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./MainApp.css";

const MainApp = () => {
  const navigate = useNavigate();
  const [showOptions, setShowOptions] = useState(false);

  const handleGoToWebsiteBuilder = () => {
    setShowOptions(!showOptions);
  };

  const handleNewProject = () => {
    navigate("/websitebuilder"); // Redirects to WebsiteBuilder page
  };

  const handleOpenProject = () => {
    const fileInput = document.createElement("input");
    fileInput.type = "file";
    fileInput.accept = ".wbproj";
    fileInput.onchange = (event) => {
      const file = event.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
          const projectData = JSON.parse(e.target.result);
          navigate("/websitebuilder", { state: { type: "open", data: projectData } });
        };
        reader.readAsText(file);
      }
    };
    fileInput.click();
  };

  const handleExploreTemplates = () => {
    navigate("/templates"); // This matches the route path defined in App.js
  };

  return (
    <div className="mainapp-container">
      <h1>Welcome to the Dashboard</h1>
      <button className="mainapp-btn" onClick={handleGoToWebsiteBuilder}>
        Go to Website Builder
      </button>

      {showOptions && (
        <div className="floating-options">
          <button className="option-btn" onClick={handleNewProject}>
            New Project
          </button>
          <button className="option-btn" onClick={handleOpenProject}>
            Open Existing Project
          </button>
          <button className="option-btn" onClick={handleExploreTemplates}>
            Explore Templates
          </button>
        </div>
      )}
    </div>
    
  );
};

export default MainApp;
