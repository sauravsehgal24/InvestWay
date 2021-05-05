import * as React from "react";
import Grid from "@material-ui/core/Grid";
import { Button,Box, makeStyles } from "@material-ui/core";
import ViewerLogin from "./viewerLoginModal";
import VpnKeyIcon from '@material-ui/icons/VpnKey';
import PersonIcon from '@material-ui/icons/Person';

const useStyles = makeStyles((theme) => ({
    buttonsMeta: {
      fontSize:"17px",
      color:"white",
      height:"70px",
      width:"350px"
    },
  }));

type LoginProps = {
    test:string
}

const Login:React.FC<LoginProps> = (props:LoginProps)=>{

    const [viewerLogin,setViewerLogin] = React.useState(false)
    const classes = useStyles()
    const handleViewerLoginModal = ()=>{
        setViewerLogin(false)
    }
    const _qsLogin = async () =>{
        console.log(props.test)
    }
    return (
        <Grid style={{height:"100vh",backgroundImage:"url(../../../assets/images/loginBg.jpg)", backgroundRepeat:"no-repeat",backgroundSize:"100% 100vh"}} container alignItems="center" justify="center" direction="column" >
            <Button onClick={()=>{_qsLogin()}} startIcon={<VpnKeyIcon />} style={{marginTop:"2%",backgroundColor: "#00a152",}}className={classes.buttonsMeta} variant="contained" size="large" >Login with Questrade</Button>
            <Button startIcon={<PersonIcon />} className={classes.buttonsMeta} style={{marginTop:"1%"}} size="large" variant="contained" color="secondary">Viewer Login</Button>
            <ViewerLogin open={viewerLogin} handleViewerLoginModal={handleViewerLoginModal}></ViewerLogin>
        </Grid>
    )
}

export default Login

