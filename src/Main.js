import React, { useState } from "react";
import { allBooksWithDates } from "./consts";
import BooksDisplay from "./BooksDisplay";
import ShareDialog from "./ShareDialog";
import { GameOver } from "./GameOver";
import { Score } from "./Score";
import { NewGame } from "./NewGame";

const initialArray = [{ type: "button" }, { type: "button" }];

const Main = () => {
  const allBooksForGame = allBooksWithDates();
  const [currentBook, setCurrentBook] = useState();
  const [gameOver, setGameOver] = useState(false);
  const [currentScore, setCurrentScore] = useState(0);
  const [highScore, setHighScore] = useState(0);
  const [firstTurn, setFirstTurn] = useState(true);
  const [bookList, setBookList] = useState(initialArray);
  const [currentGame, setCurrentGame] = useState(false);
  const [shareModalVisible, setShareModalVisible] = useState(false);

  const handleOpenModal = () => {
    setShareModalVisible(!shareModalVisible);
  };

  const chooseBook = () => {
    const arrayLength = allBooksForGame.length;
    const randomIndex = Math.floor(Math.random() * arrayLength);
    setCurrentBook(allBooksForGame[randomIndex]);
    debugger;
    allBooksForGame.splice(randomIndex, 1);
  };

  //special case for first turn
  const chooseAndPlaceBook = () => {
    const arrayLength = allBooksForGame.length;
    const randomIndex = Math.floor(Math.random() * arrayLength);
    const startingBook = allBooksForGame[randomIndex];
    allBooksForGame.splice(randomIndex, 1);
    let tempBookList = [...bookList];
    tempBookList.splice(1, 0, startingBook);

    setBookList(tempBookList);
  };

  const clearBookList = () => {
    setBookList(initialArray);
  };

  const startGame = () => {
    clearBookList();
    setCurrentScore(0);
    setFirstTurn(true);
    setCurrentGame(true);
    setGameOver(false);
    chooseAndPlaceBook();
    chooseBook();
  };

  const addBook = (index, newBook) => {
    setCurrentBook(null);
    let tempBookList = [...bookList];
    tempBookList.splice(
      index,
      0,
      ...[{ type: "button" }, newBook, { type: "button" }]
    );
    //for some annoying reason we have duplicate blanks so this should filter out consecutive duplicates
    tempBookList = tempBookList.filter(function (item, pos, arr) {
      // Always keep the 0th element as there is nothing before it
      // Then check if each element is different than the one before it
      return pos === 0 || item?.type !== arr[pos - 1].type;
    });

    setBookList(tempBookList);
    //compare years of all books
    //todo this can be WAY simplified
    let gameOverNonState = false;
    const earlierBooks = bookList.slice(0, index).filter((book) => {
      return book.year;
    });

    for (let i = 0; i < earlierBooks.length; i++) {
      if (newBook.year < earlierBooks[i].year) {
        setGameOver(true);
        gameOverNonState = true;
      }
    }

    const laterBooks = bookList
      .slice(index + 1, bookList.length - 1)
      .filter((book) => {
        return book.year;
      });

    for (let i = 0; i < laterBooks.length; i++) {
      if (newBook.year > laterBooks[i].year) {
        setGameOver(true);
        gameOverNonState = true;
      }
    }

    //choose new book
    chooseBook();
    //increment score
    if (!gameOverNonState) {
      setCurrentScore((prev) => {
        return prev + 1;
      });
    } else {
      if (currentScore > highScore) {
        setHighScore(currentScore);
      }
    }
  };

  return (
    <div className="main">
      {shareModalVisible && (
        <ShareDialog
          shareModalVisible={shareModalVisible}
          setShareModalVisible={setShareModalVisible}
          score={currentScore}
        />
      )}

      {!currentGame && <NewGame startGame={startGame} />}

      <div>
        {!gameOver && currentGame ? (
          <Score highScore={highScore} currentScore={currentScore} />
        ) : gameOver ? (
          <GameOver
            currentScore={currentScore}
            startGame={startGame}
            highScore={highScore}
            handleOpenModal={handleOpenModal}
          />
        ) : (
          ""
        )}
      </div>
      {currentGame && (
        <BooksDisplay
          bookList={bookList}
          addBook={addBook}
          currentBook={currentBook}
          gameOver={gameOver}
          firstTurn={firstTurn}
        ></BooksDisplay>
      )}
    </div>
  );
};

export default Main;
