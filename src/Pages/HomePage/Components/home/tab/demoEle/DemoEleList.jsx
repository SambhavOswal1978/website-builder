import { useState } from "react";
import { useNavigate } from "react-router";
import { DemoEle } from "./DemoEle";
import './demoEle.css';

export const DemoEleList = () => {
    const [showOptions, setShowOptions] = useState(false);
    const navigate = useNavigate();
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
        <div style={{marginTop:24}}>
            <div style={{display:'flex', justifyContent:'space-between'}}>
                <h1 style={{fontWeight:'normal', margin:0,}}>Elements</h1>
                <div style={{display:'flex', alignItems:'center', justifyContent:'center', gap:20}}>
                  {!showOptions && (<div className='button' onClick={handleGoToWebsiteBuilder} style={{height:'fit-content', alignItems:'center', backgroundColor: "var(--primary-color)", color:'white', padding:'8px 18px', borderRadius:10}}>Get Started</div>)}
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
            </div>
            {/* <div style={{display:'flex', justifyContent:'space-between'}}>
                <h1 style={{fontWeight:'normal', margin:0,}}>Elements</h1>
                <div className='button' style={{height:'fit-content', alignItems:'center', backgroundColor: "var(--primary-color)", color:'white', padding:'8px 18px', borderRadius:10}}>Get Started</div>
            </div> */}
            <div style={{display:'grid', gridTemplateColumns:'25% 25% 25% 25%', justifyContent:'space-between', gap:24, marginTop:24, marginBottom:24, marginRight:84}}>
                {DemoEle("Image", "Add images to your webpage to make it more attractive", "/Icons/home/image-icon.svg")}
                {DemoEle("Heading","Heading is used to for main points", "/Icons/home/heading.svg")}
                {DemoEle("Text Editor", "Gives you the flexibility to change the text content through rich editor", "/Icons/home/para.svg")}
                {DemoEle("Button", "Used for a clickable action", "/Icons/home/button.svg")}
                {DemoEle("Video", "Used to display video", "/Icons/home/video.svg")}
                {DemoEle("Youtube Video", "Used to display video hosted on youtube", "/Icons/home/youtube.svg")}
                {DemoEle("Social Icons", "Add social icons to your website","/Icons/home/social.svg")}
                {DemoEle("Google Maps", "Add google maps and show your location to customers on website", "/Icons/home/maps.svg")}
            </div>
        </div>
    );
}
export default DemoEleList;