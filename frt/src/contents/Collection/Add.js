const AddColFormView = {
    header: {
        title: "Open Collection"
    },
    btn: {
        text: "Create",
        icon: "fas fa-plus"
    },
    msg: "Add new collection successfully!",
    api: {
        submit: (coordinator_id) => `/api/coordinators/${coordinator_id}/collections`,    
    }
}

export default AddColFormView;
