const CbInCollectionView = {
    header: {
        title: "View Contribution Submited In Collection"
    },
    content: {
        api: {
            apiGetCb: (coordinator_id, collection_id) => `/api/coordinators/${coordinator_id}/collections/${collection_id}/contributions`,
        },
        contributionList:{
            info: "Student",
            color: "pe-7s-notebook text-info"
        }
    }
}

export default CbInCollectionView;
