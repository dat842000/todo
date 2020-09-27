import {createSlice} from "@reduxjs/toolkit";
import {createSelector} from "reselect/src";
import differenceInSeconds from 'date-fns/differenceInSeconds';
import differenceInMinutes from 'date-fns/differenceInMinutes';
import differenceInHours from 'date-fns/differenceInHours';

const initialState = {
    username: null,
    firstName: null,
    lastName: null,
    lastLoginDate: null,
    dialogOpen: false,
    error : null,
};
export const getUser = state => state.user
export const getUserName = createSelector(getUser, user => user.username);
export const getFirstName = createSelector(getUser, user => user.firstName);
export const getLastName = createSelector(getUser, user => user.lastName);
export const getFullName = createSelector(
    getFirstName,
    getLastName,
    (firstName, lastName) => {
        return firstName + " " + lastName;
    }
)
export const isUserLogin = createSelector(getUserName, username => username !== null);
export const getLoginDialogOpen = createSelector(
    getUser, user => user.dialogOpen);
export const getLastLoginDate = createSelector(getUser, user => user.lastLoginDate);
export const getLastLoginSince = (now = new Date()) => createSelector(
    getLastLoginDate,
    (lastLoginDate) => {
        const seconds = differenceInSeconds(now, lastLoginDate);
        const minutes = differenceInMinutes(now, lastLoginDate);
        const hours = differenceInHours(now, lastLoginDate);
        let since = "";
        if (hours === 0 && minutes === 0 && seconds < 5) {
            return "just now";
        }
        if (hours > 0) {
            since += hours + (hours > 1 ? " hours" : " hour");
        }
        if (minutes > 0) {
            since += " " + minutes + (minutes > 1 ? " minutes" : " minute");
        }
        if (seconds > 0) {
            since += " " + seconds + (seconds > 1 ? " seconds" : " second");
        }
        return since;
    }
)
export const  getLoginError = createSelector(getUser, user => user.error);
const userSlice = createSlice({
        name: "userSlice",
        initialState: initialState,
        reducers: {
            /**
             * @function UserActions~login
             */
            login: (state, action) => {
                const {username, password} = action.payload;
                if (username === "dat" && password === "1234") {
                    state.firstName = "Dat";
                    state.lastName = "Nguyen";
                    state.username = "Dat";
                    state.lastLoginDate = new Date();
                    state.dialogOpen = false;
                }else {
                    state.error = "username and password do not match";
                }
            },
            /**
             * @function UserActions~logout
             */
            logout: (state, action) => {
                state.firstName = null;
                state.lastName = null;
                state.username = null;
                state.lastLoginDate = null;
                state.dialogOpen = false;
                state.error = null;
            },
            /**
             * @function UserActions~showLoginDialog
             */
            showLoginDialog: (state, action) => {
                state.dialogOpen = true;
            },
            /**
             * @function UserActions~hideLoginDialog
             */
            hideLoginDialog: (state, action) => {
                state.dialogOpen = false;
            },
        }
    }
);
export const userReducer = userSlice.reducer;
/**
 * @type {UserActions}
 */
export const userActions = userSlice.actions;