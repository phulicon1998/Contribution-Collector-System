//==============================================================================
// IMPORT COMPONENT

// Authentication
import LoginForm from "../components/Login/LoginForm";
// Manage Collection
import ColListContainer from "../containers/Collection/ColList";
// Manage Contribution
import CbHistoryContainer from "../containers/Contribution/CbHistory";
// Manage Faculty
import FacultyForm from "../components/Faculty/FacultyForm";
// Manage reports
import ListReport from "../components/Report/ListReport";
import NumberPercentCb from "../components/Report/NumberPercentCb";
import NumberCbtor from "../components/Report/NumberCbtor";
import ExceptionReport from "../components/Report/ExceptionReport";
// Generate user
import FacultySelect from "../components/Generate/FacultySelect";
import DataTable from "../components/Table/DataTable";
// Views
import AssignStudent from "../components/views/AssignStudent";
// Manage users
import {NoFaUserForm} from "../components/Form/UserForm";
import FaUserForm from "../components/Form/FaUserForm";

//==============================================================================
// IMPORT CONTAINER

import HomeContainer from "../containers/views/Home";

// Authentication
import AddProfile from "../containers/Login/First/AddProfile";
import ChangePassword from "../containers/Login/First/ChangePassword";

// Collection
import ColDetailContainer from "../containers/Collection/ColDetail";
import ColFormContainer from "../containers/Collection/ColForm";
import ColGridContainer from "../containers/Collection/ColGrid";

// Contribution
import CbDetailContainer from "../containers/Contribution/CbDetail";

//==============================================================================
// IMPORT DISPLAY

// Authentication
import LoginView from "./LoginView";
import AddProfileView from "./AddProfileView";
import ChangePasswordView from "./ChangePasswordView";
// Home
import Home from "./Home";
// Manage reports
import NumberPercentCbView from "./NumberPercentCbView";
import ListReportView from "./ListReportView";
import NumberCbtorView from "./NumberCbtorView";
import ExceptionReportView from "./ExceptionReportView";
// Collections
import collection from "./Collection";
import ColDetailView from "./ColDetailView";
// Contributions
import contribution from "./Contribution";
import CbHistoryView from "./CbHistoryView";
// Manage users
import manage from "./Manage";
// Generate users
import gen from "./Generate";

//==============================================================================
// IMPORT HOCS

import withForm from "../hocs/withForm";
import generateUser from "../hocs/generateUser";
import withGenerateForm from "../hocs/withGenerateForm";
import withMoreAction from "../hocs/withMoreAction";

//==============================================================================

export const path = [
    // AUTHENTICATE PATHS
    {
        path: "/login/profile",
        code: [],
        component: AddProfile,
        display: AddProfileView
    },
    {
        path: "/login/password",
        code: [],
        component: ChangePassword,
        display: ChangePasswordView
    },
    {
        path: "/login",
        code: ["005"],
        component: LoginForm,
        display: LoginView
    },
    // COLLECTION PATHS
    {
        path: "/collections/:col_id/edit",
        code: ["001", "002", "003"],
        condition: (user) => user.faculty_id !== undefined,
        component: ColFormContainer,
        display: collection.Edit
    },
    {
        path: "/collections/new",
        code: ["001", "002", "003"],
        condition: (user) => user.faculty_id !== undefined,
        component: ColFormContainer,
        display: collection.Add
    },
    {
        path: "/collections/:col_id",
        code: ["001", "002", "003"],
        condition: (user) => user.faculty_id !== undefined,
        component: ColDetailContainer,
        display: ColDetailView
    },
    // CONTRIBUTION PATHS
    {
        path: "/submissions/:col_id/contributions/:cb_id",
        code: ["001", "002", "003"],
        condition: (user) => user.faculty_id !== undefined,
        component: CbDetailContainer,
        display: contribution.Detail
    },
    {
        path: "/submissions/:col_id/contributions",
        code: ["001", "002", "003"],
        condition: (user) => user.faculty_id !== undefined,
        component: CbHistoryContainer,
        display: CbHistoryView
    },
    // ADMIN PATHS
    {
        path: "/manage/students/new",
        code: ["000"],
        component: generateUser(withGenerateForm(FacultySelect)),
        display: gen.Student
    },
    {
        path: "/manage/lecturers/new",
        code: ["000"],
        component: generateUser(withGenerateForm(FacultySelect)),
        display: gen.Lecturer
    },
    {
        path: "/manage/lecturers/:lecturer_id/students",
        code: ["000"],
        component: AssignStudent,
        display: manage.Assign
    },
    {
        path: "/manage/coordinators/new",
        code: ["000"],
        component: generateUser(withGenerateForm()),
        display: gen.Coordinator
    },
    {
        path: "/manage/managers/new",
        code: ["000"],
        component: generateUser(withGenerateForm()),
        display: gen.Manager
    },
    // REPORTS PATH
    {
        path: "/report/cb/detail",
        code: ["000", "003", "004"],
        component: NumberPercentCb,
        display: NumberPercentCbView
    },
    {
        path: "/report/cbtor/detail",
        code: ["000", "003", "004"],
        component: NumberCbtor,
        display: NumberCbtorView
    },
    {
        path: "/report/exception",
        code: ["000", "003", "004"],
        component: ExceptionReport,
        display: ExceptionReportView
    },
    { redirect: true, path: "/", pathTo: "/home", name: "Home", code: false }
];

