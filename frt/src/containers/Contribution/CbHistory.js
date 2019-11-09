import React, { Component } from "react";
import {apiAppCall} from "../../services/api";
import {connect} from "react-redux";
import withNotice from "../../hocs/withNotice";
import access from "../../services/credential";
import CbHistory from "../../components/Contribution/CbHistory";

class CbHistoryContainer extends Component {
    constructor(props){
        super(props);
        this.state = {
            title: "",
            list: []
        }
    }

    studentFilter = (data) => {
        const {user} = this.props;
        return data.contribution_id.filter(val => val.student_id._id === user._id);
    }

    lecturerFilter = (data) => {
        const {user} = this.props;
        let latests = data.contribution_id.filter(val => val.latest);
        let pendings = latests.filter(val => val.approveStatus === "Pending");
        let list = pendings.filter(con => con.student_id.lecturer_id === user._id);
        return list;
    }

    coordFilter = (data) => {
        return data.contribution_id.filter(val => val.approveStatus === "Approve");
    }

    async componentDidMount(){
        let {notify, user, apiGetOne, match, access} = this.props;
        let {col_id} = match.params;
        try {
            let colData = await apiAppCall("get", apiGetOne(user.faculty_id, col_id));
            let list;
            if(access("001")) {
                list = this.studentFilter(colData);
            } else if(access("002")) {
                list = this.lecturerFilter(colData);
            } else {
                list = this.coordFilter(colData);
            }
            this.setState({title: colData.title, list});
        } catch(err){
            return notify("error", "The data cannot loaded. Please try again.");
        }
    }

    render() {
        const {access, match} = this.props;
        let {col_id} = match.params;
        return <CbHistory
            {...this.props}
            {...this.state}
            col_id={col_id}
            access={access}
        />
    }

}

function mapState({user}) {
    return {
        user: user.data,
        access: access(user.data.roles[0].code)
    }
}

export default connect(mapState, null)(withNotice(CbHistoryContainer));
