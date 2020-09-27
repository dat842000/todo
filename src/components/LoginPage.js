import React from 'react';
import * as firebase from "firebase";
import Button from "@material-ui/core/Button";

function LoginPage(props) {
    const handleLogin = () => {
        const googleAuthProvider = new firebase.auth.GoogleAuthProvider();
        firebase.auth().signInWithPopup(googleAuthProvider);
    }

    return (
        <div>
            <Button onClick={handleLogin}>Login</Button>
        </div>
    );
}

export default LoginPage;