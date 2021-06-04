import * as React from "react";
import get from "axios";
import {
    Route,
    Link,
    BrowserRouter as Router,
    Switch,
    Redirect,
} from "react-router-dom";
import routes from "./routes";
import Login from "./src/components/login/login";
import "./app.css";
import { CssBaseline, makeStyles } from "@material-ui/core";
import Nav from "./src/components/sharedComponents/Nav";
import { AbstractProps } from "..";
import { useSelector } from "react-redux";
import store from "./global/store/store";
import {
    tryAutoAuthentication,
    setCurrentBrowserPath,
    toggleModal,
} from "./global/actions/userAction";
import IWModal from "./src/components/sharedComponents/IWModal";

type IAppProps = AbstractProps & {
    context: string;
    path: string;
};

// const App: React.FC<AppProps> = () => {
//     return (
//         <React.Fragment>
//             {routes.map((r) => {
//                 return (
//                     <Route
//                         path={r.path}
//                         exact={r.exact}
//                         render={(props) => {
//                             return <r.component {...props} {...r.props} />;
//                         }}
//                     />
//                 );
//             })}
//         </React.Fragment>
//     );
// };
const useStyles = makeStyles((theme) => ({
    root: {
        display: "flex",
    },
    toolbar: theme.mixins.toolbar,
    content: {
        flexGrow: 1,
        padding: theme.spacing(3),
    },
}));

const App: React.FC<IAppProps> = (props: IAppProps) => {
    React.useEffect(() => {
        store.dispatch(tryAutoAuthentication("User"));
    }, []);
    const handleSearchPath = () => {
        const path = localStorage.getItem("path");
        store.dispatch(setCurrentBrowserPath(""));
        if (path && path.trim() !== "") {
            localStorage.removeItem("path");
        }
    };
    const classes = useStyles();
    const user = useSelector<{ userInfo }>((state) => state.userInfo);
    const handleIWModal = () => {
        store.dispatch(
            toggleModal(
                !(user as any).modalOpen.val,
                (user as any).modalOpen.type
            )
        );
    };
    return (
        <React.Fragment>
            {!user ? (
                <Redirect to={`/`} />
            ) : (
                <Redirect
                    to={
                        localStorage.getItem("path")
                            ? `/user/${localStorage.getItem("path")}`
                            : "/user/dashboard"
                    }
                />
            )}
            <Switch>
                <Route path="/user" exact={false}>
                    <div className={classes.root}>
                        <CssBaseline />
                        <Nav {...props} path={localStorage.getItem("path")} />
                        <main className={classes.content}>
                            <div className={classes.toolbar} />
                            <Switch>
                                {routes.map((route) => {
                                    return (
                                        <Route
                                            path={route.path}
                                            exact={route.exact}
                                            render={(props) => {
                                                if (route.path === "*") {
                                                    handleSearchPath();
                                                }
                                                return (
                                                    <route.component
                                                        {...props}
                                                        {...route.props}
                                                    />
                                                );
                                            }}
                                        ></Route>
                                    );
                                })}
                            </Switch>
                        </main>
                        {user && (user as any).modalOpen && (
                            <IWModal
                                modalOpen={(user as any).modalOpen.val || false}
                                handleOnClose={handleIWModal}
                                modalType={(user as any).modalOpen.type || ""}
                                user={user}
                            />
                        )}
                    </div>
                </Route>
                <Route
                    path="/"
                    exact={true}
                    render={(props) => {
                        return <Login {...props} />;
                    }}
                />
                <Route
                    path="*"
                    render={(props) => {
                        handleSearchPath();
                        return <Redirect to={`/`} />;
                    }}
                />
            </Switch>
        </React.Fragment>
    );
};

// const App: React.FC<AppProps> = ({test}) => {

//     const [stateTest,setStatetest] = React.useState("")

//     const sampleRequestToServer = () =>{
//         get(`${process.env.REACT_APP_API}/user`).then(res=>{
//             console.log(res)
//             setStatetest((res.data as any)[0].personalSettings.name)
//         })
//     }
//     return (
//         <h1><button onClick={()=>{sampleRequestToServer()}}>TEST</button>HELLO <br></br> {test}<br></br>{stateTest}</h1>
//     )
// }

export default App;
