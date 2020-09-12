import React, {useState} from 'react';
import {FormControlLabel} from "@material-ui/core";
import Button from "@material-ui/core/Button";

const errorStyle = {color: "red"};

function InputTask({
                       selectedDate,
                       tasks,
                       error,
                       setTasks,
                       setError
                   }) {
    const [newTaskDescription, setNewTaskDescription] = useState("");

    const handleChangeNewTask = (event) => {
        const value = event.target.value;
        setNewTaskDescription(value);
    };

    const handleClickAdd = (event) => {
        // bai tap 1: check duplicate
        let e = "";
        if (newTaskDescription === "") {
            e = "Task cannot be empty";
        } else {
            for (let index = 0; index < tasks.length; index++) {
                if (newTaskDescription === tasks[index].description) {
                    e = "Task cannot be duplicate";
                }
            }
        }
        if (e === "") {
            const newTask = {
                date: selectedDate,
                done: false,
                description: newTaskDescription
            };
            const newTaskList = [newTask, ...tasks];
            setTasks(newTaskList);
            setNewTaskDescription("");
        }
        setError(e);
    };

    return (
        <div style={{display: 'flex'}}>
            <div style={{marginRight: 24}}>
                <FormControlLabel control={<input value={newTaskDescription}
                                                  onChange={handleChangeNewTask}/>}
                                  label={"Please enter your task:"}
                                  labelPlacement={"start"}
                />

                <Button onClick={handleClickAdd}>Add</Button>
                <div style={errorStyle}>{error}</div>
            </div>
        </div>
    );
}

export default InputTask;