import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import {Provider} from "react-redux";
import {createStore} from "redux";
import rootReducer from "./reducers/rootReducer";
import * as firebase from "firebase/app";
import "firebase/auth";
import {FirebaseAuthProvider} from "@react-firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyAOsehrrTle-Mk80q8qO2TYPpGQazwqLmQ",
    authDomain: "react-todo-27092020.firebaseapp.com",
    projectId: "react-todo-27092020",
    databaseURL: "https://react-todo-27092020.firebaseio.com"
};

const store = createStore(rootReducer);
window.store = store;

ReactDOM.render(
    <React.StrictMode>
        <FirebaseAuthProvider firebase={firebase} {...firebaseConfig}>
            <Provider store={store}>
                <App/>
            </Provider>
        </FirebaseAuthProvider>
    </React.StrictMode>,
    document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
