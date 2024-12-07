import React, { useState } from "react";
import "./PropertiesSection.css";

const PropertiesSection = ({ element, onPropertyChange }) => {
  const [image, setImage] = useState(element.src); // To manage image upload state

  // Handle text property changes (alignment, font, size, etc.)
  const handleChange = (property) => (e) => {
    onPropertyChange(property, e.target.value); // Update properties for non-file inputs
  };

  // Handle image file input change
  const handleImageChange = (e) => {
    const file = e.target.files[0]; // Get the selected file
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result); // Update image state
        onPropertyChange("src", reader.result); // Update the 'src' in parent component
      };
      reader.readAsDataURL(file); // Convert image file to base64 string
    }
  };

  return (
    <div className="properties-section">
      <h2>Properties</h2>
      <p><strong>Type:</strong> {element.type}</p>

      {/* Render properties for alignment, font, size, etc. */}
      {Object.keys(element).map(
        (key) =>
          key !== "id" &&
          key !== "type" && (
            <div key={key} className="property-item">
              <label>{key.charAt(0).toUpperCase() + key.slice(1)}:</label>
              {key === "alignment" ? (
                <select
                  value={element[key]}
                  onChange={handleChange(key)}
                >
                  <option value="left">Left</option>
                  <option value="center">Center</option>
                  <option value="right">Right</option>
                </select>
              ) : key === "speed" ? (
                <select
                  value={element[key]}
                  onChange={handleChange(key)}
                >
                  <option value="slow">Slow</option>
                  <option value="normal">Normal</option>
                  <option value="fast">Fast</option>
                  <option value="super fast">Super Fast</option>
                  <option value="stop">Stop</option>
                </select>
              ) : (
                <input
                  type="text"
                  value={element[key]}
                  onChange={handleChange(key)}
                />
              )}
            </div>
          )
      )}

      {/* Image upload input */}
      {element.type === "Image" && (
        <div className="property-item">
          <label>Change Image:</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange} // On change, update image
          />
          <img
            src={image}
            alt="Element Preview"
            style={{ width: "150px", marginTop: "10px" }}
          />
        </div>
      )}
    </div>
  );
};

export default PropertiesSection;
