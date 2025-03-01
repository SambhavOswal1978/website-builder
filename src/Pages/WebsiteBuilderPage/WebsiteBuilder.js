import { saveAs } from "file-saver";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router";
import ElementsList from "./Elements-list/ElementsList";
import PropertiesSection from "./Properties/PropertiesSection";
import "./WebsiteBuilder.css";
import Workspace from "./Workspace/Workspace";
import Cookies from "js-cookie"; // Add js-cookie for cookie management

const WebsiteBuilder = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [workspaceElements, setWorkspaceElements] = useState({});
  const [selectedElementId, setSelectedElementId] = useState(null);
  const [workspaceHeight, setWorkspaceHeight] = useState(5000); // Dynamic height for workspace
  const savedUsername = Cookies.get("username");
  const date=new Date();
  const time=date.getDate()+"/"+(date.getMonth()+1)+"/"+date.getFullYear()+"  "+date.getHours()+":"+date.getMinutes()+":"+date.getSeconds();
  console.log(time);

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
            zIndex: element.zIndex || "10", // Default z-index
            bold: element.bold || false, // Default to false if missing
          italic: element.italic || false, // Default to false if missing
          underline: element.underline || { enabled: false, type: "solid" }, // Default underline property
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
  return `<div style="
    font-family:${element.fontFamily || "Arial, sans-serif"};
    border: ${element.border || "none"};
    position: absolute;
    opacity: ${element.opacity || "1"};
    z-index: ${element.zIndex || "1"};
    background-color: ${element.backgroundColor || "transparent"};
    top: ${element.position?.top || 0}px;
    left: ${element.position?.left || 0}px;
    width: ${element.width || "auto"};
    font-size: ${element.fontSize || "16px"};
    color: ${element.color || "#000"};
    text-align: ${element.alignment || "left"};
    font-weight: ${element.bold ? "bold" : "normal"};
    font-style: ${element.italic ? "italic" : "normal"};
    border-radius: ${element.borderRadius || "20px"};
    padding: ${element.padding || "5px"};
    text-decoration: ${
      element.underline?.enabled
        ? `${element.underline.type || "solid"} underline`
        : "none"
    };
  ">${element.text || ""}</div>`;

