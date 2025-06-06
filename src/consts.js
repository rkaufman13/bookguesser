import { bookdata } from "./data";
export const NO_COVER = "https://covers.openlibrary.org/b/id/None-M.jpg";

export const allBooksWithDates = () => {
  return bookdata
    .filter((book) => book.year)
    .map((book) => {
      book = { ...book, id: book.year };
      return book;
    });
};

export const chooseNextBook = (books) => {
  const availableBooks = books.filter(
    (book) => book.incorrect == null && book.correct == null
  );
  const arrayLength = availableBooks.length;
  const randomIndex = Math.floor(Math.random() * arrayLength);
  const book = availableBooks[randomIndex];
  book.current = true;
  return book;
};

export const chooseFirstBook = (books, setAllBooks) => {
  const availableBooks = books.filter(
    (book) => book.incorrect == null && book.correct == null
  );
  const arrayLength = availableBooks.length;
  if (arrayLength === 0) {
    return;
  }
  const randomIndex = Math.floor(Math.random() * arrayLength);
  const book = availableBooks[randomIndex];
  book.correct = true;
  setAllBooks((prev) => prev.toSpliced(randomIndex, 1, book));
};

export const checkForGameOver = (books, currentGame) => {
  return (
    currentGame && books.filter((book) => book.correct === false).length > 0
  );
};

export const calculateScore = (bookList) => {
  return bookList.filter((book) => book.correct).length - 1;
};

export const calculateHighScore = (score) => {
  let localScore =
    parseInt(window.localStorage.getItem("bookGuesserHighScore")) ?? 0;
  if (!localScore || score > localScore) {
    return score;
  }
  return localScore;
};
