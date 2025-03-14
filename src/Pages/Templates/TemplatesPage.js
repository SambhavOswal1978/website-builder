import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import "./TemplatesPage.css";

const templates = [
  {
    name: "Resume Template",
    description: "Professional resume layout",
    file: "Resume.wbproj",
    image: "/Templates/Resume-cover.png",
  },
  // {
  //   name: "Business Ad",
  //   description: "Business advertisement layout",
  //   file: "business-ad-template.wbproj",
  //   image: "/Templates/business-ad-cover.png",
  // },
  // {
  //   name: "Portfolio",
  //   description: "Creative portfolio design",
  //   file: "portfolio-template.wbproj",
  //   image: "/Templates/portfolio-cover.png",
  // },
  {
    name: "Event",
    description: "Event announcement layout",
    file: "event-template.wbproj",
    image: "/Templates/Event-cover.png",
  },
  {
    name: "Blog",
    description: "Blog post layout",
    file: "blog-template.wbproj",
    image: "/Templates/blog-cover.png",
  },
];

const TemplatesPage = () => {
  const navigate = useNavigate();
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  useEffect(() => {
    document.title = 'Select Templates';
  }, []);
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
      const response = await fetch(`../Templates/${selectedTemplate}`);
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
            { selectedTemplate === template.file && <div className="selected-template">
              <button
                className="select-edit-btn"
                onClick={handleEditSelectedTemplate}
                disabled={!selectedTemplate}
              >
                Use this template
              </button>
            </div>}
            <img src={template.image}></img>
            <p className="template-name">{template.name}</p>
            <p className="template-description">{template.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TemplatesPage;
