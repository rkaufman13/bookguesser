export const GameOver = ({ scores, startGame, handleOpenModal }) => {
  return (
    <div>
      <h1>Game over!</h1> You scored{" "}
      <span className="score">{scores.current}</span> points.
      {scores.high ? (
        <>
          {" "}
          <br /> Your high score is:{" "}
          <span className="score">{scores.high}</span>
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
