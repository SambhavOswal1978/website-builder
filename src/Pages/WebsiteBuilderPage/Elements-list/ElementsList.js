import React from "react";
import "./ElementsList.css";

const defaultElements = {
  textbox: {
    type: "Textbox",
    text: "Sample Text",
  },
  image: {
    type: "Image",
    src: "https://via.placeholder.com/100",
  },
  heading: {
    type: "Heading",
    text: "Sample Heading",
  },
  // button: {
  //   type: "Button",
  //   text: "Click Me",
  // },
  link: {
    type: "Link",
    text: "Visit Here",
    href: "#",
  },
  // marquee: {
  //   type: "Marquee",
  //   text: "Scrolling Text",
  //   speed: "normal",
  //   direction: "left",
  // },
  div: {
    type: "Div",
    backgroundColor: "#cccccc",
  },
  // container: {
  //   type: "Container",
  //   backgroundColor: "#f0f0f0",
  //   border: "1px solid #ccc",
  //   width: "300px",
  //   height: "300px",
  // },
  video: {
    type: "Video",
    src: "https://sample-videos.com/video123/mp4/480/asdasdas.mp4",
    autoplay: false,
    controls: true,
    loop: false,
    muted: false,
  },
  audio: {
    type: "Audio",
    src: "https://sample-videos.com/audio/mp3/crowd-cheering.mp3",
    autoplay: false,
    controls: true,
    loop: false,
  },
  list: {
    type: "List",
    items: ["Item 1", "Item 2", "Item 3"],
    style: "disc",
    alignment: "left",
    direction: "vertical", // Default direction
  },
  
  Dash: { 
    type: "Dash",
    name: "Dash" },
};

const ElementsList = ({ onElementAdd }) => {
  const handleDragStart = (e, type) => {
    e.dataTransfer.setData("elementType", type); // Pass the type of element
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
