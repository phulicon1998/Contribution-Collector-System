import React, { Component } from "react";
import {apiAppCall} from "../../services/api";
import {connect} from "react-redux";
import withNotice from "../../hocs/withNotice";
import access from "../../services/credential";
import ColGrid from "../../components/Collection/ColGrid";

class ColGridContainer extends Component {
    constructor(props){
        super(props);
        this.state = {
            list: []
        }
    }

    async componentDidMount() {
        let {notify, apiGet, user, access} = this.props;
        try{
            let collections = await apiAppCall("get", apiGet(user.faculty_id));
            let faCols = collections.filter(col => col.faculty_id === user.faculty_id);
            let list;
            if(access("001")){
                list = this.getForStu(faCols);
            } else if(access("002")) {
                list = this.getForLec(faCols);
            } else {
                list = this.getForCoo(faCols);
            }
            this.setState({list});
        } catch (err){
            return notify("error", "The data cannot loaded. Please try again.");
        }
    }

    getForStu = (cols) => {
        const {user} = this.props;
        for(let col of cols){
            col.contribution_id = col.contribution_id.filter(val => val.student_id._id === user._id);
        }
        return cols.filter(col => col.contribution_id.length > 0);
    }

    getForLec = (cols) => {
        const {user} = this.props;
        for(let col of cols){
            col.contribution_id = col.contribution_id.filter(val => val.latest);
            col.contribution_id = col.contribution_id.filter(val => val.approveStatus === "Pending");
            col.contribution_id = col.contribution_id.filter(val => val.student_id.lecturer_id === user._id);
        }
        return cols.filter(col => col.contribution_id.length > 0);
    }

    getForCoo = (cols) => {
        for(let col of cols){
            col.contribution_id = col.contribution_id.filter(val => val.approveStatus === "Approve");
        }
        return cols.filter(col => col.contribution_id.length > 0);
    }

    render() {
        return <ColGrid {...this.props} {...this.state} />
    }
}

function mapState({user}) {
    return {
        user: user.data,
        access: access(user.data.roles[0].code)
    };
}

export default connect(mapState, null)(withNotice(ColGridContainer));
