import React, {useState} from 'react';
import Button from "@material-ui/core/Button";
import {useDispatch} from "react-redux";
import {todoActions} from "../reducers/todoReducer";

function RemoteTaskList() {

    const dispatch = useDispatch();
    const readTasks = () => {
        const todoRef = window.firebase.database().ref("/tasks");
        const last3Tasks = todoRef.limitToFirst(10);
        last3Tasks.once("value").then(snapshot => {
            const tasks = snapshot.val();
            dispatch({
                type: todoActions.setTasks,
                payload: tasks
            })
        }).catch(e=>{
            console.log("Error: ", e);
            dispatch({
                type: todoActions.setTasks,
                payload: []
            })
        })
    };

    return (
        <div>
            <Button onClick={readTasks}>Read tasks</Button>
        </div>
    );
}

export default RemoteTaskList;