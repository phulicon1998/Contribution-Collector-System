import React from "react";
import "../../assets/css/collection/collection.css";
import ColItem from "./ColItem";
import Card from "../Card/Card.jsx";
import AppLayout from "../Layout/AppLayout";

const Collection = ({title, description, createdAt, _id}) => (
    <ColItem
        title={title}
        description={description.length > 300 ? `${description.substring(0, 300)}...` : `${description}...`}
        createdAt={createdAt}
        colId={_id}        
    />
)

function ColList(props) {
    const {access, history, list} = props;
    let colList = list.map((col, index, history) => (
        <Collection {...col} key={index} history={history}/>
    ));
    return (
        <AppLayout {...props}>
            <div className="collectionList">
            <legend className="title">Collection List</legend>
                {
                    access("003") && <Card content={
                        <div className="row">
                            <div className="col-md-12 add-col-bar">
                                <button className="btn btn-success" onClick={() => history.push("/collections/new")}>
                                    <i className="fas fa-plus"></i> <span>Open new collection</span>
                                </button>
                                <span>Click here to add a new collection for contributions with desired topics</span>
                            </div>
                        </div>
                    }
                />}
                {colList}
            </div>
        </AppLayout>
    );
}

export default ColList;
