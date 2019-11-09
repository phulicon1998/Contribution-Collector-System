import React, { Component } from "react";
import {connect} from "react-redux";
import {apiAppCall} from "../../services/api";
import ColDetail from "../../components/Collection/ColDetail";
import access from "../../services/credential";
import withNotice from "../../hocs/withNotice";

class ColDetailContainer extends Component {
    constructor(props){
        super(props);
        this.state = {
            detail: {
                contribution_id: []
            }
        }
    }

    hdDelete = async() => {
        let {notify, api, user} = this.props;
        try{
            if(window.confirm("Do you want delete this collection?")){
                const {col_id} = this.props.match.params;
                await apiAppCall("delete", api.delete(user._id, col_id));
                this.props.history.push("/collections");
                return notify("success", "Delete collection successfully!");
            }
        } catch(err){
            return notify("error", "Cannot delete this collection. Please try again");
        }
    }

    hdUpdate = async() => {
        const {col_id} = this.props.match.params;
        this.props.history.push(`/collections/${col_id}/edit`);
    }

    loadData = async() => {
        let {user, api} = this.props;
        const {col_id} = this.props.match.params;
        let detail = await apiAppCall("get", api.getOne(user.faculty_id, col_id));
        this.setState({detail: this.filterData(detail)});
    }

    filterData = (detail) => {
        const {contribution_id} = detail;
        const {access, user} = this.props;
        if(access("002")){
            let pendCon = contribution_id.filter(val => val.latest).filter(val => val.approveStatus === "Pending");
            detail.ownContribution_id = pendCon.filter(con => con.student_id.lecturer_id === user._id);
        } else if (access("003")) {
            detail.ownContribution_id = contribution_id.filter(val => val.approveStatus === "Approve");
        }
        return detail;
    }

    async componentDidMount(){
        try{
            await this.loadData();
        } catch(err){
            return this.props.notify("error", "The data cannot loaded. Please try again.");
        }
    }

    render() {
        const {detail} = this.state;
        return <ColDetail
            {...this.props}
            detail={detail}
            hdUpdate={this.hdUpdate}
            hdDelete={this.hdDelete}
            load={this.loadData}
        />
    }
}

function mapState({user}) {
    return {
        user: user.data,
        access: access(user.data.roles[0].code)
    }
}

export default connect(mapState, null)(withNotice(ColDetailContainer));
