import React, { useState } from "react";
import "./WebsiteBuilder.css";
import ElementsList from "./Elements-list/ElementsList";
import Workspace from "./Workspace/Workspace";
import PropertiesSection from "./Properties/PropertiesSection";

const WebsiteBuilder = () => {
  const [elements, setElements] = useState({
    textbox: {
      id: "textbox",
      type: "Textbox",
      placeholder: "Enter text here",
      alignment: "left",
      font: "Arial",
      size: "16px",
    },
    image: {
      id: "image",
      type: "Image",
      src: "https://via.placeholder.com/150", // Default image
      alt: "Placeholder Image",
      alignment: "center",
      size: "150px",
    },
    header: {
      id: "header",
      type: "Header",
      text: "Header Text",
      alignment: "center",
      font: "Georgia",
      size: "24px",
    },
    marquee: {
      id: "marquee",
      type: "Marquee",
      text: "Scrolling Text",
      speed: "normal",
      alignment: "center",
      font: "Verdana",
      size: "18px",
    },
  });

  const [selectedElementId, setSelectedElementId] = useState(null);

  // Handle selecting an element
  const handleElementSelect = (elementId) => {
    setSelectedElementId(elementId);
  };

  // Handle updating properties
  const handlePropertyChange = (property, value) => {
    setElements((prevElements) => ({
      ...prevElements,
      [selectedElementId]: {
        ...prevElements[selectedElementId],
        [property]: value,
      },
    }));
  };

  return (
    <div className="website-builder-container">
      <div className="elements-list-section">
        <ElementsList />
      </div>
      <div className="workspace-section">
        <Workspace
          elements={elements}
          onElementSelect={handleElementSelect}
        />
      </div>
      <div className="properties-section">
        {selectedElementId && (
          <PropertiesSection
            element={elements[selectedElementId]}
            onPropertyChange={handlePropertyChange}
          />
        )}
      </div>
    </div>
  );
};

export default WebsiteBuilder;
