import React from "react";

const ManageStudentView = {
    header: {
        title: "Manage Student"
    },
    apiGet: "/api/students",
    col: 3,
    toTd: (list) => {
        return list.map((user) => {
            return {
                id: user._id,
                profileImg: user.profileImg.link,
                viewname: user.viewname,
                email: user.email,
                faculty_id: user.faculty_id ? user.faculty_id._id : undefined,
                faculty: user.faculty_id ? user.faculty_id.name : "Unassigned"
            }
        })
    },
    table: {
        hideAct: false,
        title: "List Of All Students",
        generate: true,
        link: "/manage/students/new",
        apiDelete: (id) => `/api/students/${id}`,
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
                Header: "Faculty",
                accessor: "faculty"
            }
        ]
    },
    form: {
        title: "Update Student Information",
        api: {
            getFa: "/api/faculties",
            update: "/api/students"
        }
    }
}

export default ManageStudentView;
