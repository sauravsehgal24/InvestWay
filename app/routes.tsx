import Login from './src/components/login/login';
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
        path:"/dashboard",
        component:Dashboard,
        exact:true,
        props:{
            test:"DASHBOARD"
        }
    },
    {
        path:"/dashboard/trade",
        component:Dashboard,
        exact:true,
        props:{
            test:"TRADE"
        }
    },
    {
        path:"/dashboard/profileSettings",
        component:Dashboard,
        exact:true,
        props:{
            test:"SETTINGS"
        }
    },
    {
        path:"/dashboard/reports",
        component:Dashboard,
        exact:true,
        props:{
            test:"REPORTS"
        }
    }
]

export default routes