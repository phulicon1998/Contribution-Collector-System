import React, { Component } from "react";
import {connect} from "react-redux";
import {apiAppCall} from "../../services/api";
import withNotice from "../../hocs/withNotice";
import access from "../../services/credential";
import CbDetail from "../../components/Contribution/CbDetail";

class CbDetailContainer extends Component {
    constructor(props){
        super(props);
        this.state = {}
    }

    load = async() => {
        let {match, user, api} = this.props;
        let {col_id, cb_id} = match.params;
        let detail = await apiAppCall("get", api.getOne(user.faculty_id, col_id, cb_id));
        this.setState({...detail});
    }

    async componentDidMount(){
        let {notify} = this.props;
        try{
            await this.load();
        } catch(err){
            return notify("error", "The data cannot loaded. Please try again.");
        }
    }

    handleDelete = async() => {
        const {notify, user, match, api, history} = this.props;
        const {col_id, cb_id} = match.params;
        if(window.confirm("Do you want to delete this contribution?")){
            try{
                await apiAppCall("delete", api.getOne(user.faculty_id, col_id, cb_id));
                return history.push("/submissions");
            } catch(err){
                return notify("error", "Cannot delete this contribution now. Please try again");
            }
        }
    }

    handleStatus = async(status) => {
        const {notify, user, match, history, api} = this.props;
        const {col_id, cb_id} = match.params;
        if(window.confirm(`Do you want to ${status.toLowerCase()} this contribution?`)){
            try{
                await apiAppCall("put", api.approve(user.faculty_id, col_id, cb_id), {status});
                return history.push("/submissions");
            } catch(err){
                return notify("error", "Cannot process the operation. Please try again.");
            }
        }
    }

    handlePublic = async() => {
        const {notify, user, match, api} = this.props;
        const {selectForPublic} = this.state;
        const {col_id, cb_id} = match.params;
        if(window.confirm("Do you want to public this contribution?")){
            try{
                await apiAppCall("put", api.public(user.faculty_id, col_id, cb_id), {select: !selectForPublic});
                await this.load();
                return notify("success", "Public contribution successfully!");
            } catch(err){
                return notify("error", "Cannot public this contribution now. Please try again.");
            }
        }
    }

    render() {
        return (
            <CbDetail
                {...this.props}
                {...this.state}
                hdPublic={this.handlePublic}
                hdStatus={this.handleStatus}
                hdDelete={this.handleDelete}
                load={this.load}
            />
        );
    }
}

const mapState = ({user}) => {
    return {
        user: user.data,
        access: access(user.data.roles[0].code)
    }
}

export default connect(mapState, null)(withNotice(CbDetailContainer));
