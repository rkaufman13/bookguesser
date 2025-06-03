import React, { useState, useEffect } from "react";
import {
  allBooksWithDates,
  chooseFirstBook,
  chooseNextBook,
  checkForGameOver,
} from "./consts";
import BooksDisplay from "./BooksDisplay";
import ShareDialog from "./ShareDialog";
import { GameOver } from "./GameOver";
import { Score } from "./Score";
import { NewGame } from "./NewGame";

const Main = () => {
  const [allBooksForGame, setAllBooksForGame] = useState(allBooksWithDates());

  const currentBook = chooseNextBook(allBooksForGame);
  const [scores, setScores] = useState({
    current: 0,
    high: parseInt(window.localStorage.getItem("bookGuesserHighScore")) ?? 0,
  });

  const [currentGame, setCurrentGame] = useState(false);
  const gameOver = checkForGameOver(allBooksForGame, currentGame);

  const [shareModalVisible, setShareModalVisible] = useState(false);

  useEffect(() => {
    const activeBooks = allBooksForGame.filter((book) => book.correct);
    if (activeBooks.length === 0) {
      chooseFirstBook(allBooksForGame, setAllBooksForGame);
    }
  }, [allBooksForGame, currentBook]);

  const updateScores = () => {
    debugger;
    console.log(JSON.stringify(scores));
    setScores((prev) => {
      console.log("prev:", JSON.stringify(prev));
      const newScores = { ...prev, current: prev.current++ };
      if (!prev.high || newScores.current >= prev.high) {
        newScores.high = newScores.current;
        window.localStorage.setItem("bookGuesserHighScore", scores.high);
      }
      console.log("new:", JSON.stringify(newScores));
      return newScores;
    });
  };

  const handleOpenModal = () => {
    setShareModalVisible(!shareModalVisible);
  };

  const clearBookList = () => {
    setAllBooksForGame(allBooksWithDates());
  };

  const startGame = () => {
    clearBookList();
    setScores((prev) => {
      const scores = { current: 0, high: prev.high };
      return scores;
    });
    setCurrentGame(true);
  };

  return (
    <div className="main">
      {shareModalVisible && (
        <ShareDialog
          shareModalVisible={shareModalVisible}
          setShareModalVisible={setShareModalVisible}
          score={scores.current}
        />
      )}

      {!currentGame && <NewGame startGame={startGame} />}

      <div>
        {!gameOver && currentGame ? (
          <Score highScore={scores.high} currentScore={scores.current} />
        ) : gameOver ? (
          <GameOver
            scores={scores}
            startGame={startGame}
            handleOpenModal={handleOpenModal}
          />
        ) : (
          ""
        )}
      </div>
      {currentGame && (
        <BooksDisplay
          currentBook={currentBook}
          gameOver={gameOver}
          allBooks={allBooksForGame}
          setAllBooks={setAllBooksForGame}
        ></BooksDisplay>
      )}
    </div>
  );
};

export default Main;
