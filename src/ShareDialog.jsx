import React from "react";

const ShareDialog = ({shareModalVisible, setShareModalVisible, score})=> {
    const [copied,setCopied] = React.useState(false);
const copyText = ()=>{
    navigator.clipboard.writeText(message)
    setCopied(true)
}

const handleClose = ()=> {
setShareModalVisible(false);
}

const books = []
for (let i = 1; i<=score;i++){
books.push("📕");
}

const message = `${books.join("")} I scored ${score} points in BookGuessr. Can you beat me? https://rkaufman.github.io/bookguessr`;

    return (<dialog className="shareModal" open={shareModalVisible}>
<header>Share your victory</header>
<div className="message">{message}{" "}<button onClick={copyText}>{copied?"Copied!":"Copy"}</button></div>
<footer><button onClick={handleClose}>Close</button></footer>
    </dialog>);
}

export default ShareDialog;