import React from "react";

export const Spinner = ({ loaded, showTextCover }) => {
  return (
    <div
      className="spinner"
      style={{
        display: !loaded && !showTextCover ? "block" : "none",
        fontSize: "24px",
      }}
    >
      <div className="lds-dual-ring"></div>
    </div>
  );
};
