import {lazy} from "react";

import Loading from "../components/common/Loading"

const Home = lazy(() => import("../page/home/index"));
const Login = lazy(() => import("../page/login/index_1"));
const Markdown = lazy(() => import("../page/markdown/index"));
const ArticleDetail = lazy(() => import("../page/home/ArticleDetail"));

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
    {
        component: ArticleDetail,
        route: "/articleDetail",
        loadingComponent: Loading
    },
];

export default routers
