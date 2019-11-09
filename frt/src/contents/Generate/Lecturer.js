const GenerateLecturerView = {
    header: {
        title: "Create Lecturer"
    },
    apiForUnready: "/api/lecturers/unready",
    form: {
        title: "Add lecturer's email",
        hasFaculty: true,
        excel: {
            sheet: "Lecturers"
        },
        gatherData: data => {
            if(data.email !== "" && Object.keys(data.faculty).length > 0){
                return {
                    email: data.email,
                    faculty: data.faculty
                }
            } else {
                return false;
            }
        }
    },
    ungenerate: {
        userType: "Lecturer",
        genApi: "/api/auth/lecturer",
        title: "Ungenerated Account List",
        colHeaders: ["Email", "Faculty"],
        toTd: (data) => [data.email, data.faculty.label],
        toSubmit: (data) => ({
            email: data.email,
            faculty_id: data.faculty.value
        }),
        button: true
    },
    unready: {
        title: "Unactive Account List",
        colHeaders: ["Email", "Faculty"],
        button: false,
        toTd: (data) => [data.email, data.faculty_id.name],
        deleteApi: "/api/lecturers/"
    }
}

export default GenerateLecturerView;
