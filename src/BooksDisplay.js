import React, { useEffect, useState } from "react";
import BookCover from './BookCover';
import { NO_COVER } from "./consts";

const BooksDisplay = ({ bookList, currentBook, addBook, gameOver }) => {
  return (
    <>
      {!gameOver && (
        <h2 style={{ padding: "5px 0px 25px 0px" }}>
          When was <i>{currentBook.title}</i>, by {currentBook.author},{" "}
          published?
        </h2>
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
    const classes = "book mysteryBook"
    const classesWithHover = "book mysteryBook mysteryBookNoCover"
    
    if (currentBook?.cover === NO_COVER){
    
    return (<>
    {!gameOver && <div
    onMouseEnter={toggleHover}
    onMouseLeave={toggleHover}
    className={hover? classesWithHover: classes}
    style={{
      color: "white",
    }}
    onClick={() => {
      addBook(index, currentBook);
    }}
  >
    <div>{hover? currentBook.title : "?" }</div>
  </div>}</>)
    
    }

    return ( <>
    
    {!gameOver && (<div
            onMouseEnter={toggleHover}
            onMouseLeave={toggleHover}
            className="book mysteryBook"
            style={{
              backgroundImage: hover ? `url(${currentBook.cover})` : null,
              color: hover ? "transparent" : "white",
            }}
            onClick={() => {
              addBook(index, currentBook);
            }}
          >
            <div>?</div>
          </div>)}</>);
}
  
   else {
    return (
      <div>
        <BookCover src={data?.cover} title={data?.title}/>
        <div className="bookData">
        <div className="bookTitle">
          <i>{data?.title}</i>{" "}
        </div>
        <div className="bookAuthor"> {data?.author} </div>
        
        <div>{gameOver && data?.year}</div>
        </div>
      </div>
    );
  }
};

export default BooksDisplay;
