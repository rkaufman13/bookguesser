import React from "react";

export const NewGame = ({ startGame }) => {
  return (
    <div className="new-game-parent">
      <div className="new-game-container">
        Welcome! In this game, you are guessing when books were published. Try
        for the highest score!
        <button onClick={startGame}>Start</button>
      </div>
    </div>
  );
};
