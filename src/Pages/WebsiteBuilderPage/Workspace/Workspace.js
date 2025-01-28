/* eslint-disable jsx-a11y/no-distracting-elements */
import React, { useState, useRef, useEffect } from "react";
import "./Workspace.css";

const Workspace = ({ elements, onElementClick, onElementMove, onElementAdd }) => {
  console.log("Rendering Workspace with elements:", elements);

  const [draggingElement, setDraggingElement] = useState(null);
  const [dragStartPosition, setDragStartPosition] = useState(null); // Track initial mouse position
  const workspaceRef = useRef(null);
  const [workspaceWidth, setWorkspaceWidth] = useState(2000); // Initial workspace width

  // Dynamically adjust the workspace width based on element positions
  useEffect(() => {
    const maxWidth = Math.max(
      2000, // Default width
      ...Object.values(elements).map(
        (el) => el.position.left + parseInt(el.width || "100")
      )
    );
    setWorkspaceWidth(maxWidth);
  }, [elements]);

  const handleDrop = (e) => {
    e.preventDefault();
    const type = e.dataTransfer.getData("elementType");

    const rect = workspaceRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left + workspaceRef.current.scrollLeft;
    const y = e.clientY - rect.top + workspaceRef.current.scrollTop;

    onElementAdd(type, { top: y, left: x });
  };

  const handleDragOver = (e) => e.preventDefault();

  const handleMouseDown = (e, id) => {
    const element = elements[id];
    if (element) {
      setDraggingElement(id);
      setDragStartPosition({
        mouseX: e.clientX,
        mouseY: e.clientY,
        elementX: element.position.left,
        elementY: element.position.top,
      });
    }
  };

  const handleMouseMove = (e) => {
    if (draggingElement && dragStartPosition) {
      const deltaX = e.clientX - dragStartPosition.mouseX;
      const deltaY = e.clientY - dragStartPosition.mouseY;

      const newX = dragStartPosition.elementX + deltaX;
      const newY = dragStartPosition.elementY + deltaY;

      // Allow movement to any width and height
      const clampedX = Math.max(0, newX);
      const clampedY = Math.max(0, newY);

      onElementMove(draggingElement, { top: clampedY, left: clampedX });
    }
  };

  const handleMouseUp = () => {
    setDraggingElement(null);
    setDragStartPosition(null);
  };

  return (
    <div
      className="workspace-container"
      ref={workspaceRef}
      onDrop={handleDrop}
      onDragOver={handleDragOver}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
    >
      <div
        className="workspace"
        style={{
          minWidth: `${workspaceWidth}px`, // Dynamic workspace width
          height: "5000px", // Assuming height remains dynamic
        }}
      >
        {Object.values(elements).map((element) => (
          <div
          key={element.id}
          className="workspace-item"
          onClick={() => onElementClick(element.id)}
          onMouseDown={(e) => handleMouseDown(e, element.id)}
          style={{
            position: "absolute",
            top: `${element.position?.top || 0}px`, // Fallback to 0 if undefined
            left: `${element.position?.left || 0}px`, // Fallback to 0 if undefined
            width: element.width || "100px",
            height: element.height || "100px",
            backgroundColor:
              element.type === "Div" || element.type === "Container"
                ? element.backgroundColor || "#ffffff"
                : "transparent",
            textAlign: element.alignment || "left",
            border: "1px dashed #ccc",
            fontSize: element.fontSize || "16px",
            color: element.color || "#000000",
          }}
        >
        
            {element.type === "Textbox" && (
              <span
                style={{
                  backgroundColor: element.backgroundColor || "#ffffff",
                  height: "100%",
                  alignContent: "center",
                  border: element.border || "1px solid #fff",
                  width: "100%",opacity: element.opacity || "1",zIndex: element.zIndex || "10",
                }}
              >
                {element.text}
              </span>
            )}
            {element.type === "Image" && (
              <img
                src={element.src}
                alt="Element Preview"
                style={{ width: "100%",border: element.border || "1px solid #fff", opacity: element.opacity || "1",zIndex: element.zIndex || "10",height: "100%" }}
              />
            )}
            {element.type === "Heading" && (
              <h1
                style={{
                  fontSize: element.fontSize || "32px",
                  backgroundColor: element.backgroundColor || "#ffffff",
                  height: "100%",
                  alignContent: "center",
                  border: element.border || "1px solid #fff",
                  width: "100%",opacity: element.opacity || "1",zIndex: element.zIndex || "10",
                }}
              >
                {element.text}
              </h1>
            )}
            {/* {element.type === "Button" && (
              <button
                style={{
                  backgroundColor: element.backgroundColor || "#007bff",
                  color: element.color || "#ffffff",
                  height: "100%",
                  alignContent: "center",
                  width: "100%",opacity: element.opacity || "1",zIndex: element.zIndex || "10",
                }}
              >
                {element.text}
              </button>
            )} */}
            {element.type === "Link" && (
              <a
                href={element.href || "#"}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  color: element.color || "#007bff",
                  backgroundColor: element.backgroundColor || "#ffffff",
                  height: "100%",
                  border  : element.border || "1px solid #fff",
                  alignContent: "center",zIndex: element.zIndex || "10",
                  width: "100%",opacity: element.opacity || "1",
                }}
                onClick={(e) => e.preventDefault()}
              >
                {element.text}
              </a>
            )}
            {element.type === "Marquee" && (
              <marquee
                behavior="scroll"
                direction={element.direction || "left"}
                style={{
                  backgroundColor: element.backgroundColor || "#ffffff",
                  height: "100%",
                  alignContent: "center",
                  width: "100%",
                  border: element.border || "1px solid #fff",
                  speed: element.speed || "100",opacity: element.opacity || "1",zIndex: element.zIndex || "10",
                }}
              >
                {element.text}
              </marquee>
            )}
            {element.type === "Div" && (
              <div
                style={{
                  backgroundColor: element.backgroundColor || "#cccccc",
                  width: "100%",
                  height: "100%",
                  border: element.border || "1px solid #000",opacity: element.opacity || "1",zIndex: element.zIndex || "10",
                }}
              />
            )}
            {element.type === "List" &&
              Array.isArray(element.items) && (
                <ul style={{ 
                  listStyleType: element.style || "disc",
                   opacity: element.opacity || "1",
                   zIndex: element.zIndex || "10",
                   display: element.direction === "horizontal" ? "flex" : "block", // Flex for horizontal, block for vertical
                   border: element.border || "1px solid #fff",
                  }}>
                  {element.items.map((item, index) => (
                    <li key={index} style={{margin:"10px"}}>{item}</li>
                  ))}
                </ul>
              )}
            {element.type === "Dash" && (
              <hr
                style={{
                  width: element.width,
                  height: element.height,
                  backgroundColor: element.backgroundColor || "#ff0000",
                  border: element.border,
                  margin: element.margin,
                  size: element.size,
                  opacity: element.opacity || "1",zIndex: element.zIndex || "10",noShade: element.noShade,color: element.color,
                }}
            />
          )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Workspace;
