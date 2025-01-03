import React from "react";
import "./ElementsList.css";

const defaultElements = {
  textbox: {
    id: "textbox",
    type: "Textbox",
    text: "Sample Text",
  },
  image: {
    id: "image",
    type: "Image",
    src: "https://via.placeholder.com/100",
  },
  button: {
    id: "button",
    type: "Button",
    text: "Click Me",
  },
};

const ElementsList = () => {
  const handleDragStart = (e, id) => {
    e.dataTransfer.setData("elementId", id); // Pass the ID of the dragged element
  };

  return (
    <div className="elements-list">
      {Object.keys(defaultElements).map((key) => (
        <div
          key={key}
          className="element-item"
          draggable
          onDragStart={(e) => handleDragStart(e, key)}
        >
          {defaultElements[key].type}
        </div>
      ))}
    </div>
  );
};

export default ElementsList;
