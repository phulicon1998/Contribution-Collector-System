const CbHistoryView = {
    header: {
        title: "Submitted Contribution"
    },
    apiGetOne: (faculty_id, collection_id) => `/api/faculties/${faculty_id}/collections/${collection_id}`,
}

export default CbHistoryView;
