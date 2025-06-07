export const GameOver = ({ score, highScore, startGame, handleOpenModal }) => {
  return (
    <div>
      <h1>Game over!</h1> You scored <span className="score">{score}</span>{" "}
      points.
      {highScore ? (
        <>
          {" "}
          <br /> Your high score is: <span className="score">{highScore}</span>
        </>
      ) : (
        <></>
      )}
      <br />
      <button onClick={startGame}>Play again?</button>{" "}
      <button onClick={handleOpenModal}>Share?</button>
    </div>
  );
};
