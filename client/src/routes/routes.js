const LoginPage = () => import("../views/Login.vue");
const CreateCoursePage = () => import("../views/CreateCourse.vue");
const CreateClassPage = () => import("../views/CreateClass.vue");
const CoursesPage = () => import("../views/CoursesPage.vue");


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
];

export default routes;
