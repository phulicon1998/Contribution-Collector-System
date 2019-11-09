const GenerateStudentView = {
    header: {
        title: "Create Student"
    },
    apiForUnready: "/api/students/unready",
    form: {
        title: "Add student's email",
        hasFaculty: true,
        excel: {
            sheet: "Students"
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
        userType: "Student",
        genApi: "/api/auth/student",
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
        deleteApi: "/api/students/"
    }
}

export default GenerateStudentView;
