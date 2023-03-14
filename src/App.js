import Main from "./Main";
import "./App.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBookOpenReader } from "@fortawesome/free-solid-svg-icons";

const Footer = () => {
  return (
    <div class="footer">
      Made in a weekend by{" "}
      <a href="http://github.com/rkaufman13">Rachel Kaufman</a>. Book data comes
      from the Guardian's{" "}
      <a href="https://www.theguardian.com/books/2009/jan/23/bestbooks-fiction">
        List of 1000 Novels You Must Read
      </a>
      ; address omissions (of which there are surely many) by making a pull
      request please.
    </div>
  );
};

function App() {
  return (
    <>
      <div className="wrapper">
        <div className="App">
          <header className="App-header">
            <p>
              Book Guesser <FontAwesomeIcon icon={faBookOpenReader} />
            </p>
          </header>
          <Main></Main>
        </div>
        <Footer></Footer>
      </div>
    </>
  );
}

export default App;
