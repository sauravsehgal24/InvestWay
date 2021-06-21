import Login from "./src/components/login/login";
import PageNotFound from "./src/components/pageNotFound";
import QsProcessRedirect from "./src/components/redirect/qsRes";
import Dashboard from "./src/components/userPortal/dashboard";
import QsAccountsPage from "./src/components/userPortal/qsAccounts";
import SettingsPage from "./src/components/userPortal/settings";
import TabData from "./src/components/userPortal/tabDataPage";
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
        path: "/user/questrade/:path",
        component: TabData,
        protected: true,
        exact: true,
        props: {
            test: "POSITIONS",
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
