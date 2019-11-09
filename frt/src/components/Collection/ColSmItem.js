import React from "react";
import moment from "moment";

const ColSmItem = (props) => {
    const {date, number, title, id} = props;
    return (
        <div className="card">
            <div className="content colSmItem">
                <i className="pe-7s-portfolio text-success"></i>
                <p><a href={`/submissions/${id}/contributions`}>{title.length > 20 ? `${title.substring(0, 20)}...` : title}</a></p>
                <small>{number} submission(s)</small>
                <div>
                    <small>Closure date at {moment(date).format("MMMM Do, YYYY")}</small>
                </div>
            </div>
        </div>
    )
}

export default ColSmItem;
