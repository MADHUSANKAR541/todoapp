import React from "react";
import "./his.scss"; // Make sure this path is correct

const Loader: React.FC = () => {
  return (
    <div className="loaderWrapper">
      <div className="loader">
        {[1, 2, 3, 4].map((num) => (
          <div key={num} className={`box box-${num}`}>
            <div className="side-left"></div>
            <div className="side-right"></div>
            <div className="side-top"></div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Loader;
