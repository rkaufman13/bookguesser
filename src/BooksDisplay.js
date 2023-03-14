import React, { useEffect, useState } from "react";

const BooksDisplay = ({ bookList, currentBook, addBook, gameOver }) => {
  return (
    <>
      {!gameOver && (
        <div style={{ padding: "5px 0px 25px 0px" }}>
          When was <i>{currentBook.title}</i>, by {currentBook.author}{" "}
          published?
        </div>
      )}
      <div className="container">
        {bookList.current.length &&
          bookList.current.map((book, idx) => {
            return (
              <div key={idx} className="bookContainer">
                <BookOrButton
                  data={book}
                  index={idx}
                  addBook={addBook}
                  currentBook={currentBook}
                  gameOver={gameOver}
                ></BookOrButton>
              </div>
            );
          })}
      </div>
    </>
  );
};

const BookOrButton = ({ data, index, addBook, currentBook, gameOver }) => {
  const [hover, setHover] = useState(false);

  const toggleHover = () => {
    setHover(!hover);
  };

  useEffect(() => {
    if (gameOver) {
      setHover(false);
    }
  }, [gameOver]);

  if (data?.type === "button") {
    return (
      <>
        {!gameOver && (
          <div
            onMouseEnter={toggleHover}
            onMouseLeave={toggleHover}
            className="mysteryBook"
            style={{
              backgroundImage: hover ? `url(${currentBook.cover})` : null,
              color: hover ? "transparent" : "white",
            }}
            onClick={() => {
              addBook(index, currentBook);
            }}
          >
            ?
          </div>
        )}
      </>
    );
  } else {
    return (
      <>
        <div
          style={{ backgroundImage: `url(${data.cover})` }}
          className="book"
        ></div>
        <p>
          <i>{data?.title}</i>{" "}
        </p>
        <p> {data?.author} </p>
        <br />
        {gameOver && data?.year}
      </>
    );
  }
};

export default BooksDisplay;
