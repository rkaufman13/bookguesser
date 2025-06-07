import React, { useState, useEffect } from "react";
import {
  allBooksWithDates,
  chooseFirstBook,
  chooseNextBook,
  checkForGameOver,
  calculateScore,
  calculateHighScore,
} from "./consts";
import BooksDisplay from "./BooksDisplay";
import ShareDialog from "./ShareDialog";
import { GameOver } from "./GameOver";
import { Score } from "./Score";
import { NewGame } from "./NewGame";

const Main = () => {
  const [allBooksForGame, setAllBooksForGame] = useState(allBooksWithDates());

  const currentBook = chooseNextBook(allBooksForGame);
  const score = calculateScore(allBooksForGame);
  const highScore = calculateHighScore(score);

  const [currentGame, setCurrentGame] = useState(false);
  const gameOver = checkForGameOver(allBooksForGame, currentGame);

  const [shareModalVisible, setShareModalVisible] = useState(false);

  useEffect(() => {
    const activeBooks = allBooksForGame.filter((book) => book.correct);
    if (activeBooks.length === 0) {
      chooseFirstBook(allBooksForGame, setAllBooksForGame);
    }
  }, [allBooksForGame, currentBook]);

  const handleOpenModal = () => {
    setShareModalVisible(!shareModalVisible);
  };

  const clearBookList = () => {
    setAllBooksForGame(allBooksWithDates());
  };

  const startGame = () => {
    clearBookList();
    setCurrentGame(true);
  };

  return (
    <div className="main">
      {shareModalVisible && (
        <ShareDialog
          shareModalVisible={shareModalVisible}
          setShareModalVisible={setShareModalVisible}
          score={score}
        />
      )}

      {!currentGame && <NewGame startGame={startGame} />}

      <div>
        {!gameOver && currentGame ? (
          <Score highScore={highScore} currentScore={score} />
        ) : gameOver ? (
          <GameOver
            score={score}
            highScore={highScore}
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
