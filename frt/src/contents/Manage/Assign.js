import React from "react";

const AssignStudentView = {
    header: {
        title: "Assign Student"
    },
    apiGet: "/api/students",
    apiGetLecturer: (lecturer_id) => `/api/lecturers/${lecturer_id}`,
    toTd: (list) => {
        return list.map((user) => {
            return {
                id: user._id,
                profileImg: user.profileImg.link,
                viewname: user.viewname,
                email: user.email
            }
        })
    },
    table: {
        headers: [
            {
                Header: "Profile Image",
                accessor: "profileImg",
                Cell: props => (
                    <div className="boxImg">
                        <img src={props.value} alt=""/>
                    </div>
                )
            },
            {
                Header: "Name",
                accessor: "viewname"
            },
            {
                Header: "Email",
                accessor: "email"
            },
            {
                Header: "Actions",
                accessor: "actions",
                sortable: false,
                filterable: false
            }
        ]
    }
}

export default AssignStudentView;
