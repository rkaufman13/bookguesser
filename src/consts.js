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
  return currentGame && books.filter((book) => book.incorrect).length > 0;
};
