import React from "react";

const HasImg = ({remove, select}) => (
    <div className="coverImg">
        <div>
            <img src={select} alt=""/>
            <div><button onClick={remove}>x</button></div>
        </div>
    </div>
)

export default HasImg;
