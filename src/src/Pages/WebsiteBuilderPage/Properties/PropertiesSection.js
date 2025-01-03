import React from "react";
import "./PropertiesSection.css";

const PropertiesSection = ({ element, onPropertyChange }) => {
  const handleChange = (property) => (e) => {
    onPropertyChange(property, e.target.value);
  };

  const renderInput = (property, value) => {
    if (property === "alignment") {
      return (
        <select value={value} onChange={handleChange(property)}>
          <option value="left">Left</option>
          <option value="center">Center</option>
          <option value="right">Right</option>
        </select>
      );
    } else if (property === "visibility") {
      return (
        <div>
          <label>
            <input
              type="radio"
              name="visibility"
              value="visible"
              checked={value === "visible"}
              onChange={handleChange(property)}
            />
            Visible
          </label>
          <label>
            <input
              type="radio"
              name="visibility"
              value="hidden"
              checked={value === "hidden"}
              onChange={handleChange(property)}
            />
            Hidden
          </label>
        </div>
      );
    } else {
      return <input type="text" value={value} onChange={handleChange(property)} />;
    }
  };

  return (
    <div className="properties-section">
      <h2>Properties</h2>
      {Object.entries(element).map(([key, value]) =>
        key !== "id" && key !== "type" && key !== "position" ? (
          <div key={key} className="property-item">
            <label>{key}:</label>
            {renderInput(key, value)}
          </div>
        ) : null
      )}
    </div>
  );
};

export default PropertiesSection;
