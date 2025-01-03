import React, { useState } from "react";
import "./WebsiteBuilder.css";
import ElementsList from "./Elements-list/ElementsList";
import Workspace from "./Workspace/Workspace";
import PropertiesSection from "./Properties/PropertiesSection";

const defaultElements = {
  textbox: {
    id: "textbox",
    type: "Textbox",
    width: "100px",
    height: "100px",
    position: { top: 0, left: 0 },
    text: "Sample Text",
    fontFamily: "Arial",
    fontSize: "16px",
    color: "#000000",
    alignment: "left",
    visibility: "visible",
  },
  image: {
    id: "image",
    type: "Image",
    width: "100px",
    height: "100px",
    position: { top: 0, left: 0 },
    src: "https://via.placeholder.com/100",
    alt: "Placeholder Image",
    alignment: "center",
    visibility: "visible",
  },
  video: {
    id: "video",
    type: "Video",
    width: "200px",
    height: "150px",
    position: { top: 0, left: 0 },
    src: "https://www.w3schools.com/html/mov_bbb.mp4",
    controls: true,
    visibility: "visible",
  },
  audio: {
    id: "audio",
    type: "Audio",
    position: { top: 0, left: 0 },
    src: "https://www.w3schools.com/html/horse.mp3",
    controls: true,
    visibility: "visible",
  },
  button: {
    id: "button",
    type: "Button",
    position: { top: 0, left: 0 },
    text: "Click Me",
    color: "#007BFF",
    backgroundColor: "#ffffff",
    border: "1px solid #ccc",
    alignment: "center",
    visibility: "visible",
  },
  link: {
    id: "link",
    type: "Link",
    position: { top: 0, left: 0 },
    text: "Visit",
    href: "https://example.com",
    target: "_blank",
    alignment: "left",
    visibility: "visible",
  },
  textarea: {
    id: "textarea",
    type: "TextArea",
    width: "200px",
    height: "100px",
    position: { top: 0, left: 0 },
    placeholder: "Enter text here...",
    fontSize: "16px",
    color: "#000000",
    alignment: "left",
    visibility: "visible",
  },
  unorderedList: {
    id: "unorderedList",
    type: "UnorderedList",
    position: { top: 0, left: 0 },
    items: ["Item 1", "Item 2", "Item 3"],
    listStyle: "bullet",
    alignment: "left",
    visibility: "visible",
  },
  orderedList: {
    id: "orderedList",
    type: "OrderedList",
    position: { top: 0, left: 0 },
    items: ["First", "Second", "Third"],
    listStyle: "numbered",
    alignment: "left",
    visibility: "visible",
  },
  table: {
    id: "table",
    type: "Table",
    position: { top: 0, left: 0 },
    rows: 3,
    cols: 3,
    border: "1px solid #000",
    cellPadding: "5px",
    visibility: "visible",
  },
  marquee: {
    id: "marquee",
    type: "Marquee",
    position: { top: 0, left: 0 },
    text: "Scrolling Text",
    direction: "left",
    speed: "normal",
    visibility: "visible",
  },
  iframe: {
    id: "iframe",
    type: "IFrame",
    width: "300px",
    height: "200px",
    position: { top: 0, left: 0 },
    src: "https://www.example.com",
    title: "Embedded Content",
    visibility: "visible",
  },
};



const WebsiteBuilder = () => {
  const [workspaceElements, setWorkspaceElements] = useState({});
  const [selectedElementId, setSelectedElementId] = useState(null);

  const handleElementAdd = (elementId, position) => {
  const newElement = {
    ...defaultElements[elementId],
    id: `${elementId}-${Date.now()}`, // Generate unique ID
    position,
  };
  setWorkspaceElements((prev) => ({ ...prev, [newElement.id]: newElement }));
};


  const handleElementClick = (id) => {
    setSelectedElementId(id);
  };

  const handlePropertyChange = (property, value) => {
    setWorkspaceElements((prev) => ({
      ...prev,
      [selectedElementId]: {
        ...prev[selectedElementId],
        [property]: value,
      },
    }));
  };
  

  const handleElementMove = (id, newPosition) => {
    setWorkspaceElements((prev) => ({
      ...prev,
      [id]: {
        ...prev[id],
        position: newPosition,
      },
    }));
  };
  console.log(Object.keys(defaultElements)); // Debug: Should log ["textbox", "image", ...]

  return (
    <div className="website-builder-container">
      <div className="elements-list-section">
        <ElementsList />
      </div>
      <div className="workspace-section">
        <Workspace
          elements={workspaceElements}
          onElementAdd={handleElementAdd}
          onElementClick={handleElementClick}
          onElementMove={handleElementMove}
        />
      </div>
      {selectedElementId && (
        <div className="properties-section">
          <PropertiesSection
            element={workspaceElements[selectedElementId]}
            onPropertyChange={handlePropertyChange}
          />
        </div>
      )}
    </div>
  );
};

export default WebsiteBuilder;
