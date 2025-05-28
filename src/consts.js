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
