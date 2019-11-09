import React from "react";

const TextField = ({icon, type, hold, value, name, hdChange}) => (
    <div className="boxViewname">
        <i className={icon}></i>
        <input type={type || "text"} placeholder={hold} name={name} value={value} onChange={hdChange}/>
    </div>
)

export default TextField;
