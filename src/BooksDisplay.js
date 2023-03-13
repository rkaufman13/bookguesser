import React from "react";

const BooksDisplay = ({ bookList, currentBook, addBook, gameOver }) => {
  return (
    <>
      {!gameOver && (
        <div>
          When was <i>{currentBook.title}</i>, by {currentBook.author}{" "}
          published?
        </div>
      )}
      <div class="container">
        {bookList.current.length &&
          bookList.current.map((book, idx) => {
            return (
              <span key={idx} class="book">
                <BookOrButton
                  data={book}
                  index={idx}
                  addBook={addBook}
                  currentBook={currentBook}
                  gameOver={gameOver}
                ></BookOrButton>
              </span>
            );
          })}
      </div>
    </>
  );
};

const BookOrButton = ({ data, index, addBook, currentBook, gameOver }) => {
  if (data?.type === "button") {
    return (
      <>
        {!gameOver && (
          <button
            onClick={() => {
              addBook(index, currentBook);
            }}
          >
            Here
          </button>
        )}
      </>
    );
  } else {
    return (
      <p>
        {data?.title} <br /> {data?.author} <br />
        {gameOver && data?.year}
      </p>
    );
  }
};

export default BooksDisplay;
