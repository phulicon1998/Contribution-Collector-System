const GenerateAdminView = {
    header: {
        title: "Generate Admin"
    },
    apiForUnready: "/api/admins/unready",
    form: {
        title: "Add admin's email",
        hasFaculty: false,
        excel: {
            sheet: "Admins"
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
        userType: "Admin",
        genApi: "/api/auth/admin",
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
        deleteApi: "/api/admins/",
        toTd: (data) => [data.email]
    }
}

export default GenerateAdminView;
