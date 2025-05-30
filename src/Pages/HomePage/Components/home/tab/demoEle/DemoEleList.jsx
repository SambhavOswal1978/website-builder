import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { DemoEle } from "./DemoEle";
import './demoEle.css';

export const DemoEleList = () => {
    const [showOptions, setShowOptions] = useState(false);
    const navigate = useNavigate();

    const handleGoToWebsiteBuilder = () => {
        setShowOptions(!showOptions);
    };

    useEffect(() => {
        if (showOptions) {
            document.querySelectorAll('.option-btn').forEach(btn => {
                btn.classList.add('slide-out');
            });
        } else {
            document.querySelectorAll('.option-btn').forEach(btn => {
                btn.classList.remove('slide-out');
            });
        }
    }, [showOptions]);

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
        <div style={{ marginTop: 24 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <h1 style={{ fontWeight: 'normal', margin: 0 }}>Elements</h1>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 20 }}>
                    {!showOptions && (
                        <div className='Start-button' onClick={handleGoToWebsiteBuilder} style={{ height: 'fit-content', alignItems: 'center', backgroundColor: "var(--primary-color)", color: 'white', padding: '8px 18px', borderRadius: 10, cursor: "pointer" }}>
                            Get Started
                        </div>
                    )}
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
            <div style={{ display: 'grid', gridTemplateColumns: '25% 25% 25% 25%', justifyContent: 'space-between', gap: 24, marginTop: 24, marginBottom: 24, marginRight: 84 }}>
                {DemoEle("Image", "Add images to your webpage to make it more attractive", "/Icons/home/image-icon.svg")}
                {DemoEle("Heading", "Heading is used to for main points", "/Icons/home/heading.svg")}
                {DemoEle("Text Editor", "Gives you the flexibility to change the text content through rich editor", "/Icons/home/para.svg")}
                {DemoEle("List", "Used to display a list of elements", "/Icons/home/list.svg")}
                {DemoEle("Video", "Used to display video", "/Icons/home/video.svg")}
                {DemoEle("Audio", "Used to add audio functionality on your webpage.", "/Icons/home/audio.svg")}
                {DemoEle("Link", "Hyperlink for easy navigation between webpages", "/Icons/home/link.svg")}
                {DemoEle("Div", "Provides container and plain background for elements", "/Icons/home/block.svg")}
            </div>
        </div>
    );
}

export default DemoEleList;