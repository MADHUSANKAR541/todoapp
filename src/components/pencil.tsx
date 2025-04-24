import React from "react";
import "./pencil.scss"; // Ensure this path is correct based on your project structure

const CoffeeLoader = () => {
  return (
    <div className="loader">
      <div className="container">
        <div className="text">
        Restarting , have a tea break
        </div>
        <div className="coffee-header">
          <div className="coffee-header__buttons"></div>
          <div className="coffee-header__display"></div>
          <div className="coffee-header__details"></div>
        </div>
        <div className="coffee-medium">
          <div className="coffee-medium__exit"></div>
          <div className="coffee-medium__arm"></div>
          <div className="coffee-medium__liquid"></div>
          <div className="smoke one"></div>
          <div className="smoke two"></div>
          <div className="smoke three"></div>
          <div className="smoke four"></div>
          <div className="coffee-medium__cup"></div>
        </div>

      </div>
    </div>
  );
};

export default CoffeeLoader;
