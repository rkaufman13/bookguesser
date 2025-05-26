export const Score = ({ highScore, currentScore }) => {
  return (
    <>
      {currentScore ? (
        <>
          Your current score: <span className="score">{currentScore}</span>
        </>
      ) : (
        <></>
      )}
      {highScore ? (
        <>
          {" "}
          Your high score: <span className="score">{highScore}</span>
        </>
      ) : (
        <></>
      )}
    </>
  );
};
