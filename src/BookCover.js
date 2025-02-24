import { useState, useCallback } from "react";
import { Spinner } from "./Spinner";
import { NO_COVER } from "./consts";

const ImageCover = ({ src, title, setLoaded }) => {
  const onLoad = useCallback(() => {
    console.log("loaded");
    setLoaded(true);
  }, []);
  return <img src={src} alt={title} onLoad={onLoad}></img>;
};

const TextCover = ({ title }) => {
  return (
    <div className="book textBook">
      (No cover available)
      <hr />
      {title}
    </div>
  );
};

export function BookCover({ src, title }) {
  const [loaded, setLoaded] = useState(false);
  let showTextCover = false;
  if (src === NO_COVER) {
    showTextCover = true;
  }
  return (
    <div>
      {showTextCover ? (
        <TextCover title={title} />
      ) : (
        <ImageCover src={src} setLoaded={setLoaded} />
      )}

      <Spinner loaded={loaded} showTextCover={showTextCover} />
    </div>
  );
}

export const Book = ({ data, gameOver }) => {
  return (
    <div>
      <BookCover src={data?.cover} title={data?.title} />
      <div className="bookData">
        <div className="bookTitle">
          <i>{data?.title}</i>{" "}
        </div>
        <div className="bookAuthor"> {data?.author} </div>

        <div>{gameOver && data?.year}</div>
      </div>
    </div>
  );
};
