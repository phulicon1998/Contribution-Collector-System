const GenerateCoordinatorView = {
    header: {
        title: "Create Coordinator"
    },
    apiForUnready: "/api/coordinators/unready",
    form: {
        title: "Add coordinator's email",
        hasFaculty: false,
        excel: {
            sheet: "Coordinators"
        },
        gatherData: (data) => {
            if(data.email !== ""){
                return {
                    email: data.email
                }
            } else {
                return false;
            }
        }
    },
    ungenerate: {
        userType: "Coordinator",
        genApi: "/api/auth/coordinator",
        title: "Ungenerated Account List",
        colHeaders: ["Email"],
        toTd: (data) => [data.email],
        toSubmit: (data) => ({
            email: data.email,
        }),
        button: true
    },
    unready: {
        title: "Unactive Account List",
        colHeaders: ["Email"],
        button: false,
        deleteApi: "/api/coordinators/",
        toTd: (data) => [data.email]
    }
}

export default GenerateCoordinatorView;
