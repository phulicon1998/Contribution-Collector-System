import React, {Component} from "react";
import { Table } from "react-bootstrap";
import GenerateUserRow from "./GenerateUserRow";
import Card from "../Card/Card.jsx";
import Button from "../CustomButton/CustomButton.jsx";
import {apiAppCall} from "../../services/api";
import "../../assets/css/Generate/generateUser.css";

const Empty = () => <div className="generateEmpty">The list is empty.</div>

class GenerateListCard extends Component {

    removeFn = async(deleteKey) => {
        let {notify} = this.props;
        try {
            if(window.confirm("Do you want to remove this data?")){
                const {deleteApi, modifyFn, list} = this.props;
                if(deleteApi){
                    let deleteId = list.filter(val => val.email === deleteKey)[0]._id;
                    await apiAppCall("delete", `${deleteApi}${deleteId}`);
                    notify("success", "Delete data successfully!");
                }
                modifyFn(deleteKey);
            }
        } catch(err) {
            return notify("error", "The process get some errors. Please try again");
        }
    }

    handleClick = async() => {
        const {genApi, userType, list, toSubmit} = this.props;
        let submitList = list.map(val => toSubmit(val));
        let rs = await apiAppCall("post", genApi, {accounts: submitList, userType});
        this.props.refresh(rs);
    }

    render() {
        const {colHeaders, title, list, button, toTd} = this.props;
        let header = colHeaders.map((val, index) => (<th key={index}>{val}</th>));
        let listConfigData = list.map((val, index) => ({
            td: toTd(val),
            deleteKey: val.email
        }));
        let listData = listConfigData.map((val, index) => (
            <GenerateUserRow index={index+1} row={val.td} key={index} deleteFn={this.removeFn.bind(this, val.deleteKey)}/>
        ));
        return (
            <Card
                title={title}
                category="All the accounts will be removed after generating process"
                tableFullWidth
                content={
                    list.length > 0
                    ? <Table responsive>
                        <thead>
                            <tr>
                                <th className="text-center">#</th>
                                {header}
                                <th className="text-center">Actions</th>
                            </tr>
                        </thead>
                        <tbody>{listData}</tbody>
                    </Table>
                    : <Empty />
                }
                legend={button && list.length > 0 && <Button bsStyle="success" fill onClick={this.handleClick}>Generate</Button>}
            />
        )
    }
}

export default GenerateListCard;
