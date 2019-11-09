import React, {Component} from "react";

export default function withMoreAction(DataTable) {
    class MoreAction extends Component {

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

    return MoreAction;
}
