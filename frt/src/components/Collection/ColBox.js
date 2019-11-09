import React from "react";
import Card from "../Card/Card.jsx";

const ColBox = ({css, number, type, note}) => (
    <Card content={
        <div className="statBox">
            <div>
                <i className={css}></i>
                <h1>{number}</h1>
                <p>{type}</p>
            </div>
            <p>{note}</p>
        </div>
    }/>
)

export default ColBox;
