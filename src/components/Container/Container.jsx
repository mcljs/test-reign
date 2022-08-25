import React from "react";

const Container = ({ children, className }) => {
  return (
    <div
      className={`relative container max-w-7xl mx-auto px-4 mb-8 lg:mb-0  ${
        className ? className : ""
      }`}
    >
      {children}
    </div>
  );
};

export default Container;
