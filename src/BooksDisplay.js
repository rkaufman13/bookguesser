import React from "react";
import { Book } from "./BookCover";
import { DndContext, useDroppable } from "@dnd-kit/core";

import { BookToPlace } from "./BookToPlace";

function DroppableContainer(props) {
  const { setNodeRef, isOver } = useDroppable({ id: props.id });
  const classes = `${isOver ? "over" : ""} droppable`;
  const style = props.gameOver ? { width: "5px" } : { border: "none" };
  return (
    <div ref={setNodeRef} className={classes} style={style}>
      {props.children}
    </div>
  );
}

const BooksDisplay = ({
  bookList,
  currentBook,
  handleDragEnd,
  gameOver,
  chooseBook,
  updateScores,
  setGameOver,
  setBookList,
}) => {
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
            setBookList
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
