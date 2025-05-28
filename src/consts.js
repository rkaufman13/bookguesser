import { bookdata } from "./data";
export const NO_COVER = "https://covers.openlibrary.org/b/id/None-M.jpg";

export const allBooksWithDates = () => {
  return bookdata
    .filter((book) => book.year)
    .map((book) => {
      book = { ...book, id: book.year, prev: null, next: null };
      return book;
    });
};

export const chooseNextBook = (books) => {
  let book;
  const arrayLength = books.length;
  const randomIndex = Math.floor(Math.random() * arrayLength);
  do {
    book = books[randomIndex];
  } while (book.prev != null && book.next !== null);
  return book;
};
