import React from "react";
import { Book } from "./BookCover";
import { DndContext } from "@dnd-kit/core";

import { BookToPlace } from "./BookToPlace";
import { DroppableContainer } from "./DroppableContainer";

const BooksDisplay = ({ currentBook, gameOver, allBooks, setAllBooks }) => {
  const handleDragEnd = (event, currentBook, allBooks, setAllBooks) => {
    const { over, active } = event;
    let correct = false;
    const bookList = allBooks.filter((book) => book.correct);
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
        handleCorrect(currentBook, allBooks, setAllBooks);
      } else {
        handleIncorrect(currentBook, allBooks, setAllBooks);
      }
    }
  };

  const handleCorrect = (currentBook, allBooks, setAllBooks) => {
    const oldBook = currentBook;
    const index = allBooks.findIndex((bookToFind) => bookToFind === oldBook);
    currentBook = { ...currentBook, correct: true };
    setAllBooks((prev) => {
      prev.splice(index, 1, currentBook);
      return prev;
    });
  };

  const handleIncorrect = (currentBook, allBooks, setAllBooks) => {
    debugger;
    const oldBook = { ...currentBook };
    // delete oldBook.current;
    const index = allBooks.findIndex((bookToFind) =>
      allBooks.findIndex(
        (bookToFind) =>
          bookToFind.id == oldBook.id &&
          bookToFind.author == oldBook.author &&
          bookToFind.title == oldBook.title
      )
    );
    currentBook = {
      ...currentBook,
      correct: false,
      incorrect: true,
      current: false,
    };
    setAllBooks((prev) => prev.toSpliced(index, 1, currentBook));
  };
  const bookList = allBooks.filter((book) => book.correct);
  let firstId = "1000-1";
  if (bookList.length) {
    firstId = `{$bookList[0].id} - 1`;
  }
  return (
    <>
      <DndContext
        onDragEnd={(e) => handleDragEnd(e, currentBook, allBooks, setAllBooks)}
      >
        {!gameOver && <BookToPlace currentBook={currentBook}></BookToPlace>}
        <div id="containerParent">
          <div className="container">
            {currentBook && (
              <DroppableContainer
                id={firstId}
                key={firstId}
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
