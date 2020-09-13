import React, {useState} from 'react';
import {FormControlLabel} from "@material-ui/core";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import {classes} from "istanbul-lib-coverage";

const {v4: uuidv4} = require('uuid');

const errorStyle = {color: "red"};

// Bai tap 2:
// - them priority (DANGER, WARNING, NORMAL, LOW) vao cau truc cua task
// - thay doi <TaskDescription> :
//      DANGER : red
//      WARNING: yellow
//      NORMAL: mau mac dinh
//      LOW: grey
const createNewTask = ({description, date}) =>
    ({
        id: uuidv4(),
        date,
        done: false,
        description
    });

function InputTask({
                       selectedDate,
                       tasks,
                       error,
                       setTasks,
                       setError,
                       displayedTodos
                   }) {
    const [newTaskDescription, setNewTaskDescription] = useState("");

    const handleChangeNewTask = (event) => {
        const value = event.target.value;
        setNewTaskDescription(value);
    };

    const handleClickAdd = (event) => {
        let e = "";
        if (newTaskDescription === "") {
            e = "Task cannot be empty";
        } else {
            for (let index = 0; index < displayedTodos.length; index++) {
                if (newTaskDescription === displayedTodos[index].description) {
                    e = "Task cannot be duplicate";
                }
            }
        }

        if (e === "") {
            const newTask = createNewTask({description: newTaskDescription, date: selectedDate});
            const newTaskList = [newTask, ...tasks];
            setTasks(newTaskList);
            setNewTaskDescription("");
        }
        setError(e);
    };

    return (
        <div style={{display: 'flex'}}>
            <div style={{marginRight: 24}}>
                <TextField id="standard-basic"
                           label="Your task"
                           value={newTaskDescription}
                           onChange={handleChangeNewTask} />
                <Button onClick={handleClickAdd}
                        variant="contained"
                        color="secondary"
                        size={"small"}
                        style={{margin: "15px"}}
                >Add</Button>
                <div style={errorStyle}>{error}</div>
            </div>
        </div>
    );
}

export default InputTask;