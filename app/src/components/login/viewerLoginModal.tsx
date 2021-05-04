import * as React from "react";
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';



type ViewerLoginProps = {
    open:boolean,
    handleViewerLoginModal:()=>void
}

const ViewerLogin:React.FC<ViewerLoginProps> = (props:ViewerLoginProps)=>{
    return (
        <Modal
            aria-labelledby="transition-modal-title"
            aria-describedby="transition-modal-description"
            open={props.open}
            BackdropComponent={Backdrop}
            closeAfterTransition={true}
            BackdropProps={{
              timeout: 500,
            }}
        >
            <div>
                LOGIN MODAL
            </div>
        </Modal>
    )
}

export default ViewerLogin

