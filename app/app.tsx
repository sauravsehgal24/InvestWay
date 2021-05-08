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

type IAppProps = AbstractProps & {
    context: string;
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
    const UserProtectedRoute = ({ ...rest }) => {
        const user = useSelector<{ userInfo }>((state) => state.userInfo);
        return (
            <Route
                {...rest}
                render={(props) =>
                    user ? (
                        <Redirect to={`/user/dashboard`} />
                    ) : (
                        <Redirect to={`/`} />
                    )
                }
            />
        );
    };
    const classes = useStyles();
    return (
        <React.Fragment>
            <Switch>
                <Route path="/user" exact={false}>
                    <div className={classes.root}>
                        <CssBaseline />
                        <Nav {...props} />
                        <main className={classes.content}>
                            <div className={classes.toolbar} />
                            <Switch>
                                {routes.map((route) => {
                                    console.log(route);
                                    return (
                                        <Route
                                            path={route.path}
                                            exact={route.exact}
                                            render={(props) => {
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
                    </div>
                </Route>
                <Route
                    path="/"
                    exact={true}
                    render={(props) => {
                        return <Login {...props} />;
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
