const Grid = {
    header: {
        title: "Manage Submission"
    },
    apiGet: (faculty_id) => `/api/faculties/${faculty_id}/collections`,
    collectionList: {
        info: "Collection",
        color: "pe-7s-notebook text-danger",
    }
}

export default Grid;
