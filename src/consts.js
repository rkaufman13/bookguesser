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

function updateBookList(setBookList, overYear, direction, currentBook) {
  setBookList((items) => {
    const tempBookList = [...items];
    const oldIndex = items.findIndex((item) => {
      return parseInt(item.id) === overYear;
    });
    if (direction === "-") {
      tempBookList.splice(oldIndex, 0, currentBook);
    }
    if (direction === "+") {
      tempBookList.splice(oldIndex + 1, 0, currentBook);
    }
    return tempBookList;
  });
}

export const handleDragEnd = (
  event,
  currentBook,
  bookList,
  chooseBook,
  updateScores,
  setGameOver,
  setBookList
) => {
  const { over, active } = event;

  let correct = false;
  if (over && active.id !== over.id) {
    const activeYear = parseInt(active.id);
    const overYear = parseInt(over.id.substring(0, 4));
    const direction = over.id.substring(4, 5);

    if (direction === "-") {
      if (overYear >= activeYear) {
        correct = true;
      }
    } else if (direction === "+") {
      if (overYear <= activeYear) {
        //now we need to look ahead to the next item in the list
        const overIndex = bookList.findIndex((book) => {
          return parseInt(book.id) === overYear;
        });
        if (overIndex + 1 < bookList.length) {
          const nextYear = parseInt(bookList[overIndex + 1].year);
          if (activeYear <= nextYear) {
            correct = true;
          }
        } else {
          //if overIndex+1 is equal to the length of the array, there are no books newer than the one we've placed
          correct = true;
        }
      }
    }

    if (correct) {
      handleCorrect(
        currentBook,
        chooseBook,
        updateScores,
        setBookList,
        overYear,
        direction
      );
    } else {
      handleIncorrect(currentBook, setGameOver);
    }
  }
};

const handleCorrect = (
  currentBook,
  updateBookList,
  chooseBook,
  updateScores,
  setBookList,
  overYear,
  direction
) => {
  currentBook = { ...currentBook, correct: true };
  updateBookList(setBookList, overYear, direction, currentBook);

  chooseBook(allBooksForGame, setCurrentBook, setAllBooksForGame);
  updateScores();
};

const handleIncorrect = (currentBook, updateBookList, setGameOver) => {
  currentBook = { ...currentBook, correct: false };
  updateBookList(setBookList, overYear, direction, currentBook);
  setGameOver(true);
};
