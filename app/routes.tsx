import Login from "./src/components/login/login";
import PageNotFound from "./src/components/pageNotFound";
import QsProcessRedirect from "./src/components/redirect/qsRes";
import Dashboard from "./src/components/userPortal/dashboard";
import SettingsPage from "./src/components/userPortal/settings";
const routes = [
    {
        path: "/user/dashboard",
        component: Dashboard,
        protected: true,
        exact: true,
        props: {
            test: "DASHBOARD ACTUAL",
        },
    },
    {
        path: "/user/reports/deep",
        component: Dashboard,
        protected: true,
        exact: true,
        props: {
            test: "DEEP REPORTS",
        },
    },
    {
        path: "/user/profileSettings",
        component: SettingsPage,
        protected: true,
        exact: true,
        props: {
            test: "SETTINGS",
        },
    },
    {
        path: "/user/positions",
        component: Dashboard,
        protected: true,
        exact: true,
        props: {
            test: "POSITIONS",
        },
    },
    {
        path: "/user/executions",
        component: Dashboard,
        protected: true,
        exact: true,
        props: {
            test: "EXECUTIONS",
        },
    },
    {
        path: "/user/orders",
        component: Dashboard,
        protected: true,
        exact: true,
        props: {
            test: "ORDERS",
        },
    },
    {
        path: "*",
        component: PageNotFound,
        protected: false,
        exact: true,
        props: {
            test: "PAGE NOT FOUND",
        },
    },
];

export default routes;
