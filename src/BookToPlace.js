import React from "react";
import { DraggableItem } from "./DraggableItem";
import { BookCover } from "./BookCover";

export const BookToPlace = ({ currentBook }) => {
  return (
    <div className="bookToPlace">
      <DraggableItem
        id={currentBook.year}
        year={currentBook.year}
        isDisabled={false}
      >
        <BookCover
          src={currentBook.cover}
          title={currentBook.title}
          year={currentBook.year}
        />
      </DraggableItem>
      <div id="bookToPlaceData">
        <h2>
          <i>{currentBook.title}</i>
        </h2>
        <p>by {currentBook.author}</p>
      </div>
    </div>
  );
};
