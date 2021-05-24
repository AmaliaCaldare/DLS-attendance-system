const LoginPage = () => import("../views/Login.vue");
const CreateCoursePage = () => import("../views/CreateCourse.vue");
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
];

export default routes;
