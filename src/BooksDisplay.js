import React, { useState } from "react";
import { Book, BookCover } from "./BookCover";
import { NO_COVER } from "./consts";
import { useDroppable, useDraggable, DndContext } from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";

function Droppable(props) {
  const { isOver, attributes, listeners, setNodeRef } = useDroppable({
    id: props.id,
  });

  const style = {
    backgroundColor: isOver ? "green" : undefined,
  };
  return (
    <div ref={setNodeRef} style={style} {...listeners} {...attributes}>
      {props.children}
    </div>
  );
}

function Draggable({ currentBook }) {
  const id = currentBook.year;
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: id,
  });
  const style = {
    transform: CSS.Translate.toString(transform),
  };
  return (
    <div ref={setNodeRef} {...listeners} {...attributes} style={style}>
      <BookCover src={currentBook.cover} title={currentBook.title} />
    </div>
  );
}

const BooksDisplay = ({ bookList, currentBook, addBook, gameOver }) => {
  const [parent, setParent] = useState(null);
  const [isDropped, setIsDropped] = useState(false);
  const handleDragEnd = (event) => {
    if (event.over) {
      setIsDropped(true);
      setParent(event.over ? event.over.id : null);
    }
  };

  return (
    <>
      <DndContext onDragEnd={handleDragEnd}>
        {!gameOver && (
          <>
            <Draggable currentBook={currentBook} />
            <h2 style={{ padding: "5px 0px 25px 0px" }}>
              <i>{currentBook.title}</i>, by {currentBook.author}
            </h2>
          </>
        )}
        <div className="container">
          {currentBook &&
            bookList &&
            bookList.map((book, idx) => {
              if (book.type === "button") {
                return (
                  <Droppable key={idx} id={`droppable-${idx}`}>
                    <BookDrop gameOver={gameOver} />
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
        </div>
      </DndContext>
    </>
  );
};

const BookDrop = ({ gameOver }) => {
  const classes = "book mysteryBook";

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
};

export default BooksDisplay;
