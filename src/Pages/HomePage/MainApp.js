import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { hero } from './Components/home/hero/hero';
// import { hero } from '../../Components/home/hero/hero';
import { HomeNavbar } from './Components/home/navbar/navbar';
import "./MainApp.css";
// import { DemoEleList } from '../../Components/home/tab/demoEle/DemoEleList';
import { DemoEleList } from './Components/home/tab/demoEle/DemoEleList';
// import { DemoEleList } from './Components/home/tab/tab';

const MainApp = () => {
  const navigate = useNavigate();
  const [showOptions, setShowOptions] = useState(false);
  useEffect(() => {
    document.title = 'Welcome to our Project | Wizzy.dnd';
  }, []);
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
    // <div className="mainapp-container">
    //   <h1>Welcome to the Dashboard</h1>
    //   <button className="mainapp-btn" onClick={handleGoToWebsiteBuilder}>
    //     Go to Website Builder
    //   </button>

    //   {showOptions && (
    //     <div className="floating-options">
    //       <button className="option-btn" onClick={handleNewProject}>
    //         New Project
    //       </button>
    //       <button className="option-btn" onClick={handleOpenProject}>
    //         Open Existing Project
    //       </button>
    //       <button className="option-btn" onClick={handleExploreTemplates}>
    //         Explore Templates
    //       </button>
    //     </div>
    //   )}
    // </div>
    <div style={{padding:'0 84px 36px 84px'}}>
      {HomeNavbar()}
      {hero("Sambhav")}
      {DemoEleList()}
      <div style={{color:'rgba(36.57, 39.47, 62.69, 0.70)'}}>
        &copy; Copyright <strong>Wizzy.dnd</strong>, {new Date().getFullYear()} | Project by G49
      </div>
    </div>
  );
};

export default MainApp;
