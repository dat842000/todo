import {createSlice} from "@reduxjs/toolkit";
import {createSelector} from "reselect/src";
import differenceInSeconds from 'date-fns/differenceInSeconds';
import differenceInMinutes from 'date-fns/differenceInMinutes';
import differenceInHours from 'date-fns/differenceInHours';

const initialState = {
    username: "demo",
    firstName: "Alice",
    lastName: "Biering",
    lastLoginDate: new Date(),
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
);
export const getLastLoginDate = createSelector(getUser, user => user.lastLoginDate);
export const getLastLoginSince = createSelector(
    getLastLoginDate,
    (lastLoginDate) => {
        const now = new Date();
        const seconds = differenceInSeconds(now, lastLoginDate);
        const minutes = differenceInMinutes(now, lastLoginDate);
        const hours = differenceInHours(now, lastLoginDate);
        let since = "";
        if(hours === 0 && minutes === 0 && seconds < 15){
            return "just now";
        }
        if(hours > 0){
            since += hours + (hours > 1 ? " hours" : " hour");
        }
        if(minutes >0){
            since+=" " + minutes + (minutes > 1 ? " minutes" : " minute");
        }
        if(seconds >0){
            since +=" " + seconds + (seconds > 1 ? " seconds" : " second");
        }
        return since;
    }
)

const userSlice = createSlice({
        name: "userSlice",
        initialState: initialState,
        reducers: {
            login: (state, action) => {

            },

            logout: (state, action) => {

            }
        }
    }
);
export const userReducer = userSlice.reducer;
export const userActions = userSlice.actions;