import React, { useState } from "react";
import { allBooksWithDates } from "./consts";
import BooksDisplay from "./BooksDisplay";
import ShareDialog from "./ShareDialog";
import { GameOver } from "./GameOver";
import { Score } from "./Score";
import { NewGame } from "./NewGame";

export const chooseBook = (
  allBooksForGame,
  setCurrentBook,
  setAllBooksForGame
) => {
  const arrayLength = allBooksForGame.length;
  const randomIndex = Math.floor(Math.random() * arrayLength);
  setCurrentBook((ignored) => {
    const currentBook = allBooksForGame[randomIndex];
    setAllBooksForGame((prev) => {
      return prev.filter((book) => book.id !== currentBook.id);
    });
    return currentBook;
  });
};

const Main = () => {
  const [allBooksForGame, setAllBooksForGame] = useState(allBooksWithDates());
  const [currentBook, setCurrentBook] = useState();
  const [gameOver, setGameOver] = useState(false);
  const [scores, setScores] = useState({
    current: 0,
    high: parseInt(window.localStorage.getItem("bookGuesserHighScore")) ?? 0,
  });
  const [bookList, setBookList] = useState([]);
  const [currentGame, setCurrentGame] = useState(false);
  const [shareModalVisible, setShareModalVisible] = useState(false);

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

  //special case for first turn
  const chooseAndPlaceBook = () => {
    const arrayLength = allBooksForGame.length;
    const randomIndex = Math.floor(Math.random() * arrayLength);
    const startingBook = { ...allBooksForGame[randomIndex], correct: true };
    const newList = [...allBooksForGame].toSpliced(0, randomIndex, 1);
    setAllBooksForGame(newList);
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
    chooseBook(allBooksForGame, setCurrentBook, setAllBooksForGame);
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
          bookList={bookList}
          currentBook={currentBook}
          gameOver={gameOver}
          chooseBook={chooseBook}
          updateScores={updateScores}
          setGameOver={setGameOver}
          setBookList={setBookList}
          setCurrentBook={setCurrentBook}
          allBooksForGame={allBooksForGame}
          setAllBooksForGame={setAllBooksForGame}
        ></BooksDisplay>
      )}
    </div>
  );
};

export default Main;
