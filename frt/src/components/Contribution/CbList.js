import React from "react";
import {Col} from "react-bootstrap";
import CbItem from "./CbItem";

const Item = ({student_id, newSubmit, col_id, _id, latest, access, ...props}) => (
    <Col md={2}>
        <CbItem
            name={student_id.viewname}
            access={access}
            newSub={newSubmit}
            colId={col_id}
            conId={_id}
            latest={latest}
            {...props}
        />
    </Col>
)

const CbList = ({title, list, ...props}) => {
    let listItem = list.map((val, i) => <Item {...val} {...props} key={i}/>);
    return (
        <div className="cbBar">
            <legend className="title">{title}</legend>
            {listItem}
        </div>
    )
}

export default CbList;
