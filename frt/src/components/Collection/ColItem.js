import React, {Component} from "react";
import moment from "moment";
import {Link} from "react-router-dom";

class ColItem extends Component {
    render(){
        const {title, description, createdAt, colId, detail, access, hdUpdate, hdDelete} = this.props;
        return (
            <div className="card">
                <div className="content">
                    <div className="information">
                        <h3>{title}</h3>
                        <p><b>Description: </b><br/>{description} {detail || <Link to={`/collections/${colId}`}>View more</Link>}</p>
                        <p>Created at {moment(createdAt).format("MMMM Do, YYYY")}</p>
                        {detail && access("003") && <div className="tasks">
                            <p onClick={hdUpdate}><i className="far fa-edit"></i> Edit contribution inforation</p>
                            <p onClick={hdDelete}><i className="far fa-trash-alt"></i> Remove this contribution</p>
                        </div>}
                    </div>
                </div>
            </div>
        )
    }
}

export default ColItem;
