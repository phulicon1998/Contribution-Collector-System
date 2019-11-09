import React from "react";

const ManageManagerView = {
    header: {
        title: "Manage Manager"
    },
    apiGet: "/api/managers",
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
        title: "List Of All Managers",
        generate: true,
        link: "/manage/managers/new",
        apiDelete: "/api/managers",
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
        title: "Update Manager Information",
        api: {
            update: "/api/managers"
        }
    }
}

export default ManageManagerView;
