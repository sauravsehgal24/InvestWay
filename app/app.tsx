import * as React from "react";
import get from "axios";
import {
  Route,
  Link,
  BrowserRouter as Router,
  Switch,
  Redirect,
} from "react-router-dom";
import Login from "./src/components/login/login";

type AppProps = {
    test:string
}

const App:React.FC<AppProps> = ()=>{
    return (
        <React.Fragment>
            <Switch>
                <Route exact path="/" component={Login} />
            </Switch>
        </React.Fragment>
    )
}

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