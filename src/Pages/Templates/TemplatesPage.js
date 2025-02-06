import React, { useState } from "react";
import { useNavigate } from "react-router";
import "./TemplatesPage.css";

const templates = [
  {
    name: "Resume Template",
    description: "Professional resume layout",
    file: "Resume.wbproj",
  },
  {
    name: "Business Ad",
    description: "Business advertisement layout",
    file: "business-ad-template.wbproj",
  },
  {
    name: "Portfolio",
    description: "Creative portfolio design",
    file: "portfolio-template.wbproj",
  },
  {
    name: "Event",
    description: "Event announcement layout",
    file: "event-template.wbproj",
  },
  {
    name: "Blog",
    description: "Blog post layout",
    file: "blog-template.wbproj",
  },
];

const TemplatesPage = () => {
  const navigate = useNavigate();
  const [selectedTemplate, setSelectedTemplate] = useState(null);

  const handleSelectTemplate = (templateFile) => {
    setSelectedTemplate(templateFile);
  };

  const handleEditSelectedTemplate = async () => {
    if (!selectedTemplate) {
      alert("Please select a template to edit.");
      return;
    }

    try {
      // Fetch and parse the selected template file
      const response = await fetch(`./Templates/${selectedTemplate}`);
      const templateText = await response.text();
      const templateData = JSON.parse(templateText);

      // Navigate to WebsiteBuilder with loaded template data
      navigate("/websitebuilder", { state: { type: "open", data: templateData } });
    } catch (error) {
      console.error("Error loading template:", error);
      alert("Failed to load the selected template. Please try again.");
    }
  };

  return (
    <div className="templates-page">
      <h1>Select a Template</h1>
      <div className="templates-grid">
        {templates.map((template, index) => (
          <div
            key={index}
            className={`template-card ${
              selectedTemplate === template.file ? "selected" : ""
            }`}
            onClick={() => handleSelectTemplate(template.file)}
          >
            <h3>{template.name}</h3>
            <p>{template.description}</p>
          </div>
        ))}
      </div>
      <button
        className="select-edit-btn"
        onClick={handleEditSelectedTemplate}
        disabled={!selectedTemplate}
      >
        Select and Edit
      </button>
    </div>
  );
};

export default TemplatesPage;
