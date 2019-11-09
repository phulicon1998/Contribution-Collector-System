const CbDetailView = {
    header: {
        title: "Contribution Detail"
    },
    api: {
        getOne: (faculty_id, collection_id, contribution_id) => `/api/faculties/${faculty_id}/collections/${collection_id}/contributions/${contribution_id}`,
        approve: (faculty_id, collection_id, contribution_id) => `/api/faculties/${faculty_id}/collections/${collection_id}/contributions/${contribution_id}/approve`,
        public: (faculty_id, collection_id, contribution_id) => `/api/faculties/${faculty_id}/collections/${collection_id}/contributions/${contribution_id}/public`,
        comment: (faculty_id, collection_id, contribution_id) => `/api/faculties/${faculty_id}/collections/${collection_id}/contributions/${contribution_id}/comment`,
    }
}

export default CbDetailView;
