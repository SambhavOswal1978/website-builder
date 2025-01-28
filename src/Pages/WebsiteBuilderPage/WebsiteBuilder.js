import React, { useState, useEffect } from "react";
import ElementsList from "./Elements-list/ElementsList";
import Workspace from "./Workspace/Workspace";
import PropertiesSection from "./Properties/PropertiesSection";
import { saveAs } from "file-saver";
import { useLocation, useNavigate } from "react-router-dom";
import "./WebsiteBuilder.css";

const WebsiteBuilder = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [workspaceElements, setWorkspaceElements] = useState({});
  const [selectedElementId, setSelectedElementId] = useState(null);
  const [workspaceHeight, setWorkspaceHeight] = useState(5000); // Dynamic height for workspace
  

  // Load existing project or template if data is passed
  useEffect(() => {
    if (location.state?.type === "open" && location.state.data) {
      const sanitizedElements = Object.fromEntries(
        Object.entries(location.state.data).map(([id, element]) => [
          id,
          {
            ...defaultElements[element.type], // Merge default properties
            ...element, // Override with actual element properties
            position: element.position || { top: 0, left: 0 }, // Ensure position exists
            width: element.width || "100px", // Default width
            height: element.height || "100px", // Default height
            opacity: element.opacity || "1", // Default opacity
            zIndex: element.zIndex || "1", // Default z-index
          },
        ])
      );
      setWorkspaceElements(sanitizedElements);
    }
  }, [location.state]);
  
  

  // Adjust workspace height based on elements
  useEffect(() => {
    const maxHeight = Math.max(
      5000, // Default height
      ...Object.values(workspaceElements).map(
        (el) => el.position.top + parseInt(el.height || "100")
      )
    );
    setWorkspaceHeight(maxHeight);
  }, [workspaceElements]);

  // Save project as a .wbproj file
  const handleSaveProject = () => {
    const blob = new Blob([JSON.stringify(workspaceElements, null, 2)], {
      type: "application/json",
    });
    saveAs(blob, "project.wbproj");
  };

  // Add a new element to the workspace
  const handleElementAdd = (type, position) => {
    const uniqueId = `${type}-${Date.now()}`;
    const newElement = {
      id: uniqueId,
      type,
      ...defaultElements[type],
      position: {
        top: position.top,
        left: position.left,
      },
      children: [], // Support for nested elements
    };

    setWorkspaceElements((prev) => ({
      ...prev,
      [uniqueId]: newElement,
    }));
  };

  // Move an existing element
  const handleElementMove = (id, newPosition) => {
    setWorkspaceElements((prev) => ({
      ...prev,
      [id]: {
        ...prev[id],
        position: {
          top: newPosition.top,
          left: newPosition.left,
        },
      },
    }));
  };

  // Handle property changes for selected element
  const handlePropertyChange = (property, value) => {
    setWorkspaceElements((prev) => ({
      ...prev,
      [selectedElementId]: {
        ...prev[selectedElementId],
        [property]: value,
      },
    }));
    console.log(selectedElementId, property, value);
  };

  // Handle element deletion
  const handleDeleteElement = () => {
    setWorkspaceElements((prev) => {
      const updatedElements = { ...prev };
      delete updatedElements[selectedElementId];
      return updatedElements;
    });
    setSelectedElementId(null);
  };

  // Generate HTML structure
  const generateHTML = (elements) => {
    if (!elements || Object.keys(elements).length === 0) {
      return '';
    }

    const elementsList = Object.values(elements);
    const htmlContent = elementsList.map(element => {
      switch (element.type) {
        case "Textbox":
        return `<div style="border: ${element.border};position:absolute;opacity:${element.opacity};z-index:${element.zIndex};background-color:${element.backgroundColor};top:${element.position.top}px;left:${element.position.left}px;width:${element.width};font-size:${element.fontSize};color:${element.color};text-align:${element.alignment}">${element.text}</div>`;
      
      case "Heading":
        return `<div style="border: ${element.border};position:absolute;opacity:${element.opacity || "1"};z-index:${element.zIndex};background-color:${element.backgroundColor};top:${element.position.top}px;left:${element.position.left}px;width:${element.width};font-size:${element.fontSize};color:${element.color};text-align:${element.alignment}">${element.text}</div>`;
      
      case "Image":
        return `<img src="${element.src}" style="border: ${element.border};position:absolute;z-index:${element.zIndex};opacity:${element.opacity || "1"};top:${element.position.top}px;left:${element.position.left}px;width:${element.width};height:${element.height}" alt="Image" />`;
      
      case "Audio":
        return `<audio style="border: ${element.border};position:absolute;z-index:${element.zIndex};top:${element.position.top}px;opacity:${element.opacity || "1"};left:${element.position.left}px" ${element.controls ? 'controls' : ''} ${element.autoplay ? 'autoplay' : ''} ${element.loop ? 'loop' : ''} src="${element.src}"></audio>`;
      
      case "Video":
        return `<video style="border: ${element.border};position:absolutez-index:${element.zIndex};top:${element.position.top}px;opacity:${element.opacity || "1"};left:${element.position.left}px;width:${element.width};height:${element.height}" ${element.controls ? 'controls' : ''} src="${element.src}"></video>`;
      
      case "Link":
        return `<a href="${element.href}" style="border: ${element.border};z-index:${element.zIndex};background-color:${element.backgroundColor};opacity:${element.opacity || "1"};z-index:${element.zIndex};position:absolute;top:${element.position.top}px;left:${element.position.left}px;color:${element.color};text-decoration:${element.textDecoration};font-size:${element.fontSize};">${element.text}</a>`;
      
      case "Marquee":
        return `<marquee style="border: ${element.border};z-index:${element.zIndex};background-color:${element.backgroundColor};position:absolute;opacity:${element.opacity || "1"};z-index:${element.zIndex};top:${element.position.top}px;left:${element.position.left}px;width:${element.width}" direction="${element.direction}" behavior="${element.behavior};;font-size:${element.fontSize};">${element.text}</marquee>`;
      
      case "Div":
        return `<div style="border: ${element.border};position:absolute;top:${element.position.top}px;left:${element.position.left}px;opacity:${element.opacity || "1"};z-index:${element.zIndex};width:${element.width};height:${element.height};background-color:${element.backgroundColor};border:${element.border}"></div>`;
      
        case "List": {
          const listItems = element.items
            .map(
              (item) =>
                `<li style="margin:${element.margin || "5px"}; list-style-type: ${
                  element.style || "disc"
                };">${item}</li>`
            )
            .join("");
        
          // Map direction to valid CSS display property
          const displayStyle = element.direction === "horizontal" ? "flex" : "block";
          const gapStyle = element.direction === "horizontal" && element.gap
            ? `gap: ${element.gap}px;`
            : ""; // Add spacing if horizontal
        
          return `<${element.listType} style="
            position: absolute;
            top: ${element.position.top}px;
            left: ${element.position.left}px;
            z-index: ${element.zIndex};
            opacity: ${element.opacity || "1"};
            width: ${element.width};
            color: ${element.color};
            font-size: ${element.fontSize};
            background-color: ${element.backgroundColor};
            border: ${element.border};
            display: ${displayStyle};
            ${gapStyle}
          ">${listItems}</${element.listType}>`;
        }
        
      
        case "Dash":
          return `<hr style="position:absolute;border: ${element.border};top:${element.position.top}px;left:${element.position.left}px;z-index:${element.zIndex};opacity:${element.opacity || "1"};width:${element.width};height:${element.height};background-color:${element.backgroundColor};border-style:${element.borderStyle};border-width:${element.borderWidth};border-color:${element.borderColor};margin:${element.margin};${element.noshade ? 'noshade' : ''}">`;
        default:
          return '';
      }
    }).join('\n');

    return `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="UTF-8">
          <title>Website</title>
          <style>
            body { position: relative; min-height: 100vh; margin: 0; }
          </style>
        </head>
        <body>${htmlContent}</body>
      </html>
    `;
  };

  // Preview the project
  const handlePreviewProject = () => {
  const htmlContent = generateHTML(workspaceElements);
  const newTab = window.open();
  newTab.document.open();
  newTab.document.write(htmlContent);
  newTab.document.close();
};


  // Download the project as an HTML file
  const handleDownloadProject = () => {
    try {
      const html = generateHTML(workspaceElements);
      const blob = new Blob([html], { type: 'text/html' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'website.html';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Download error:', error);
      alert('Failed to download project');
    }
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
      <div className="website-builder">
        <ElementsList onElementAdd={handleElementAdd} />
        <Workspace
          elements={workspaceElements}
          onElementClick={setSelectedElementId}
          onElementMove={handleElementMove}
          onElementAdd={handleElementAdd}
          height={workspaceHeight} // Pass dynamic height to workspace
        />
        {selectedElementId && (
          <PropertiesSection
            element={workspaceElements[selectedElementId]}
            onPropertyChange={handlePropertyChange}
            onDeleteElement={handleDeleteElement}
          />
        )}
      </div>
      <div className="button-container">
        <button className="save-btn" onClick={handleSaveProject}>
          Save Project
        </button>
        <button className="preview-btn" onClick={handlePreviewProject}>
          Preview Project
        </button>
        <button className="download-btn" onClick={handleDownloadProject}>
          Download Project
        </button>
      </div>
    </div>
  );
};

const defaultElements = {
  textbox: { type: "Textbox",zIndex:"10",opacity: "1", backgroundColor: "#000", text: "Sample Text", width: "100px", height: "50px", fontSize: "16px", color: "#000", alignment: "left" },
  image: { type: "Image",zIndex:"10",opacity: "1", src: "https://via.placeholder.com/150", width: "150px", height: "150px" },
  heading: { type: "Heading",zIndex:"10",opacity: "1",backgroundColor: "#fff", text: "Sample Heading", fontSize: "32px", color: "#000" },
  button: { type: "Button",zIndex:"10",opacity: "1", text: "Click Me", width: "100px", height: "40px", backgroundColor: "#fff", color: "#fff" },
  link: { type: "Link",zIndex:"10",opacity: "1",backgroundColor: "#fff", text: "Visit Here", href: "#", color: "#007bff" },
  marquee: { type: "Marquee",zIndex:"10",opacity: "1",backgroundColor: "#fff", text: "Scrolling Text", width: "300px", height: "50px", speed: "1000", direction: "left" },
  div: { type: "Div",opacity: "1",zIndex:"10", backgroundColor: "#ccc", width: "200px", height: "200px", border: "1px solid #000" },
 
  video: { type: "Video",opacity: "1",zIndex:"10", src: "https://sample-videos.com/video123/mp4/480/asdasdas.mp4", width: "320px", height: "240px", autoplay: false, controls: true, loop: false },
  audio: { type: "Audio",opacity: "1", zIndex:"10",src: "https://sample-videos.com/audio/mp3/crowd-cheering.mp3", autoplay: false, controls: true, loop: false },
  
  list: { type: "List",opacity: "1",zIndex:"10", items: ["Item 1", "Item 2", "Item 3"], style: "disc", alignment: "left" }, // New List Element
  dash: {
    type: "Dash",
    width: "100%",
    height: "2px",
    backgroundColorolor: "#000000",
    borderStyle: "solid",
    borderWidth: "1px",
    borderColor: "#000000",
    margin: "10px 0",
    noshade: false,
    opacity: "1",
    zIndex: "1"
  }
  };

export default WebsiteBuilder;
