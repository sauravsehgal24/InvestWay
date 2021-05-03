import * as React from "react";
import get from "axios";
type AppProps = {
    test:string
}

const App: React.FC<AppProps> = ({test}) => {

    const [stateTest,setStatetest] = React.useState("")

    const sampleRequestToServer = () =>{
        get(`${process.env.REACT_APP_API}/user`).then(res=>{
            console.log(res)
            setStatetest((res.data as any)[0].personalSettings.name)
        })
    }
    return (
        <h1><button onClick={()=>{sampleRequestToServer()}}>TEST</button>HELLO <br></br> {test}<br></br>{stateTest}</h1>
    )
}

export default App;