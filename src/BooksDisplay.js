import React, { useState } from "react";
import { Book, BookCover } from "./BookCover";
import { NO_COVER } from "./consts";
import { useDroppable, useDraggable, DndContext } from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";

function Droppable(props) {
  const { setNodeRef } = useDroppable({
    id: props.id,
  });
  return <div ref={setNodeRef}>{props.children}</div>;
}

function Draggable({ currentBook }) {
  const id = currentBook.year;
  const { attributes, listeners, setDraggableNodeRef, transform } =
    useDraggable({
      id: id,
    });
  const style = {
    transform: CSS.Translate.toString(transform),
  };
  return (
    <div ref={setDraggableNodeRef} {...listeners} {...attributes} style={style}>
      <BookCover src={currentBook.cover} title={currentBook.title} />
    </div>
  );
}

const BooksDisplay = ({ bookList, currentBook, addBook, gameOver }) => {
  const [parent, setParent] = useState(null);
  const [isDropped, setIsDropped] = useState(false);
  const handleDragEnd = (event) => {
    if (event.over && event.over.id === "droppable") {
      setIsDropped(true);
      setParent(event.over ? event.over.id : null);
      console.log(JSON.stringify(event));
    }
  };

  return (
    <>
      {!gameOver && (
        <>
          <Draggable currentBook={currentBook} />
          <h2 style={{ padding: "5px 0px 25px 0px" }}>
            <i>{currentBook.title}</i>, by {currentBook.author}
          </h2>
        </>
      )}
      <div className="container">
        <DndContext onDragEnd={handleDragEnd}>
          {currentBook &&
            bookList &&
            bookList.map((book, idx) => {
              if (book.type === "button") {
                return (
                  <Droppable key={idx} id={idx}>
                    <BookDrop currentBook={currentBook} gameOver={gameOver} />
                  </Droppable>
                );
              } else {
                return (
                  <div key={book.year} className="bookContainer">
                    <Book data={book} gameOver={gameOver} />
                  </div>
                );
              }
            })}
        </DndContext>
      </div>
    </>
  );
};

const BookDrop = ({ currentBook, gameOver }) => {
  const classes = "book mysteryBook";

  if (currentBook?.cover === NO_COVER) {
    return (
      <>
        {!gameOver && (
          <div
            className={classes}
            style={{
              color: "white",
            }}
          ></div>
        )}
      </>
    );
  }

  return (
    <>
      {!gameOver && (
        <div
          className="book mysteryBook"
          style={{
            color: "white",
          }}
        >
          <div>?</div>
        </div>
      )}
    </>
  );
};

export default BooksDisplay;
