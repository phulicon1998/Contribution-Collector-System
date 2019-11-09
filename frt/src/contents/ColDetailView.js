const ColDetailView = {
    header: {
        title: "Collection detail"
    },
    api: {
        delete: (coordId, colId) => `/api/coordinators/${coordId}/collections/${colId}`,
        getOne: (faId, colId) => `/api/faculties/${faId}/collections/${colId}`,
    },
    submit: {
        apiCreate: (student_id) => `/api/students/${student_id}/contributions`,
        uploadImage: {
            type: ['image/*']
        },
        uploadWord: {
            type: [".docx"]
        }
    }
}

export default ColDetailView;
