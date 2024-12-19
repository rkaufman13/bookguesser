import React, { useState, useRef } from "react";
import { bookdata } from "./data";
import BooksDisplay from "./BooksDisplay";

const initialArray = [{ type: "button" }, { type: "button" }];
const allBooks = () => {
  return bookdata.filter((book) => book.year);
};

const NewGame = ({startGame})=> {
  return(
    <div className="new-game-parent">
  <div className="new-game-container">Welcome! In this game, you are guessing when books were published. Try for the highest score!
    <button onClick={startGame}>Start</button></div></div>);
}

const Main = () => {
  const allBooksForGame = allBooks();
  const [currentBook, setCurrentBook] = useState();
  const [gameOver, setGameOver] = useState(false);
  const [currentScore, setCurrentScore] = useState(0);
  const [highScore, setHighScore] = useState(0);
  const [firstTurn, setFirstTurn] = useState(true);
  const bookList = useRef(initialArray);
  const [currentGame, setCurrentGame] = useState(false);

  const chooseBook = () => {
    const arrayLength = allBooksForGame.length;
    const randomIndex = Math.floor(Math.random() * arrayLength);
    setCurrentBook(() => allBooksForGame[randomIndex]);
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
    
    bookList.current = tempBookList;
  };

  const clearBookList = () => {
    
    bookList.current = initialArray;
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

    bookList.current = tempBookList;
    //compare years of all books

    let gameOverNonState = false;
    const earlierBooks = bookList.current.slice(0, index).filter((book) => {
      return book.year;
    });
    
    for (let i = 0; i < earlierBooks.length; i++) {
     
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
      
      {!currentGame && <NewGame startGame={startGame}/>}

        <div><p>
          {!gameOver && currentGame
            ? <>Your current score: <span className="score">{currentScore}</span></>
            : gameOver
            ? <>Game over! You scored <span className="score">{currentScore}</span> points.</>
            : ""}
        
      
        {highScore ? <>Your high score: <span className="score">{highScore}</span></> : <></>}</p></div>
        {gameOver && <button onClick={startGame}>Play again?</button>}
      
        {currentBook && bookList && (
          <BooksDisplay
            bookList={bookList}
            addBook={addBook}
            currentBook={currentBook}
            gameOver={gameOver}
            firstTurn = {firstTurn}
          ></BooksDisplay>
        )}
      
    </div>
  );
};

export default Main;
