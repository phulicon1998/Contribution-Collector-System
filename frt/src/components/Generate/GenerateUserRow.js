import React from "react";
import {
  OverlayTrigger,
  Tooltip
} from "react-bootstrap";

import Button from "../CustomButton/CustomButton.jsx";

const remove = <Tooltip id="remove">Remove</Tooltip>;

const Action = ({deleteFn}) => (
    <td className="td-actions text-center">
        <OverlayTrigger placement="top" overlay={remove}>
            <Button simple bsStyle="danger" bsSize="xs" onClick={deleteFn}>
                <i className="fa fa-times" />
            </Button>
        </OverlayTrigger>
    </td>
);

const GenerateUserRow = ({index, row, deleteFn}) => (
    <tr>
        <td className="text-center">{index}</td>
        {row.map((val, index) => ( <td key={index}>{val}</td> ))}
        <Action deleteFn={deleteFn}/>
    </tr>
)

export default GenerateUserRow;
