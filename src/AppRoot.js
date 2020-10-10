import React from 'react';
import {Provider} from "react-redux";
import App from "./App";
import LoginPage from "./components/LoginPage";

function AppRoot({firebaseApp, store}) {
    console.log("AppRoot is rendered: ", {firebaseApp, store})

    const auth = firebaseApp.auth();
    const currentUser = auth.currentUser;
    const isUserAuthenticated = currentUser !== null;
    console.log("AppRoot !!! isUserAuthenticated = ", isUserAuthenticated)
    console.log("AppRoot !!! currentUser = ", currentUser)
    return (
        <>
            {isUserAuthenticated ?
                <Provider store={store}>
                    <App/>
                </Provider>
                : <LoginPage/>}
        </>
    );
}

export default AppRoot;