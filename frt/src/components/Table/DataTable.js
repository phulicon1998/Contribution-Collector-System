import React, {Component} from "react";
import ReactTable from "react-table";
import Card from "../Card/Card.jsx";
import {apiAppCall} from "../../services/api";
import Button from "../CustomButton/CustomButton.jsx";
import {Link} from "react-router-dom";

class DataTable extends Component {

    getActions = (key, more) => {
        const {fn, fnStyle, fnIcon, hideAct} = this.props;
        let moreBtn;
        if(fn && more){
            moreBtn = (
                <Button onClick={fn.bind(this, key)} bsStyle={fnStyle} simple icon>
                    <i className={fnIcon} />
                </Button>
            )
        }
        return (
            <div className="actions-right">
                {moreBtn}
                {hideAct || <Button onClick={this.handleEdit.bind(this, key)} bsStyle="warning" simple icon>
                    <i className="fa fa-edit" />
                </Button>}
                {hideAct || <Button onClick={this.handleRemove.bind(this, key)} bsStyle="danger" simple icon>
                    <i className="fa fa-times" />
                </Button>}
            </div>
        )
    }

    addHeaderActions = () => ({
        Header: "Actions",
        accessor: "actions",
        sortable: false,
        filterable: false
    });

    handleRemove = async(key) => {
        const {apiDelete, notify, load} = this.props;
        try {
            if(window.confirm("Do you want to delete this data?")){
                await apiAppCall("delete", apiDelete(key));
                notify("success", "Delete data successfully!");
                return load();
            }
        } catch(err) {
            notify("error", "Cannot remove faculty's data. Please try again.");
        }
    }

    handleEdit = (key) => {
        const {select} = this.props;
        select(key);
    }

    provideActions = (list, headers) => {
        const {open} = this.props;
        let prvList = list, prvHeaders = headers;
        if(!open) {
            prvList = list.map(row => ({
                ...row,
                actions: this.getActions(row.id, row.faculty_id !== undefined)
            }));
            let actions = this.addHeaderActions();
            prvHeaders = [...headers, actions];
        }
        return {prvList, prvHeaders};
    }

    render() {
        const {headers, title, data, open, toggleForm, generate} = this.props;
        let {prvList, prvHeaders} = this.provideActions(data, headers);
        let interact;
        if(generate){
            let {link} = this.props;
            interact = <Link to={link}><button className="btn btn-success add-fa"><i className="fas fa-plus"></i> Generate</button></Link>
        } else {
            interact = <button className="btn btn-success add-fa" onClick={toggleForm}><i className="fas fa-plus"></i> <span>Create</span></button>
        }
        return (
            <Card
                title={title}
                content={
                    <div>
                        {!open && interact}
                        <ReactTable
                            data={prvList}
                            filterable
                            columns={prvHeaders}
                            defaultPageSize={10}
                            showPaginationTop
                            showPaginationBottom={false}
                            className="-striped -highlight"
                        />
                    </div>
                }
            />
        )
    }
}

export default DataTable;
