import React from "react";

const Empty = ({text, height, color, backgroundColor, justifyContent}) => (
    <div className="emptyBox" style={{height, color, backgroundColor, justifyContent}}>
        {text}
    </div>
)

export default Empty;
