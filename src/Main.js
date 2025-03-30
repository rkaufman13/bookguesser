import React, { useState } from "react";
import { allBooksWithDates } from "./consts";
import BooksDisplay from "./BooksDisplay";
import ShareDialog from "./ShareDialog";
import { GameOver } from "./GameOver";
import { Score } from "./Score";
import { NewGame } from "./NewGame";

const Main = () => {
  const allBooksForGame = allBooksWithDates();
  const [currentBook, setCurrentBook] = useState();
  const [gameOver, setGameOver] = useState(false);
  const [scores, setScores] = useState({ current: 0, high: 0 });
  const [bookList, setBookList] = useState([]);
  const [currentGame, setCurrentGame] = useState(false);
  const [shareModalVisible, setShareModalVisible] = useState(false);

  const handleOpenModal = () => {
    setShareModalVisible(!shareModalVisible);
  };

  const chooseBook = () => {
    const arrayLength = allBooksForGame.length;
    const randomIndex = Math.floor(Math.random() * arrayLength);
    setCurrentBook(allBooksForGame[randomIndex]);
    allBooksForGame.splice(randomIndex, 1);
  };

  //special case for first turn
  const chooseAndPlaceBook = () => {
    const arrayLength = allBooksForGame.length;
    const randomIndex = Math.floor(Math.random() * arrayLength);
    const startingBook = allBooksForGame[randomIndex];
    allBooksForGame.splice(randomIndex, 1);

    setBookList([startingBook]);
  };

  const clearBookList = () => {
    setBookList([]);
  };

  const startGame = () => {
    clearBookList();
    setScores((prev) => {
      const scores = { current: 0, high: prev.high };
      return scores;
    });
    setCurrentGame(true);
    setGameOver(false);
    chooseAndPlaceBook();
    chooseBook();
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
          <Score scores={scores} />
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
          bookList={bookList}
          currentBook={currentBook}
          gameOver={gameOver}
          setGameOver={setGameOver}
          setBookList={setBookList}
          chooseBook={chooseBook}
          setScores={setScores}
        ></BooksDisplay>
      )}
    </div>
  );
};

export default Main;
