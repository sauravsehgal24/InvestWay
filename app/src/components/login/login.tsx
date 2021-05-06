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
    refreshToken:string,
    qsAuthUrl:string,
    callbackUrl:string,
    consumerKey:string
}
const Login:React.FC<LoginProps> = (props:LoginProps)=>{
    const [viewerLogin,setViewerLogin] = React.useState(false)
    const [qsData,setQsData] = React.useState({} as qsServerRes)
    const classes = useStyles()
    const handleViewerLoginModal = ()=>{
        setViewerLogin(false)
    }
    const date = new Date("2020-08-25") 
    
    const _qsRequestClientCode = ()=>{
        get(`${process.env.REACT_APP_API}/qs/qs_auth_deal`).then(res=>{
            console.log(res.data)
        })
    }
    // const _qsRequestClientCode = async () =>{
    //    get(`${process.env.REACT_APP_LOOPBACK}/request_c_code`).then(async res=>{
    //        if(res.status === 200 && res.data){
    //             const refreshToken=res.data.refreshToken.toString()
    //             const callbackUrl = res.data.callbackUrl.toString()
    //             const consumerKey = res.data.consumerKey.toString()
    //             let qsApiAuthUrl = res.data.qsAuthUrl.toString().replace(/CLIENT_ID/,consumerKey)
    //             qsApiAuthUrl = qsApiAuthUrl.replace(/REDIRECT_URI/,callbackUrl)
    //             console.log(qsApiAuthUrl)
    //             setQsData({
    //                 refreshToken:refreshToken,
    //                 qsAuthUrl:qsApiAuthUrl,
    //                 callbackUrl:callbackUrl,
    //                 consumerKey:consumerKey
    //             })
    //         //props.history.push(`/qs_callback/${c_code}`);
    //        }
    //    }).catch(err=>{
    //        console.log("-----------------------------")
    //        console.log(err)
    //    })
    // }

    // React.useEffect(()=>{
    //     if(qsData && qsData.qsAuthUrl)
    //     initQsLogin().then(res=>{
    //         console.log("asdasdsda")
    //     })
    // },[qsData])
   // https://login.questrade.com/oauth2/authorize?client_id=LWjXJs0BXPyhNnFQ58N-DKo6qr2Y892G0&response_type=code&redirect_uri=http://localhost:3001/qs_callback
    // const initQsLogin = async()=>{
    //     if(qsData && qsData.qsAuthUrl){
    //         window.location = qsData.qsAuthUrl as unknown as Location
    //     }
    // }

   
    return (
        <Grid style={{height:"100vh",backgroundImage:"url(../../../assets/images/loginBg.jpg)", backgroundRepeat:"no-repeat",backgroundSize:"100% 100vh"}} container alignItems="center" justify="center" direction="column" >
            <Button onClick={()=>{_qsRequestClientCode()}} startIcon={<VpnKeyIcon />} style={{marginTop:"2%",backgroundColor: "#00a152",}}className={classes.buttonsMeta} variant="contained" size="large" >Login with Questrade</Button>
            <Button startIcon={<PersonIcon />} className={classes.buttonsMeta} style={{marginTop:"1%"}} size="large" variant="contained" color="secondary">Viewer Login</Button>
            <ViewerLogin open={viewerLogin} handleViewerLoginModal={handleViewerLoginModal}></ViewerLogin>
        </Grid>
    )
}

export default Login

