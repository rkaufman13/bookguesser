import { useState } from "react";
import { NO_COVER } from "./consts";

const ImageCover = ({ src, title, setLoading }) => {
  <img
    src={src}
    alt={title}
    onLoad={() => {
      setLoading(false);
    }}
  ></img>;
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
  const [loading, setLoading] = useState(true);
  let showTextCover = false;
  if (src === NO_COVER) {
    showTextCover = true;
  }

  return (
    <div>
      {showTextCover ? (
        <TextCover title={title} />
      ) : (
        <ImageCover src={src} setLoading={setLoading} />
      )}

      <div
        className="spinner"
        style={{
          display: loading ? "block" : "none",
          fontSize: "24px",
        }}
      >
        <div className="lds-dual-ring"></div>
      </div>
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
