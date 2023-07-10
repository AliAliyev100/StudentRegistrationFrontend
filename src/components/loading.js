import React, { useState, useEffect } from "react";
import "../css/LoadingPage.css"; // Import the CSS file for styling

const LoadingPage = () => {
  const [dots, setDots] = useState("");

  useEffect(() => {
    const interval = setInterval(() => {
      setDots((prevDots) => {
        if (prevDots.length >= 3) {
          return "";
        } else {
          return prevDots + ".";
        }
      });
    }, 500); // Adjust the interval duration (in milliseconds) as desired

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="loading-page">
      <div className="spinner"></div>
      <h2 id="loadingtext">Loading{dots}</h2>
    </div>
  );
};

export default LoadingPage;
