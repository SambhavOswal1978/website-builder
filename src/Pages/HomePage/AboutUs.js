import React from "react";

const AboutUs = () => {
  return (
    <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
      <h1>About Us</h1>

      <section style={{ marginBottom: "20px" }}>
        <h2>Project Overview</h2>
        <p>
          This project is a <strong>No-Code Website Builder</strong>, designed to
          empower users to create websites effortlessly without any coding
          knowledge. It provides drag-and-drop functionality, customizable
          templates, and advanced features like media management and SEO tools.
        </p>
        <p>
          <strong>Purpose:</strong> To simplify the website creation process for
          non-developers and streamline the workflow for developers.
        </p>
        <p>
          <strong>Paper Link:</strong> <a href="https://example.com" target="_blank" rel="noopener noreferrer">Published Paper</a>
        </p>
      </section>

      <section style={{ marginBottom: "20px" }}>
        <h2>Group Information</h2>
        <p>
          <strong>Group Number:</strong> 49
        </p>
        <p>
          <strong>College:</strong> Dr.D.Y.Patil Polytechnic, Kasaba Bawada, Kolhapur
        </p>
        <p>
          <strong>Batch:</strong> 2022-2025
        </p>
      </section>

      <section style={{ marginBottom: "20px" }}>
        <h2>Student Information</h2>
        <strong>Course:</strong> Computer Science | <strong>Passout Year:</strong> 2025
        <ul>
          <li><strong>Name:</strong> Yash Jain </li>
          <li><strong>Name:</strong> Samiksha Pakhare </li>
          <li><strong>Name:</strong> Sambhav Oswal </li>
          <li><strong>Name:</strong> Prithavi Sutar </li>
        </ul>
      </section>

      <section>
        <h2>Feedback</h2>
        <p>
          We value your feedback! Feel free to reach out to us via email:
        </p>
        <p>
          <a href="mailto:g49capstone@gmail.com">Our E-Mail Address</a>
        </p>
      </section>
    </div>
  );
};

export default AboutUs;
