import Cookies from "js-cookie"; // Add js-cookie for cookie management
import React, { useEffect, useState } from "react";
import "./LoginModule.css";

const LoginModule = ({ onLogin }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    // Check for existing cookie
    const savedUsername = Cookies.get("username");
    if (savedUsername) {
      const confirmUser = window.confirm(`Is it you, ${savedUsername}?`);
      if (confirmUser) {
        onLogin(savedUsername); // Proceed with saved username
      }
    }
  }, []);

  useEffect(() => {
    document.title = 'Wizzy.dnd';
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Save username in cookies with a 1-month expiration
    Cookies.set("username", username, { expires: 30 });
    alert("Login successful!");
    onLogin(username); // Pass username to the main app
  };

  return (
    <>
      <div className="logo-container">
        <img
          src={"logo.png"}
          className="logoFace"
          alt="No Code Website Builder"
        />
      </div>
      <div className="login-container">
        <img
          src={require("../assets/loginBG.png")}
          alt="Background"
          className="background-img"
        />
        <div className="login-form">
          <h1 className="login-h1">Login</h1>
          <form onSubmit={handleSubmit}>
            <label>
              Username:
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </label>
            <label>
              Password:
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </label>
            <button type="submit" className="login-button">Login</button>
          </form>
        </div>
      </div>
    </>
  );
};

export default LoginModule;
