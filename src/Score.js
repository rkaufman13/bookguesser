export const Score = ({ scores }) => {
  return (
    <>
      {scores.current ? (
        <>
          Your current score: <span className="score">{scores.current}</span>
        </>
      ) : (
        <></>
      )}
      {scores.high ? (
        <>
          {" "}
          Your high score: <span className="score">{scores.high}</span>
        </>
      ) : (
        <></>
      )}
    </>
  );
};
