import React from "react";
import "./ElementsList.css";

const defaultElements = {
  textbox: {
    type: "Textbox",
    text: "Sample Text",
    url : '/Icons/builder/paragraph.svg',
  },
  image: {
    type: "Image",
    src: "https://via.placeholder.com/100",
    url : '/Icons/builder/image.svg',
  },
  heading: {
    type: "Heading",
    text: "Sample Heading",
    url : '/Icons/builder/heading.svg',
  },
  // button: {
  //   type: "Button",
  //   text: "Click Me",
  // },
  link: {
    type: "Link",
    text: "Visit Here",
    href: "#",
    url : '/Icons/builder/link.svg',
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
    url : '/Icons/builder/div.svg',
    
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
    url : '/Icons/builder/video.svg',
  },
  audio: {
    type: "Audio",
    src: "https://sample-videos.com/audio/mp3/crowd-cheering.mp3",
    autoplay: false,
    controls: true,
    loop: false,
    url : '/Icons/builder/audio.svg',
  },
  list: {
    type: "List",
    items: ["Item 1", "Item 2", "Item 3"],
    style: "disc",
    alignment: "left",
    url : '/Icons/builder/list.svg',
    direction: "vertical", // Default direction
  },
  
  Dash: { 
    type: "Dash",
    name: "Dash" ,
    url : '/Icons/builder/dash.svg',
  },
};

const ElementsList = ({ onElementAdd }) => {
  const handleDragStart = (e, type) => {
    e.dataTransfer.setData("elementType", type); // Pass the type of element
  };

  return (
    <div >
      <p style={{margin: '10px 0 0 0', textAlign:'center', fontSize:20, fontWeight:'bold'}}>Elements</p>
      <div className="elements-list">
        {Object.keys(defaultElements).map((key) => (
          // <div
          //   key={key}
          //   className="element-item"
          //   draggable
          //   onDragStart={(e) => handleDragStart(e, key)}
          // >
            <div 
              draggable 
              key={key}
              className="element-item"
              onDragStart={(e) => handleDragStart(e, key)}
              style={{ cursor: "grab", color: "#081A51", fontSize: '14px', fontWeight: 500, backgroundColor: 'white', display: "flex", flexDirection: 'column', alignItems: 'center', borderRadius:10, border: '1px rgba(0, 0, 0, 0.10) solid', width:'90%'}}>
              <div style={{backgroundColor:'#F3F4F6', textAlign:'center', width:'100%', borderRadius:'10px 10px 0 0', padding:'8px 0'}}> <img  src={defaultElements[key].url} style={{ height: '35px', width: '35px', pointerEvents:'none' }} ></img> </div>
              <div style={{padding:'8px 12px'}}>
                  {defaultElements[key].type} 
              </div>
          {/* </div> */}
            {/* {defaultElements[key].type} */}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ElementsList;
