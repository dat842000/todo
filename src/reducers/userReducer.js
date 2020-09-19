import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    username: "demo",
    firstName: "Alice",
    lastName: "Biering",
    lastLoginDate: new Date(),
};

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