case "Heading":
  return `<div style="
    font-family:${element.fontFamily || "Arial, sans-serif"};
    border: ${element.border || "none"};
    position: absolute;
    opacity: ${element.opacity || "1"};
    z-index: ${element.zIndex || "1"};
    background-color: ${element.backgroundColor || "transparent"};
    top: ${element.position?.top || 0}px;
    left: ${element.position?.left || 0}px;
    width: ${element.width || "auto"};
    height: ${element.height};
    font-size: ${element.fontSize || "32px"};
    color: ${element.color || "#000"};
    text-align: ${element.alignment || "left"};
    font-weight: ${element.bold ? "bold" : "normal"};
    font-style: ${element.italic ? "italic" : "normal"};
    border-radius: ${element.borderRadius || "20px"};
    padding: ${element.padding || "5px"};
    text-decoration: ${
      element.underline?.enabled
        ? `${element.underline.type || "solid"} underline`
        : "none"
    };
  ">${element.text || ""}</div>`;

        case "Image":
          return `<img src="${element.src}" style="padding: ${element.padding || "5px"};border: ${element.border};border-radius: ${element.borderRadius || "20px"};position:absolute;z-index:${element.zIndex};opacity:${element.opacity || "1"};top:${element.position.top}px;left:${element.position.left}px;width:${element.width};height:${element.height}" alt="Image" />`;

          case "Video":
            return `<video 
              src="${element.src}" 
              ${element.controls ? "controls" : ""} 
              ${element.autoplay ? "autoplay" : ""} 
              ${element.loop ? "loop" : ""}
              style="position:absolute;top:${element.position.top}px;left:${element.position.left}px;width:${element.width};height:${element.height};opacity:${element.opacity};z-index:${element.zIndex};border:${element.border};">
            </video>`;
          
          case "Audio":
            return `<audio 
              src="${element.src}" 
              ${element.controls ? "controls" : ""} 
              ${element.autoplay ? "autoplay" : ""} 
              ${element.loop ? "loop" : ""}
              style="position:absolute;top:${element.position.top}px;left:${element.position.left}px;width:${element.width};opacity:${element.opacity};z-index:${element.zIndex};">
            </audio>`;
          
        case "Link":
          return `<a href="${element.href}" style="padding: ${element.padding || "5px"};font-family:${element.fontFamily};border-radius: ${element.borderRadius || "20px"};border: ${element.border};z-index:${element.zIndex};background-color:${element.backgroundColor};opacity:${element.opacity || "1"};z-index:${element.zIndex};position:absolute;top:${element.position.top}px;left:${element.position.left}px;color:${element.color};text-decoration:${element.textDecoration};font-size:${element.fontSize};font-weight: ${element.bold ? "bold" : "normal"};font-style: ${element.italic ? "italic" : "normal"};text-decoration: ${element.underline.enabled ? `${element.underline.type} underline` : "none"};">${element.text}</a>`;

        // case "Marquee":
        //   return `<marquee style="padding: ${element.padding || "5px"};"behaviour":${element.behavior || "slide"};"color":${element.color || "#000000"};border-radius: ${element.borderRadius || "20px"};font-family:${element.fontFamily};border: ${element.border};z-index:${element.zIndex};background-color:${element.backgroundColor};position:absolute;opacity:${element.opacity || "1"};z-index:${element.zIndex};top:${element.position.top}px;left:${element.position.left}px;width:${element.width}" direction="${element.direction}" behavior="${element.behavior};;font-size:${element.fontSize};font-weight: ${element.bold ? "bold" : "normal"};font-style: ${element.italic ? "italic" : "normal"};text-decoration: ${element.underline.enabled ? `${element.underline.type} underline` : "none"};">${element.text}</marquee>`;

        case "Div":
          return `<div style="padding: ${element.padding || "5px"};border-radius: ${element.borderRadius || "20px"};border: ${element.border};position:absolute;top:${element.position.top}px;left:${element.position.left}px;opacity:${element.opacity || "1"};z-index:${element.zIndex};width:${element.width};height:${element.height};background-color:${element.backgroundColor};border:${element.border}"></div>`;

        case "List": {
          const listItems = element.items
            .map(
              (item) =>
                `<li style="margin:${element.margin || "5px"}; list-style-type: ${element.style || "disc"
                };">${item}</li>`
            )
            .join("");

          // Map direction to valid CSS display property
          const displayStyle = element.direction === "horizontal" ? "flex" : "block";
          const gapStyle = element.direction === "horizontal" && element.gap
            ? `gap: ${element.gap}px;`
            : ""; // Add spacing if horizontal

          return `<${element.listType} style="position: absolute;top: ${element.position.top}px;left: ${element.position.left}px;padding: ${element.padding || "5px"};z-index: ${element.zIndex};opacity: ${element.opacity || "1"};width: ${element.width};color: ${element.color};font-size: ${element.fontSize};background-color: ${element.backgroundColor};border-radius: ${element.borderRadius || "20px"};border: ${element.border};font-family:${element.fontFamily};font-weight: ${element.bold ? "bold" : "normal"};font-style: ${element.italic ? "italic" : "normal"};gap:${element.gap};text-decoration: ${element.underline.enabled ? `${element.underline.type} underline` : "none"};display: ${displayStyle};${gapStyle}">${listItems}</${element.listType}>`;
        }

        case "Dash":
          return `<hr style="border-radius: ${element.borderRadius || "20px"};position:absolute;border: ${element.border};top:${element.position.top}px;left:${element.position.left}px;z-index:${element.zIndex || "10"};opacity:${element.opacity || "1"};width:${element.width};height:${element.height};background-color:${element.backgroundColor};border-style:${element.borderStyle};border-width:${element.borderWidth};border-color:${element.borderColor};${element.noshade ? 'noshade' : ''}">`;
        default:
          return '';
      }
    }).join('\n');

    return `
      <!-- This is made by User: ${savedUsername}  on the Time Stamp of ${time}--!>
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
  textbox: { type: "Textbox",padding :"5px",borderRadius:"20px", bold: false, italic: false, underline: { enabled: false, type: "solid" }, zIndex: "10", opacity: "1", backgroundColor: "#ffffff", text: "Sample Text", width: "100px", height: "50px", fontSize: "16px", color: "#000", alignment: "left" },
  image: { type: "Image",padding :"5px",borderRadius:"20px", zIndex: "10", opacity: "1", src: "https://via.placeholder.com/150", width: "150px", height: "150px" },
  heading: { type: "Heading",padding :"5px",borderRadius:"20px", bold: false, italic: false, underline: { enabled: false, type: "solid" }, zIndex: "10", opacity: "1", backgroundColor: "#ffffff", text: "Sample Heading", fontSize: "32px", color: "#000" },
  button: { type: "Button",padding :"5px",borderRadius:"20px", bold: false, italic: false, underline: { enabled: false, type: "solid" }, zIndex: "10", opacity: "1", text: "Click Me", width: "100px", height: "40px", backgroundColor: "#fff", color: "#fff" },
  link: { type: "Link",padding :"5px",borderRadius:"20px", bold: false, italic: false, underline: { enabled: false, type: "solid" }, zIndex: "10", opacity: "1", backgroundColor: "#fff", text: "Visit Here", href: "#", color: "#007bff" },
  // marquee: { type: "Marquee",padding :"5px", bold: false, italic: false, underline: { enabled: false, type: "solid" }, zIndex: "10", opacity: "1", backgroundColor: "#fff", text: "Scrolling Text", width: "300px", height: "50px", scrollamount: "100", direction: "left" ,color: "#000000", behavior:"slide" },
  div: { type: "Div",padding :"5px",borderRadius:"20px", opacity: "1", zIndex: "10", backgroundColor: "#ccc", width: "200px", height: "200px", border: "1px solid #000" },

  
    video: {
      type: "Video",
      src: "https://sample-videos.com/video123/mp4/480/asdasdas.mp4", // Default video
      autoplay: false,
      controls: true,
      loop: false,
      width: "320px",
      height: "240px",
      position: { top: 50, left: 50 }, // Default position
      opacity: "1",
      zIndex: "10",
      border: "none",
    },
    audio: {
      type: "Audio",
      src: "https://sample-videos.com/audio/mp3/crowd-cheering.mp3", // Default audio
      autoplay: true,
      controls: true,
      loop: false,
      width: "300px",
      position: { top: 50, left: 50 }, // Default position
      opacity: "1",
      zIndex: "10",
    },
  
  
  list: { type: "List",padding :"5px",borderRadius:"20px", bold: false, italic: false, underline: { enabled: false, type: "solid" },color: "#ffffff", opacity: "1", zIndex: "10", items: ["Item 1", "Item 2", "Item 3"], style: "disc", alignment: "left" }, // New List Element
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
    zIndex: "1",
    padding :"5px",
    borderRadius:"20px",
  }
};

export default WebsiteBuilder;
