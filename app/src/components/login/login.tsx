import * as React from "react";
import Grid from "@material-ui/core/Grid";
import { Button, makeStyles } from "@material-ui/core";
import ViewerLogin from "./viewerLoginModal";
import VpnKeyIcon from '@material-ui/icons/VpnKey';
import PersonIcon from '@material-ui/icons/Person';
import get from "axios";
import {AbstractProps} from '../../../..';

const useStyles = makeStyles((theme) => ({
    buttonsMeta: {
      fontSize:"17px",
      color:"white",
      height:"70px",
      width:"350px"
    },
  }));

type LoginProps = AbstractProps & {
    test:string,
}
type qsServerRes = {
    cCode:string,
    qsAuthUrl:string,
    callBackUri:string
}
const Login:React.FC<LoginProps> = (props:LoginProps)=>{
    const [viewerLogin,setViewerLogin] = React.useState(false)
    const [qsData,setQsData] = React.useState({} as qsServerRes)
    const classes = useStyles()
    const handleViewerLoginModal = ()=>{
        setViewerLogin(false)
    }
    const _qsRequestClientCode = async () =>{
       get(`${process.env.REACT_APP_LOOPBACK}/request_c_code`).then(async res=>{
           if(res.status === 200 && res.data){
                const cCode=res.data.c_code.toString()
                const callBackUri = res.data.callbackUri.toString()
                let qsApiAuthUrl = res.data.url.toString().replace(/CLIENT_ID/,cCode)
                qsApiAuthUrl = qsApiAuthUrl.replace(/REDIRECT_URI/,callBackUri)
                setQsData({
                    cCode:cCode,
                    qsAuthUrl:qsApiAuthUrl,
                    callBackUri:callBackUri
                })
            //props.history.push(`/qs_callback/${c_code}`);
           }
       }).catch(err=>{
           console.log(err)
       })
    }

    React.useEffect(()=>{
        if(qsData && qsData.qsAuthUrl)
        initQsLogin().then(res=>{
            console.log("asdasdsda")
        })
    },[qsData])
   // https://login.questrade.com/oauth2/authorize?client_id=LWjXJs0BXPyhNnFQ58N-DKo6qr2Y892G0&response_type=code&redirect_uri=http://localhost:3001/qs_callback
    const initQsLogin = async()=>{
        if(qsData && qsData.qsAuthUrl){
            console.log(qsData.qsAuthUrl)
            window.location = qsData.qsAuthUrl as unknown as Location
        }
    }
    return (
        <Grid style={{height:"100vh",backgroundImage:"url(../../../assets/images/loginBg.jpg)", backgroundRepeat:"no-repeat",backgroundSize:"100% 100vh"}} container alignItems="center" justify="center" direction="column" >
            <Button onClick={()=>{_qsRequestClientCode()}} startIcon={<VpnKeyIcon />} style={{marginTop:"2%",backgroundColor: "#00a152",}}className={classes.buttonsMeta} variant="contained" size="large" >Login with Questrade</Button>
            <Button startIcon={<PersonIcon />} className={classes.buttonsMeta} style={{marginTop:"1%"}} size="large" variant="contained" color="secondary">Viewer Login</Button>
            <ViewerLogin open={viewerLogin} handleViewerLoginModal={handleViewerLoginModal}></ViewerLogin>
        </Grid>
    )
}

export default Login

