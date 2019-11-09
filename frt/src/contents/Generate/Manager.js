const GenerateManagerView = {
    header: {
        title: "Create Manager"
    },
    apiForUnready: "/api/managers/unready",
    form: {
        title: "Add manager's email",
        hasFaculty: false,
        excel: {
            sheet: "Managers"
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
        userType: "Manager",
        genApi: "/api/auth/manager",
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
        deleteApi: "/api/managers/",
        toTd: (data) => [data.email]
    }
}

export default GenerateManagerView;
