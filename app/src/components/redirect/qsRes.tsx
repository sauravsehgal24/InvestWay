import * as React from "react";
import Grid from "@material-ui/core/Grid";
import { Button,Box, makeStyles } from "@material-ui/core";
import VpnKeyIcon from '@material-ui/icons/VpnKey';
import PersonIcon from '@material-ui/icons/Person';
import get from "axios";
import { AbstractProps } from "../../../..";

type QsProcessRedirectProps = AbstractProps & {
    test:string,
} 

const QsProcessRedirect:React.FC<QsProcessRedirectProps> =  (props)=>{
    const a_code = props.match.params.code
    const initQsOAuth = async () =>{
        console.log(a_code)
    }
    return (
        <React.Fragment>
            <button onClick={()=>initQsOAuth()}>CLICK</button>
        <h1>
            QS REDIRECT {props.test}
        </h1>
        </React.Fragment>
    )
}
export default QsProcessRedirect
