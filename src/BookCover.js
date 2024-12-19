import { useState } from "react";
import { NO_COVER } from "./consts";

const ImageCover = ({src})=>{
    return(    <div
          style={{ backgroundImage: `url(${src})`,animation: "fadeIn 0.5s", }}
          className="book"
        ></div>
)
}

const TextCover = ({title})=>{
    return(    <div
        
        className="book textBook"
      >(No cover available)<hr/>{title}</div>
)
}

export default function BookCover({src, title}) {
    const [loading, setLoading] = useState(true);
    let showTextCover = false;
    if (src===NO_COVER){
        showTextCover = true;
    }

    return (
  <div>
        <img src={src} style={
        {
            display: 'none',
            width:"100%",
            
        }
    } onLoad={(e)=>{setLoading(false)}}></img>
    {showTextCover? <TextCover title={title}/>:
    <ImageCover src={src}/>}
        
    <div className="spinner" style={{
        display: loading?"block":"none",
        fontSize:"24px"
    }} ><div className="lds-dual-ring"></div></div>
</div>)}