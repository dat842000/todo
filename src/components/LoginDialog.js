import React, {useEffect, useState} from 'react';
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import {useDispatch, useSelector} from "react-redux";
import {getLoginDialogOpen, getLoginError, userActions} from "../reducers/userReducer";
import TextField from "@material-ui/core/TextField";
import {DialogContentText, Typography} from "@material-ui/core";
import Button from "@material-ui/core/Button";
import {red} from "@material-ui/core/colors";
import warning from "react-redux/lib/utils/warning";

function LoginDialog(props) {
    const [username, setUsername] = useState();
    const [password, setPassword] = useState();
    const open = useSelector(getLoginDialogOpen);
    const error = useSelector(getLoginError);
    const dispatch = useDispatch();
    useEffect(()=>{
        if(open){
            setUsername("");
            setPassword("");
        }
    },[open]);
    const onUserNameChange= (event) => {
        setUsername(event.target.value)
    }
    const onPasswordChange= (event) => {
        setPassword(event.target.value)
    }
    const handleSubmit = () => {
        console.log(username, password)
        dispatch({
            type : userActions.login,
            payload : {username,password},
        })
    }
    const handleClose = () => {
        dispatch({
            type: userActions.hideLoginDialog,

        })
    };
    return (
        <Dialog onClose={handleClose} aria-labelledby="simple-dialog-title" open={open}>
            <DialogTitle id="simple-dialog-title">Login</DialogTitle>
            <DialogContentText>
                <div style={{display: "flex", margin: "30px"}}>
                    <form noValidate autoComplete="off">
                        <div style={{flex: 1}}>
                            <TextField id="UserName" label="Username" value={username} onChange={onUserNameChange}/>
                        </div>
                        <div style={{flex: 1}}>
                            <TextField id="Password" label="Password" value={password} onChange={onPasswordChange}/>
                        </div>
                        <div>
                            <Typography variant={"body2"} color={"error"}>{error}</Typography>
                        </div>
                        <div>
                            <Button onClick={handleSubmit} >Submit</Button>
                        </div>
                    </form>
                </div>
            </DialogContentText>
        </Dialog>
    );
}

export default LoginDialog;