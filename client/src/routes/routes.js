const LoginPage = () => import("../views/Login.vue");
const CreateCoursePage = () => import("../views/CreateCourse.vue");
const CreateClassPage = () => import("../views/CreateClass.vue");
const CreateGroupPage = () => import("../views/CreateGroup.vue");
const CoursesPage = () => import("../views/CoursesPage.vue");
const SchedulePage = ()=> import("../views/Schedule.vue");
const GenerateCodePage = ()=> import("../views/GenerateCode.vue");
const CourseClasses = () => import("../views/CourseClasses.vue");
const CreateUser = () => import("../views/CreateUser.vue")
const EnterCode = () => import("../views/EnterCode.vue")
const ConfirmedAttendance = () => import("../views/ConfirmedAttendance.vue")
const AttendanceDenied = () => import("../views/AttendanceDenied.vue")
const ClassView = () => import("../views/ClassView.vue")


const routes = [
    {
        path: "/",
        redirect: "/courses",
        name: "Home"
    },
    {
        path: "/login",
        name: "Login",
        component: LoginPage
    },
    {
        path: "/create/course",
        name: "Create Course",
        component: CreateCoursePage
    },
    {
        path: "/courses",
        name: "Courses",
        component: CoursesPage
    },
    {
        path: "/create/class",
        name: "Create Class",
        component: CreateClassPage
    },
    {
        path: "/schedule",
        name: "Schedule",
        component: SchedulePage
    },
    {
        path: "/create/group",
        name: "Create group",
        component: CreateGroupPage
    },
    {
        path: "/generate-code/:classId",
        name: "generate-code",
        component: GenerateCodePage
    },
    {
        path: "/enter-code/:classId",
        name: "enter-code",
        component: EnterCode
    },
    {
        path: "/course/:courseId/classes",
        name: "course-classes",
        component: CourseClasses
    },
    {
        path: "/create/user",
        name: "create-user",
        component: CreateUser
    },
    {
        path: "/:classId/attendance/confirmed/:time",
        name: "confirmed",
        component: ConfirmedAttendance
    },
    {
        path: "/:classId/attendance/denied",
        name: "denied",
        component: AttendanceDenied
    },
    {
        path: "/courses/:course/:classId",
        name: "class-view",
        component: ClassView
    },
];

export default routes;
