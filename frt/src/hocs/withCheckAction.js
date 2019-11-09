import React, {Component} from "react";
import DataTable from "../components/Manage/DataTable";

export default function withConfirmBar(ConfirmBar) {
    class ConfirmBar extends Component {

        listStudent = (user_id) => {
            const {history} = this.props;
            return history.push(`/manage/lecturers/${user_id}/students`);
        }

        render() {
            return (
                <DataTable {...this.props} fn={this.listStudent} fnStyle="default" fnIcon="fas fa-user"/>
            )
        }
    }

    return ConfirmBar;
}
