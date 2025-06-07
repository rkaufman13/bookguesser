import React from "react";

export const FirstTurnHint = ({ isFirstTurn }) => {
  const style = { display: isFirstTurn ? "block" : "none" };
  return (
    <div id="firstTurnHint" style={style}>
      Drag and drop the book into the timeline in the order it was published.{" "}
      <svg
        width="120px"
        height="120px"
        viewBox="0 0 48 48"
        version="1"
        xmlns="http://www.w3.org/2000/svg"
        enable-background="new 0 0 48 48"
        fill="#000000"
      >
        <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
        <g
          id="SVGRepo_tracerCarrier"
          stroke-linecap="round"
          stroke-linejoin="round"
        ></g>
        <g id="SVGRepo_iconCarrier">
          {" "}
          <polygon fill="#9B3D12" points="44,29 30,17.3 30,40.7"></polygon>{" "}
          <path
            fill="#9B3D12"
            d="M6,21V8h8v13c0,2.2,1.8,4,4,4h17v8H18C11.4,33,6,27.6,6,21z"
          ></path>{" "}
        </g>
      </svg>
    </div>
  );
};
