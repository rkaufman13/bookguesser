export const GameOver = ({
  currentScore,
  startGame,
  highScore,
  handleOpenModal,
}) => {
  return (
    <div>
      <h1>Game over!</h1> You scored{" "}
      <span className="score">{currentScore}</span> points.
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
