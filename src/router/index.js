import {lazy} from "react";

import Loading from "../components/common/Loading"

const Home = lazy(() => import("../page/home/index"));
const Login = lazy(() => import("../page/login/index"));
const Markdown = lazy(() => import("../page/markdown/index"));

const routers = [
    {
        component: Home,
        route: "/home",
        loadingComponent: Loading
    },
    {
        component: Login,
        route: "/login",
        loadingComponent: Loading
    },
    {
        component: Markdown,
        route: "/markdown",
        loadingComponent: Loading
    },
];

export default routers
