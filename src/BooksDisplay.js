import React from "react";
import { Book } from "./BookCover";
import { DndContext } from "@dnd-kit/core";

import { BookToPlace } from "./BookToPlace";
import { DroppableContainer } from "./DroppableContainer";

const BooksDisplay = ({
  bookList,
  currentBook,
  gameOver,
  chooseBook,
  updateScores,
  setGameOver,
  setBookList,
  allBooksForGame,
  setCurrentBook,
  setAllBooksForGame,
}) => {
  const handleDragEnd = (
    event,
    currentBook,
    bookList,
    chooseBook,
    updateScores,
    setGameOver,
    setBookList,
    allBooksForGame,
    setCurrentBook,
    setAllBooksForGame
  ) => {
    const { over, active } = event;
    debugger;
    let correct = false;
    if (over && active.id !== over.id) {
      const activeYear = parseInt(active.id);
      const overYear = parseInt(over.id.substring(0, 4));
      const direction = over.id.substring(4, 5);

      if (direction === "-") {
        if (overYear >= activeYear) {
          correct = true;
        }
      } else if (direction === "+") {
        if (overYear <= activeYear) {
          //now we need to look ahead to the next item in the list
          const overIndex = bookList.findIndex((book) => {
            return parseInt(book.id) === overYear;
          });
          if (overIndex + 1 < bookList.length) {
            const nextYear = parseInt(bookList[overIndex + 1].year);
            if (activeYear <= nextYear) {
              correct = true;
            }
          } else {
            //if overIndex+1 is equal to the length of the array, there are no books newer than the one we've placed
            correct = true;
          }
        }
      }

      if (correct) {
        handleCorrect(
          currentBook,
          updateBookList,
          chooseBook,
          updateScores,
          setBookList,
          overYear,
          direction,
          allBooksForGame,
          setCurrentBook,
          setAllBooksForGame
        );
      } else {
        handleIncorrect(
          currentBook,
          updateBookList,
          setGameOver,
          overYear,
          direction
        );
      }
    }
  };

  const handleCorrect = (
    currentBook,
    updateBookList,
    chooseBook,
    updateScores,
    setBookList,
    overYear,
    direction,
    allBooksForGame,
    setCurrentBook,
    setAllBooksForGame
  ) => {
    currentBook = { ...currentBook, correct: true };
    updateBookList(setBookList, overYear, direction, currentBook);

    chooseBook(allBooksForGame, setCurrentBook, setAllBooksForGame);
    updateScores();
  };

  const handleIncorrect = (
    currentBook,
    updateBookList,
    setGameOver,
    overYear,
    direction
  ) => {
    currentBook = { ...currentBook, correct: false };
    updateBookList(setBookList, overYear, direction, currentBook);
    setGameOver(true);
  };

  function updateBookList(setBookList, overYear, direction, currentBook) {
    setBookList((items) => {
      const tempBookList = [...items];
      const oldIndex = items.findIndex((item) => {
        return parseInt(item.id) === overYear;
      });
      if (direction === "-") {
        tempBookList.splice(oldIndex, 0, currentBook);
      }
      if (direction === "+") {
        tempBookList.splice(oldIndex + 1, 0, currentBook);
      }
      return tempBookList;
    });
  }

  return (
    <>
      <DndContext
        onDragEnd={(e) =>
          handleDragEnd(
            e,
            currentBook,
            bookList,
            chooseBook,
            updateScores,
            setGameOver,
            setBookList,
            allBooksForGame,
            setCurrentBook,
            setAllBooksForGame
          )
        }
      >
        {!gameOver && <BookToPlace currentBook={currentBook}></BookToPlace>}
        <div id="containerParent">
          <div className="container">
            {currentBook && bookList && (
              <DroppableContainer
                id={`${bookList[0].id}-1`}
                key={`${bookList[0].id}-1`}
                gameOver={gameOver}
              >
                {" "}
              </DroppableContainer>
            )}
            {currentBook &&
              bookList &&
              bookList.map((book, idx) => {
                return (
                  <>
                    <div key={book.year} className="bookContainer">
                      <Book data={book} gameOver={gameOver} />
                    </div>
                    <DroppableContainer
                      id={`${book.year}+1`}
                      key={`${book.year}+1`}
                      gameOver={gameOver}
                    >
                      {" "}
                    </DroppableContainer>
                  </>
                );
              })}
          </div>
        </div>
      </DndContext>
    </>
  );
};

export default BooksDisplay;