export const sidebarPath = [
    {
        path: "/home",
        code: [],
        name: "Home",
        icon: "pe-7s-home",
        component: HomeContainer,
        display: Home
    },
    // COLLECTION PATHS
    {
        path: "/collections",
        code: ["001", "002", "003"],
        condition: (user) => user.faculty_id !== undefined,
        icon: "pe-7s-portfolio",
        name: "Manage Collection",
        component: ColListContainer,
        display: collection.List
    },
    // SUBMISSION PATHS
    {
        path: "/submissions",
        code: ["001", "002", "003"],
        icon: "pe-7s-photo",
        condition: (user) => user.faculty_id !== undefined,
        name: "Manage Submissions",
        component: ColGridContainer,
        display: collection.Grid
    },
    // FACULTY PATHS
    {
        path: "/faculty",
        code: ["000"],
        icon: "pe-7s-photo",
        name: "Manage Faculties",
        component: withForm(DataTable, FacultyForm),
        display: manage.Faculty
    },
    // ADMIN PATHS
    {
        collapse: true,
        path: "/manage",
        code: ["000"],
        name: "Manage accounts",
        state: "openManageAccounts",
        icon: "pe-7s-id",
        display: false,
        views: [
            {
                path: "/manage/students",
                name: "Student Accounts",
                mini: "S",
                component: withForm(DataTable, FaUserForm),
                display: manage.Student
            },
            {
                path: "/manage/lecturers",
                name: "Lecturer Accounts",
                mini: "L",
                component: withForm(withMoreAction(DataTable), FaUserForm),
                display: manage.Lecturer
            },
            {
                path: "/manage/coordinators",
                name: "Coordinator Accounts",
                mini: "C",
                component: withForm(DataTable, NoFaUserForm),
                display: manage.Coordinator
            },
            {
                path: "/manage/managers",
                name: "Manager Accounts",
                mini: "M",
                component: withForm(DataTable, NoFaUserForm),
                display: manage.Manager
            }
        ]
    },
    {
        path: "/admin",
        code: ["000"],
        icon: "pe-7s-photo",
        name: "Generate Admin",
        component: generateUser(withGenerateForm()),
        display: gen.Admin
    },
    // REPORT PATHS
    {
        collapse: true,
        path: "/report",
        code: ["003"],
        name: "Manage reports",
        state: "openReports",
        icon: "pe-7s-note2",
        display: false,
        views: [
            {
                path: "/report/cb",
                name: "Number & Percentage",
                mini: "PN",
                component: ListReport,
                display: ListReportView
            },
            {
                path: "/report/cbtor",
                name: "Contributor",
                mini: "C",
                component: ListReport,
                display: ListReportView
            }
        ]
    }
]

export const allPath = [...path, ...sidebarPath];
