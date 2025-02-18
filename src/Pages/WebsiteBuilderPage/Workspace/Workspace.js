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

      // Allow movement beyond initial width and height
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
      style={{ overflowX: "auto", overflowY: "auto" }} // Enables horizontal and vertical scrolling
    >

      <div
        className="workspace"
        style={{
          minWidth: `${workspaceWidth}px`, // Dynamic workspace width
          height: "5000px", // Keeping existing height settings
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
              margin: element.margin || "10px",
              color: element.color || "#000000",
            }}
          >

            {element.type === "Textbox" && (
              <span
                style={{
                  backgroundColor: element.backgroundColor || "#ffffff",
                  height: "100%",
                  // alignContent: "center",
                  margin: element.margin || "10px",
                  border: element.border || "1px solid #fff",
                  borderRadius: element.borderRadius || "20",
                  fontFamily: element.fontFamily, padding: element.padding || "5px",
                  width: "100%", opacity: element.opacity || "1", zIndex: element.zIndex || "10",
                  fontWeight: element.bold ? "bold" : "normal",
                  fontStyle: element.italic ? "italic" : "normal",
                  textDecoration: element.underline?.enabled
                    ? `${element.underline.type} underline`
                    : "none",
                }}
              >
                {element.text}
              </span>
            )}
            {element.type === "Image" && (
              <img
                src={element.src}
                alt="Element Preview"
                style={{ width: "100%", padding: element.padding || "5px", margin: element.margin || "10px", borderRadius: element.borderRadius || "20", border: element.border || "1px solid #fff", opacity: element.opacity || "1", zIndex: element.zIndex || "10", height: "100%" }}
              />
            )}
            {element.type === "Heading" && (
              <h1
                style={{
                  fontSize: element.fontSize || "32px",
                  backgroundColor: element.backgroundColor || "#ffffff",
                  height: element.height || "100%", margin: element.margin || "10px",
                  // alignContent: "center",
                  fontFamily: element.fontFamily,
                  border: element.border || "1px solid #fff", padding: element.padding || "5px",
                  width: "100%", opacity: element.opacity || "1", zIndex: element.zIndex || "10", borderRadius: element.borderRadius || "20",
                  fontWeight: element.bold ? "bold" : "normal",
                  fontStyle: element.italic ? "italic" : "normal",
                  textDecoration: element.underline.enabled
                    ? `${element.underline.type} underline`
                    : "none",
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
                  color: element.color || "#007bff", margin: element.margin || "10px",
                  backgroundColor: element.backgroundColor || "#ffffff",
                  height: "100%", borderRadius: element.borderRadius || "20",
                  border: element.border || "1px solid #fff",
                  // alignContent: "center",
                  zIndex: element.zIndex || "10",
                  fontFamily: element.fontFamily,
                  width: "100%", opacity: element.opacity || "1",
                  fontWeight: element.bold ? "bold" : "normal", padding: element.padding || "5px",
                  fontStyle: element.italic ? "italic" : "normal",
                  textDecoration: element.underline.enabled
                    ? `${element.underline.type} underline`
                    : "none",
                }}
                onClick={(e) => e.preventDefault()}
              >
                {element.text}
              </a>
            )}
    {element.type === "Video" && (
  <video
    src={element.src}
    controls={element.controls}
    autoPlay={element.autoplay}
    loop={element.loop}
    style={{
      position: "absolute",
      // top: `${element.position?.top || 0}px`,
      // left: `${element.position?.left || 0}px`,
      width: element.width || "320px",
      height: element.height || "240px",
      opacity: element.opacity || "1",
      zIndex: element.zIndex || "10",
      border: element.border || "none",
    }}
  />
)}

{element.type === "Audio" && (
  <audio
    src={element.src}
    controls={element.controls}
    autoPlay={element.autoplay}
    loop={element.loop}
    style={{
      position: "absolute",
      // top: `${element.position?.top || 0}px`,
      // left: `${element.position?.left || 0}px`,
      width: element.width || "300px",
      opacity: element.opacity || "1",
      zIndex: element.zIndex || "10",
    }}
  />
)}


            {/* {element.type === "Marquee" && (
              <marquee
                behavior="scroll"
                direction={element.direction || "left"}
                style={{
                  backgroundColor: element.backgroundColor || "#ffffff",margin: element.margin || "10px",
                  height: "100%",
                  alignContent: "center",
                  width: "100%",borderRadius: element.borderRadius || "20",
                  fontFamily: element.fontFamily,
                  border: element.border || "1px solid #fff",padding: element.padding || "5px",
                  speed: element.speed || "100", opacity: element.opacity || "1", zIndex: element.zIndex || "10",
                  fontWeight: element.bold ? "bold" : "normal",
                  fontStyle: element.italic ? "italic" : "normal",
                  textDecoration: element.underline.enabled
                    ? `${element.underline.type} underline`
                    : "none",
                }}
              >
                {element.text}
              </marquee>
            )} */}
            {element.type === "Div" && (
              <div
                style={{
                  backgroundColor: element.backgroundColor || "#cccccc",
                  width: "100%", margin: element.margin || "10px", padding: element.padding || "5px",
                  height: "100%", borderRadius: element.borderRadius || "20",
                  border: element.border || "1px solid #000", opacity: element.opacity || "1", zIndex: element.zIndex || "10",
                }}
              />
            )}
            {element.type === "List" &&
              Array.isArray(element.items) && (
                <ul style={{
                  listStyleType: element.style || "disc",
                  opacity: element.opacity || "1",
                  zIndex: element.zIndex || "10",
                  margin: element.margin || "10px",
                  fontFamily: element.fontFamily,
                  gap: element.gap,
                  color: element.color || "#ffffff",
                  backgroundColor: element.backgroundColor || "#ffffff",
                  display: element.direction === "horizontal" ? "flex" : "block", // Flex for horizontal, block for vertical
                  border: element.border || "1px solid #fff",
                  fontWeight: element.bold ? "bold" : "normal",
                  padding: element.padding || "5px",
                  fontStyle: element.italic ? "italic" : "normal",
                  borderRadius: element.borderRadius || "20",
                  //alignContent: "flex-start";
                  textDecoration: element.underline.enabled
                    ? `${element.underline.type} underline`
                    : "none",
                }}>
                  {element.items.map((item, index) => (
                    <li key={index} style={{ margin: "10px" }}>{item}</li>
                  ))}
                </ul>
              )}
            {element.type === "Dash" && (
              <hr
                style={{
                  width: element.width || "100px",
                  height: element.height || "2px",
                  backgroundColor: element.backgroundColor || "#ff0000",
                  border: element.border,
                  //  padding: element.padding || "5px",
                  // margin: element.margin || "10px",
                  alignContent: "normal",
                  size: element.size, borderRadius: element.borderRadius || "20",
                  opacity: element.opacity || "1", zIndex: element.zIndex || "10", noShade: element.noShade || "noshade", color: element.color,
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
