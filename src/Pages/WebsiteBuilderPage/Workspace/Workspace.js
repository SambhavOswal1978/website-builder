import React from "react";
import "./Workspace.css";

const Workspace = ({ elements, onElementSelect }) => {
  return (
    <div className="workspace">
      <h2>Workspace</h2>
      <div className="workspace-content">
        {Object.values(elements).map((element) => (
          <div
            key={element.id}
            className="workspace-item"
            onClick={() => onElementSelect(element.id)}
            style={{
              textAlign: element.type === "Textbox" || element.type === "Header" || element.type === "Marquee" ? element.alignment : "", // Apply text alignment to text-based elements
              fontFamily: element.font,
              fontSize: element.size,
              whiteSpace: element.type === "Marquee" ? "nowrap" : "normal", // Ensure no wrapping for marquee
              animation: element.type === "Marquee" ? `marquee ${element.speed} linear infinite` : "none",
              display: element.type === "Image" ? "block" : "inline-block", // Ensure image display block for alignment
              margin: element.type === "Image" && element.alignment === "center" ? "0 auto" : "", // Center image if alignment is center
            }}
          >
            {element.type === "Textbox" && (
              <input
                type="text"
                placeholder={element.placeholder}
                readOnly
                style={{
                  width: "100%",
                }}
              />
            )}
            {element.type === "Image" && (
              <img
                src={element.src}
                alt={element.alt}
                style={{
                  width: element.size,
                  display: element.alignment === "center" ? "block" : "inline-block", // Block display for centering
                  marginLeft: element.alignment === "center" ? "auto" : "", // Apply auto margin to center
                  marginRight: element.alignment === "center" ? "auto" : "", // Apply auto margin to center
                }}
              />
            )}
            {element.type === "Header" && <h1>{element.text}</h1>}
            {element.type === "Marquee" && <marquee>{element.text}</marquee>}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Workspace;
