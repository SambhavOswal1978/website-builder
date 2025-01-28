import React from "react";
import "./PropertiesSection.css";

const PropertiesSection = ({ element, onPropertyChange, onDeleteElement }) => {
  if (!element) return null;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    onPropertyChange(name, value);
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        onPropertyChange("src", reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const renderProperties = () => {
    const commonProperties = (
      <>
        <div className="property-group">
          <label htmlFor="width">Width:</label>
          <input
            type="text"
            id="width"
            name="width"
            value={element.width || ""}
            onChange={handleInputChange}
          />
        </div>
        <div className="property-group">
          <label htmlFor="height">Height:</label>
          <input
            type="text"
            id="height"
            name="height"
            value={element.height || ""}
            onChange={handleInputChange}
          />
        </div>
        <div className="property-group">
          <label htmlFor="alignment">Alignment:</label>
          <select
            id="alignment"
            name="alignment"
            value={element.alignment || "left"}
            onChange={handleInputChange}
          >
            <option value="left">Left</option>
            <option value="center">Center</option>
            <option value="right">Right</option>
          </select>
        </div>
        <div className="property-group">
          <label htmlFor="border">Border:</label>
          <input
            type="text"
            id="border"
            name="border"
            value={element.border || "1px solid #000"}
            onChange={handleInputChange}
          />
        </div>
        <div className="property-group">
          <label htmlFor="opacity">Opacity:</label>
          <input
            type="range"
            id="opacity"
            name="opacity"
            min="0"
            max="1"
            step="0.01"
            value={element.opacity || "1"}
            onChange={handleInputChange}
          />
          <span>{element.opacity || "1"}</span>
        </div>
        <div className="property-group">
          <label htmlFor="zIndex">Z-Index:</label>
          <input
            type="number"
            id="zIndex"
            name="zIndex"
            // min="0" // Allow Z-Index to be 0
            // max="100" // Maximum value (adjustable as needed)
            // step="1" // Increment by 1
            value={element.zIndex !== undefined ? parseInt(element.zIndex, 10) : 16} // Explicitly check for undefined
            onChange={(e) => onPropertyChange("zIndex", parseInt(e.target.value, 10))} // Update state
          />
          {/* <span>{element.zIndex !== undefined ? parseInt(element.zIndex, 10) : 16}</span> Display current value */}
        </div>


      </>
    );

    switch (element.type) {
      case "Textbox":
        return (
          <>
            {commonProperties}
            <div className="property-group">
              <label htmlFor="text">Text:</label>
              <input
                type="text"
                id="text"
                name="text"
                value={element.text || ""}
                onChange={handleInputChange}
              />
            </div>
            <div className="property-group">
              <label htmlFor="fontSize">Font Size:</label>
              <input
                type="number"
                id="fontSize"
                name="fontSize"
                value={parseInt(element.fontSize, 10) || 16}
                onChange={(e) =>
                  onPropertyChange("fontSize", `${e.target.value}px`)
                }
              />
            </div>
            <div className="property-group">
              <label htmlFor="color">Text Color:</label>
              <input
                type="color"
                id="color"
                name="color"
                value={element.color || "#000000"}
                onChange={handleInputChange}
              />
            </div>
            <div className="property-group">
              <label htmlFor="backgroundColor">Background Color:</label>
              <input
                type="color"
                id="backgroundColor"
                name="backgroundColor"
                value={element.backgroundColor || "#ffffff"}
                onChange={handleInputChange}
              />
              <input
                type="text"
                id="backgroundColor"
                name="backgroundColor"
                value={element.backgroundColor || "#000000"}
                onChange={handleInputChange}
              />
            </div>

          </>
        );
      case "Image":
        return (
          <>
            {commonProperties}
            <div className="property-group">
              <label htmlFor="src">Source URL:</label>
              <input
                type="text"
                id="src"
                name="src"
                value={element.src || ""}
                onChange={handleInputChange}
              />
            </div>
            <div className="property-group">
              <label htmlFor="uploadImage">Upload Image:</label>
              <input
                type="file"
                id="uploadImage"
                accept="image/*"
                onChange={handleImageUpload}
              />
            </div>
          </>
        );
      case "Div":
        return (
          <>
            {commonProperties}
            <div className="property-group">
              <label htmlFor="backgroundColor">Background Color:</label>
              <input
                type="color"
                id="backgroundColor"
                name="backgroundColor"
                value={element.backgroundColor || "#cccccc"}
                onChange={handleInputChange}
              />
              <input
                type="text"
                id="backgroundColor"
                name="backgroundColor"
                value={element.backgroundColor || "#000000"}
                onChange={handleInputChange}
              />
            </div>

            <div className="property-group">
              <label htmlFor="zIndex">Z-Index:</label>
              <input
                type="number"
                id="zIndex"
                name="zIndex"
                value={element.zIndex || 1}
                onChange={handleInputChange}
              />
            </div>

          </>
        );
      case "Heading":
        return (
          <>
            {commonProperties}
            <div className="property-group">
              <label htmlFor="text">Text:</label>
              <input
                type="text"
                id="text"
                name="text"
                value={element.text || "Sample Heading"}
                onChange={handleInputChange}
              />
            </div>
            <div className="property-group">
              <label htmlFor="fontSize">Font Size:</label>
              <input
                type="number"
                id="fontSize"
                name="fontSize"
                value={parseInt(element.fontSize, 10) || 32}
                onChange={(e) =>
                  onPropertyChange("fontSize", `${e.target.value}px`)
                }
              />
            </div>
            <div className="property-group">
              <label htmlFor="color">Text Color:</label>
              <input
                type="color"
                id="color"
                name="color"
                value={element.color || "#000000"}
                onChange={handleInputChange}
              />
            </div>
            <div className="property-group">
              <label htmlFor="backgroundColor">Background Color:</label>
              <input
                type="color"
                id="backgroundColor"
                name="backgroundColor"
                value={element.backgroundColor || "#ffffff"}
                onChange={handleInputChange}
              />
              <input
                type="text"
                id="backgroundColor"
                name="backgroundColor"
                value={element.backgroundColor || "#000000"}
                onChange={handleInputChange}
              />
            </div>

          </>
        );
      case "Link":
        return (
          <>
            {commonProperties}
            <div className="property-group">
              <label htmlFor="text">Display Text:</label>
              <input
                type="text"
                id="text"
                name="text"
                value={element.text || "Link"}
                onChange={handleInputChange}
              />
            </div>
            <div className="property-group">
              <label htmlFor="href">URL:</label>
              <input
                type="text"
                id="href"
                name="href"
                value={element.href || "#"}
                onChange={handleInputChange}
              />
            </div>
            <div className="property-group">
              <label htmlFor="color">Text Color:</label>
              <input
                type="color"
                id="color"
                name="color"
                value={element.color || "#000000"}
                onChange={handleInputChange}
              />
            </div>
            <div className="property-group">
              <label htmlFor="backgroundColor">Background Color:</label>
              <input
                type="color"
                id="backgroundColor"
                name="backgroundColor"
                value={element.backgroundColor || "#ffffff"}
                onChange={handleInputChange}
              />
              <input
                type="text"
                id="backgroundColor"
                name="backgroundColor"
                value={element.backgroundColor || "#000000"}
                onChange={handleInputChange}
              />
            </div>
            <div className="property-group">
              <label htmlFor="fontSize">Font Size:</label>
              <input
                type="number"
                id="fontSize"
                name="fontSize"
                value={parseInt(element.fontSize, 10) || 32}
                onChange={(e) =>
                  onPropertyChange("fontSize", `${e.target.value}px`)
                }
              />
            </div>

          </>
        );
      // case "Container":
      //   return (
      //     <>
      //       {commonProperties}
      //       <div className="property-group">
      //         <label htmlFor="backgroundColor">Background Color:</label>
      //         <input
      //           type="color"
      //           id="backgroundColor"
      //           name="backgroundColor"
      //           value={element.backgroundColor || "#f0f0f0"}
      //           onChange={handleInputChange}
      //         />
      //       </div>

      //     </>
      //   );
      case "Video":
      case "Audio":
        return (
          <>
            {commonProperties}
            <div className="property-group">
              <label htmlFor="src">Source URL:</label>
              <input
                type="text"
                id="src"
                name="src"
                value={element.src || ""}
                onChange={handleInputChange}
              />
            </div>
            <div className="property-group">
              <label htmlFor="autoplay">Autoplay:</label>
              <input
                type="checkbox"
                id="autoplay"
                name="autoplay"
                checked={element.autoplay || false}
                onChange={(e) => onPropertyChange("autoplay", e.target.checked)}
              />
            </div>
            <div className="property-group">
              <label htmlFor="loop">Loop:</label>
              <input
                type="checkbox"
                id="loop"
                name="loop"
                checked={element.loop || false}
                onChange={(e) => onPropertyChange("loop", e.target.checked)}
              />
            </div>
          </>
        );
      // case "Table":
      //   return (
      //     <>
      //       {commonProperties}
      //       <div className="property-group">
      //         <label htmlFor="rows">Rows:</label>
      //         <input
      //           type="number"
      //           id="rows"
      //           name="rows"
      //           value={element.rows || 3}
      //           onChange={handleInputChange}
      //         />
      //       </div>
      //       <div className="property-group">
      //         <label htmlFor="columns">Columns:</label>
      //         <input
      //           type="number"
      //           id="columns"
      //           name="columns"
      //           value={element.columns || 3}
      //           onChange={handleInputChange}
      //         />
      //       </div>
      //       <div className="property-group">
      //         <label htmlFor="color">Text Color:</label>
      //         <input
      //           type="color"
      //           id="color"
      //           name="color"
      //           value={element.color || "#000000"}
      //           onChange={handleInputChange}
      //         />
      //       </div>

      //       <div className="property-group">
      //         <label htmlFor="border">Border:</label>
      //         <input
      //           type="text"
      //           id="border"
      //           name="border"
      //           value={element.border || "1px solid #ccc"}
      //           onChange={handleInputChange}
      //         />
      //       </div>
      //     </>
      //   );
      case "Marquee":
        return (
          <>
            {commonProperties}
            <div className="property-group">
              <label htmlFor="text">Text:</label>
              <input
                type="text"
                id="text"
                name="text"
                value={element.text || ""}
                onChange={handleInputChange}
              />
            </div>
            <div className="property-group">
              <label htmlFor="speed">Speed:</label>
              <select
                id="speed"
                name="speed"
                value={element.speed || "normal"}
                onChange={handleInputChange}
              >
                <option value="30">Slow</option>
                <option value="100">Normal</option>
                <option value="200">Fast</option>
              </select>
            </div>
            <div className="property-group">
              <label htmlFor="direction">Direction:</label>
              <select
                id="direction"
                name="direction"
                value={element.direction || "left"}
                onChange={handleInputChange}
              >
                <option value="left">Left</option>
                <option value="right">Right</option>
                <option value="up">Up</option>
                <option value="down">Down</option>
              </select>
            </div>
            <div className="property-group">
              <label htmlFor="color">Text Color:</label>
              <input
                type="color"
                id="color"
                name="color"
                value={element.color || "#000000"}
                onChange={handleInputChange}
              />
            </div>
            <div className="property-group">
              <label htmlFor="backgroundColor">Background Color:</label>
              <input
                type="color"
                id="backgroundColor"
                name="backgroundColor"
                value={element.backgroundColor || "#ffffff"}
                onChange={handleInputChange}
              />
              <input
                type="text"
                id="backgroundColor"
                name="backgroundColor"
                value={element.backgroundColor || "#000000"}
                onChange={handleInputChange}
              />
            </div>
            <div className="property-group">
              <label htmlFor="fontSize">Font Size:</label>
              <input
                type="number"
                id="fontSize"
                name="fontSize"
                value={parseInt(element.fontSize, 10) || 32}
                onChange={(e) =>
                  onPropertyChange("fontSize", `${e.target.value}px`)
                }
              />
            </div>
          </>
        );
      case "List":
        return (
          <>
            {commonProperties}
            <div className="property-group">
              <label htmlFor="items">List Items (comma-separated):</label>
              <textarea
                id="items"
                name="items"
                value={element.items?.join(", ") || ""}
                onChange={(e) =>
                  onPropertyChange(
                    "items",
                    e.target.value.split(",").map((item) => item) // No `trim()` here to preserve whitespace
                  )
                }
                rows="4"
                placeholder="Enter list items separated by commas (e.g., Item 1, Item 2, Item 3)"
              />
            </div>
            <div className="property-group">
              <label htmlFor="listStyleType">List Style:</label>
              <select
                id="listStyleType"
                name="style"
                value={element.style || "disc"}
                onChange={handleInputChange}
              >
                <option value="disc">Disc</option>
                <option value="circle">Circle</option>
                <option value="square">Square</option>
              </select>
            </div>
            <div className="property-group">
              <label htmlFor="direction">List Direction:</label>
              <select
                id="direction"
                name="direction"
                value={element.direction || "vertical"} // Default to vertical
                onChange={(e) => onPropertyChange("direction", e.target.value)}
              >
                <option value="vertical">Vertical</option>
                <option value="horizontal">Horizontal</option>
              </select>
            </div>
            <div className="property-group">
              <label htmlFor="fontSize">Font Size:</label>
              <input
                type="number"
                id="fontSize"
                name="fontSize"
                value={parseInt(element.fontSize, 10) || 32}
                onChange={(e) =>
                  onPropertyChange("fontSize", `${e.target.value}px`)
                }
              />
            </div>
            

          </>
        );
      case "Dash":
        return (
          <>


            <div className="property-group">
              <label htmlFor="width">Width:</label>
              <input
                type="text"
                id="width"
                name="width"
                value={element.width || "100%"}
                onChange={handleInputChange}
              />
            </div>
            <div className="property-group">
              <label htmlFor="height">Height:</label>
              <input
                type="text"
                id="height"
                name="height"
                value={element.height || "2px"}
                onChange={handleInputChange}
              />
            </div>

            <div className="property-group">
              <label htmlFor="noshade">No Shade:</label>
              <input
                type="checkbox"
                id="noshade"
                name="noshade"
                checked={element.noshade || false}
                onChange={(e) => handleInputChange({ target: { name: 'noshade', value: e.target.checked } })}
              />
            </div>

            <div className="property-group">
              <label htmlFor="zIndex">Z-Index:</label>
              <input
                type="text"
                id="zIndex"
                name="zIndex"
                value={element.zIndex || "1"}
                onChange={handleInputChange}
              />
            </div>
            <div className="property-group">
              <label htmlFor="backgroundColor">Background Color:</label>
              <input
                type="color"
                id="backgroundColor"
                name="backgroundColor"
                value={element.backgroundColor || "#ffffff"}
                onChange={handleInputChange}
              />
              <input
                type="text"
                id="backgroundColor"
                name="backgroundColor"
                value={element.backgroundColor || "#000000"}
                onChange={handleInputChange}
              />
            </div>
            <div className="property-group">
              <label htmlFor="opacity">Opacity:</label>
              <input
                type="range"
                id="opacity"
                name="opacity"
                min="0"
                max="1"
                step="0.01"
                value={element.opacity || "1"}
                onChange={handleInputChange}
              />
              <span>{element.opacity || "1"}</span>
            </div>
            <div className="property-group">
              <label htmlFor="border">Border:</label>
              <input
                type="text"
                id="border"
                name="border"
                value={element.border || "1px solid #000"}
                onChange={handleInputChange}
              />
            </div>
          </>
        );


      default:
        return commonProperties;
    }
  };

  return (
    <div className="properties-section">
      <div className="element-id">
        <strong>Element ID:</strong> {element.id}
      </div>
      <h3>Properties</h3>
      {renderProperties()}
      <button className="delete-btn" onClick={onDeleteElement}>
        Delete Element
      </button>
    </div>
  );
};

export default PropertiesSection;
