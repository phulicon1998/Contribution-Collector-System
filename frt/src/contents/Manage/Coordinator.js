import React from "react";

const ManageCoordinatorView = {
    header: {
        title: "Manage Coordinator"
    },
    apiGet: "/api/coordinators",
    col: 3,
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
        hideAct: false,
        title: "List Of All Coordinators",
        generate: true,
        link: "/manage/coordinators/new",
        apiDelete: (id) => `/api/coordinators/${id}`,
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
            }
        ]
    },
    form: {
        title: "Update Coordinator Information",
        api: {
            getFa: "/api/faculties",
            update: "/api/coordinators"
        }
    }
}

export default ManageCoordinatorView;
