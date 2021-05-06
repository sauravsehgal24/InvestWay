import Login from './src/components/login/login';
import QsProcessRedirect from './src/components/redirect/qsRes';
import Dashboard from './src/components/userPortal/dashboard';
const routes =[
    {
        path:"/",
        component:Login,
        exact:true,
        props:{
            test:"jam"
        }
    },
    {
        path:"/:code",
        component:QsProcessRedirect,
        exact:true,
        props:{
            test:"QS PROP"
        }
    },
    {
        path:"/dashboard",
        component:Dashboard,
        exact:true,
        protected:true,
        props:{
            test:"DASHBOARD"
        }
    },
    {
        path:"/dashboard/trade",
        component:Dashboard,
        protected:true,
        exact:true,
        props:{
            test:"TRADE"
        }
    },
    {
        path:"/dashboard/profileSettings",
        component:Dashboard,
        protected:true,
        exact:true,
        props:{
            test:"SETTINGS"
        }
    },
    {
        path:"/dashboard/reports",
        component:Dashboard,
        protected:true,
        exact:true,
        props:{
            test:"REPORTS"
        }
    }
]

export default routes