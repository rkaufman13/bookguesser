import Main from "./Main";
import "./App.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBookOpenReader } from "@fortawesome/free-solid-svg-icons";

const Footer = () => {
  return (
    <div className="footer">
      Made in a weekend by{" "}
      <a href="http://github.com/rkaufman13">Rachel Kaufman</a>. Book data comes
      from the Guardian's{" "}
      <a href="https://www.theguardian.com/books/2009/jan/23/bestbooks-fiction">
        List of 1000 Novels You Must Read
      </a>
      ; address omissions (of which there are surely many) by making a <a href="https://github.com/rkaufman13/bookguesser">pull
      request</a>, please.
    </div>
  );
};

function App() {
  return (
    <div className="body">
   <link rel="preconnect" href="https://fonts.googleapis.com"/>
<link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true"/>
<link href="https://fonts.googleapis.com/css2?family=Crimson+Text:ital,wght@0,400;0,600;0,700;1,400;1,600;1,700&family=Hind&display=swap" rel="stylesheet"/>
    

      <div className="wrapper">
        <div className="App">
          <header className="App-header">
            <div className="header-nav">
            <h1>
              BookGuessr <FontAwesomeIcon icon={faBookOpenReader} />
            </h1>
            </div>
          </header>
          <Main></Main>
        </div>
        <Footer></Footer>
      </div>
    </div>
  );
}

export default App;
