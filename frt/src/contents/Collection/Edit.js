const EditColFormView = {
    header: {
        title: "Edit Collection"
    },
    btn: {
        text: "Update",
        icon: "fas fa-pencil-alt"
    },
    msg: "Update collection successfully!",
    api:{
        get: (coor_id, col_id) => `/api/coordinators/${coor_id}/collections/${col_id}`,
        submit: (coor_id, col_id) => `/api/coordinators/${coor_id}/collections/${col_id}`,
    }
}

export default EditColFormView;
