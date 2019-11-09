import React from "react";

const TextBox = ({icon, type, hold, value, name, hdChange}) => (
    <div className="boxPassword">
        <div>
            <i className={icon}></i>
            <input type={type || "text"} placeholder={hold} name={name} value={value} onChange={hdChange}/>
        </div>
    </div>
)

export default TextBox;
