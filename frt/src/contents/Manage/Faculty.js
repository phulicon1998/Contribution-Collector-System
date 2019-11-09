const ManageFacultyView = {
    header: {
        title: "Manage Faculty"
    },
    apiGet: "/api/faculties",
    col: 12,
    toTd: (list) => {
        return list.map(({_id, name, desc, coordinator_id}) => {
            return {
                id: _id,
                name,
                description: desc !== "" ? desc : "No description",
                coordName: coordinator_id ? coordinator_id.viewname : "Unassigned"
            }
        })
    },
    table: {
        hideAct: false,
        title: "List Of All Faculties",
        generate: false,
        apiDelete: (id) => `/api/faculties/${id}`,
        headers: [
            {
                Header: "Name",
                accessor: "name"
            },
            {
                Header: "Description",
                accessor: "description"
            },
            {
                Header: "Coordinator",
                accessor: "coordName"
            }
        ]
    }
}

export default ManageFacultyView;
