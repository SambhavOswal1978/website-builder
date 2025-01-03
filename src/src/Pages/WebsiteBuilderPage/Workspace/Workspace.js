import React, { useState } from "react";
import "./Workspace.css";

const Workspace = ({ elements, onElementAdd, onElementClick, onElementMove }) => {
  const [draggingElement, setDraggingElement] = useState(null);

  const handleDrop = (e) => {
    e.preventDefault();
    const elementId = e.dataTransfer.getData("elementId");
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    onElementAdd(elementId, { top: y, left: x });
  };

  const handleDragOver = (e) => e.preventDefault();

  const handleMouseDown = (e, elementId) => {
    e.preventDefault();
    setDraggingElement(elementId);
  };

  const handleMouseMove = (e) => {
    if (draggingElement) {
      const workspaceRect = e.currentTarget.getBoundingClientRect();
      const x = e.clientX - workspaceRect.left;
      const y = e.clientY - workspaceRect.top;

      onElementMove(draggingElement, { top: y, left: x });
    }
  };

  const handleMouseUp = () => {
    setDraggingElement(null);
  };

  return (
    <div
      className="workspace"
      onDrop={handleDrop}
      onDragOver={handleDragOver}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
    >
      {Object.values(elements).map((element) => (
        <div
          key={element.id}
          className={`workspace-item ${
            draggingElement === element.id ? "dragging" : ""
          }`}
          onClick={() => onElementClick(element.id)}
          onMouseDown={(e) => handleMouseDown(e, element.id)}
          style={{
            position: "absolute",
            top: `${element.position.top}px`,
            left: `${element.position.left}px`,
            width: element.width,
            height: element.height,
            textAlign: element.alignment,
            visibility: element.visibility,
            fontFamily: element.fontFamily,
            fontSize: element.fontSize,
            color: element.color,
            backgroundColor: element.backgroundColor || "transparent",
            border: element.border || "1px dashed #999",
          }}
        >
          {element.type === "Textbox" && <span>{element.text}</span>}
          {element.type === "Image" && (
            <img
              src={element.src}
              alt={element.alt}
              style={{
                width: "100%",
                height: "100%",
                visibility: element.visibility,
              }}
            />
          )}
          {element.type === "Button" && (
            <button
              style={{
                color: element.color,
                backgroundColor: element.backgroundColor,
                border: element.border,
              }}
            >
              {element.text}
            </button>
          )}
        </div>
      ))}
    </div>
  );
};

export default Workspace;
