import React from "react";
import { useNavigate } from "react-router-dom";

const MainApp = ({ username }) => {
  const navigate = useNavigate();

  const redirectToBuilder = () => {
    navigate("/website-builder"); // Redirects to WebsiteBuilder page
  };

  return (
    <div style={{ padding: "20px", textAlign: "center" }}>
      <h1>Welcome, {username}</h1>
      <p>This is your dashboard. Ready to build your website?</p>
      <button
        onClick={redirectToBuilder}
        style={{
          padding: "10px 20px",
          fontSize: "16px",
          backgroundColor: "#4caf50",
          color: "white",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
          marginTop: "20px",
        }}
      >
        Go to Website Builder
      </button>
    </div>
  );
};

export default MainApp;
