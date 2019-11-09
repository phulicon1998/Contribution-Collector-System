import React from "react";

const ColUploadBox = ({file, icon}) => (
    <div className="colUploadBox">
        <i className={icon}></i>
        <p>Click or drag {file} to here for upload</p>
    </div>
)

export default ColUploadBox;
