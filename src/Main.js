import React, { useState, useEffect, useRef } from "react";
import { bookdata } from "./data";
import BooksDisplay from "./BooksDisplay";

const initialArray = [{ type: "button" }, { type: "button" }];
const allBooks = () => {
  return bookdata.filter((book) => book.year);
};

const Main = () => {
  const allBooksForGame = allBooks();
  const [currentBook, setCurrentBook] = useState();
  const [gameOver, setGameOver] = useState(false);
  const [currentScore, setCurrentScore] = useState(0);
  const [highScore, setHighScore] = useState(0);
  //const [bookList, setBookList] = useState(initialArray);
  const bookList = useRef(initialArray);
  const [currentGame, setCurrentGame] = useState(false);

  const chooseBook = () => {
    const arrayLength = allBooksForGame.length;
    const randomIndex = Math.floor(Math.random() * arrayLength);
    setCurrentBook(() => allBooksForGame[randomIndex]);
    console.log("value of current book", currentBook);
    allBooksForGame.splice(randomIndex, 1);
  };

  //special case for first turn
  const chooseAndPlaceBook = () => {
    const arrayLength = allBooksForGame.length;
    const randomIndex = Math.floor(Math.random() * arrayLength);
    const startingBook = allBooksForGame[randomIndex];
    allBooksForGame.splice(randomIndex, 1);
    let tempBookList = [...bookList.current];
    tempBookList.splice(1, 0, startingBook);
    // setBookList(tempBookList);
    bookList.current = tempBookList;
  };

  const clearBookList = () => {
    // setBookList([...initialArray]);
    bookList.current = initialArray;
  };

  const startGame = () => {
    clearBookList();
    setCurrentGame(true);
    setGameOver(false);
    chooseAndPlaceBook();
    chooseBook();
  };

  useEffect(() => {
    console.log(currentBook);
  }, [currentBook]);

  const addBook = (index, newBook) => {
    setCurrentBook(null);
    let tempBookList = [...bookList.current];
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
    //    setBookList(() => tempBookList);
    bookList.current = tempBookList;
    //compare years of all books

    let gameOverNonState = false;
    const earlierBooks = bookList.current.slice(0, index).filter((book) => {
      return book.year;
    });
    console.log(earlierBooks);
    for (let i = 0; i < earlierBooks.length; i++) {
      console.log(
        `Comparing ${newBook.title} (${newBook.year}) with ${earlierBooks[i].title} (${earlierBooks[i].year})`
      );
      if (newBook.year < earlierBooks[i].year) {
        setGameOver(true);
        gameOverNonState = true;
      }
    }

    const laterBooks = bookList.current
      .slice(index + 1, bookList.current.length - 1)
      .filter((book) => {
        return book.year;
      });
    console.log("later books", laterBooks);
    for (let i = 0; i < laterBooks.length; i++) {
      console.log(
        `Comparing ${newBook.title} (${newBook.year}) with ${laterBooks[i].title} (${laterBooks[i].year})`
      );
      if (newBook.year > laterBooks[i].year) {
        setGameOver(true);
        gameOverNonState = true;
      }
    }

    //increment score
    if (!gameOverNonState) {
      setCurrentScore((prev) => {
        return prev + 1;
      });
      //choose new book
      chooseBook();
    } else {
      if (currentScore > highScore) {
        setHighScore(currentScore);
        setCurrentBook({ title: "" });
      }
    }
  };

  return (
    <div>
      Try to place the books in order of publication.
      <p>{!currentGame && <button onClick={startGame}>Start</button>}</p>
      <p>
        <h1>
          {!gameOver && currentGame
            ? `Your current score:  ${currentScore}`
            : gameOver
            ? `Game over! You scored ${currentScore} points.`
            : ""}
        </h1>
        {highScore ? <h2>Your high score: {highScore}</h2> : <></>}
        {gameOver && <button onClick={startGame}>Play again?</button>}
        {currentBook && bookList && (
          <BooksDisplay
            bookList={bookList}
            addBook={addBook}
            currentBook={currentBook}
            gameOver={gameOver}
          ></BooksDisplay>
        )}
      </p>
    </div>
  );
};

export default Main;
