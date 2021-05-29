const LoginPage = () => import("../views/Login.vue");
const CreateCoursePage = () => import("../views/CreateCourse.vue");
const CreateClassPage = () => import("../views/CreateClass.vue");
const CreateGroupPage = () => import("../views/CreateGroup.vue");
const CoursesPage = () => import("../views/CoursesPage.vue");
const SchedulePage = ()=> import("../views/Schedule.vue");
const GenerateCodePage = ()=> import("../views/GenerateCode.vue");
const CourseClasses = () => import("../views/CourseClasses.vue")


const routes = [
    // {
    //     path: "/",
    //     redirect: "/home",
    //     name: "Home"
    // },
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
        path: "/generate-code",
        name: "Generate code",
        component: GenerateCodePage
    },
    {
        path: "/course/:courseId/classes",
        name: "course-classes",
        component: CourseClasses
    },
];

export default routes;
