import React from "react";
import { Book, BookCover } from "./BookCover";
import { DndContext, useDroppable, useDraggable } from "@dnd-kit/core";

import { CSS } from "@dnd-kit/utilities";

function DraggableItem(props) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useDraggable({ id: props.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    touchAction: "none",
  };

  return (
    <div
      ref={props.isDisabled ? undefined : setNodeRef}
      {...listeners}
      {...attributes}
      style={style}
    >
      {props.children}
    </div>
  );
}

function DroppableContainer(props) {
  const { setNodeRef, isOver } = useDroppable({ id: props.id });
  const classes = `${isOver ? "over" : ""} droppable`;
  return (
    <div
      ref={setNodeRef}
      className={classes}
      style={props.gameOver ? { width: "5px" } : { border: "none" }}
    >
      {props.children}
    </div>
  );
}

const BooksDisplay = ({
  bookList,
  currentBook,
  setCurrentBook,
  gameOver,
  setBookList,
  chooseBook,
  setScores,
  setGameOver,
  scores,
  allBooksForGame,
  setAllBooksForGame,
}) => {
  const handleDragEnd = (event, currentBook) => {
    const { over, active } = event;

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
        currentBook = { ...currentBook, correct: true };
        updateBookList(setBookList, overYear, direction, currentBook);

        chooseBook(allBooksForGame, setCurrentBook, setAllBooksForGame);
        setScores((prev) => {
          const newScores = { ...prev, current: prev.current++ };
          if (newScores.current >= prev.high) {
            newScores.high = newScores.current;
          }
          return newScores;
        });
      } else {
        currentBook = { ...currentBook, correct: false };
        updateBookList(setBookList, overYear, direction, currentBook);
        setGameOver(true);

        window.localStorage.setItem("bookGuesserHighScore", scores.high);
      }
    }
  };

  return (
    <>
      <DndContext onDragEnd={(e) => handleDragEnd(e, currentBook)}>
        {!gameOver && (
          <div className="bookToPlace">
            <h2 style={{ padding: "5px 0px 25px 0px" }}>
              <i>{currentBook.title}</i>, by {currentBook.author}
            </h2>
            <DraggableItem
              id={currentBook.year}
              year={currentBook.year}
              isDisabled={false}
            >
              <BookCover
                src={currentBook.cover}
                title={currentBook.title}
                year={currentBook.year}
              />
            </DraggableItem>
          </div>
        )}
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
