export const Score = ({ currentScore, highScore }) => {
  return (
    <>
      Your current score: <span className="score">{currentScore}</span>
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
