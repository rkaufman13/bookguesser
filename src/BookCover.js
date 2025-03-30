import { useState, useCallback } from "react";
import { Spinner } from "./Spinner";
import { NO_COVER } from "./consts";

const env = process.env;
if (env.NODE_ENV === "development") {
  console.log("In development/debug mode.");
}

const ImageCover = ({ src, title, setLoaded }) => {
  const onLoad = useCallback(() => {
    setLoaded(true);
  }, [setLoaded]);
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

export function BookCover({ src, title, year }) {
  const [loaded, setLoaded] = useState(false);
  let showTextCover = false;
  if (src === NO_COVER) {
    showTextCover = true;
  }
  return (
    <div className="book">
      {env.NODE_ENV === "development" && (
        <div className="tooltiptext">{year}</div>
      )}
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
    <>
      {" "}
      <BookCover src={data?.cover} title={data?.title} year={data?.year} />
      <div className={!data.correct ? "fail" : "bookData"}>
        <div className="bookTitle">
          {!data.correct && "❌"} <i>{data?.title}</i>{" "}
        </div>
        <div className="bookAuthor"> {data?.author} </div>

        <div>{gameOver && data?.year}</div>
      </div>
    </>
  );
};
