import React, {useState} from 'react';
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Checkbox from "@material-ui/core/Checkbox";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import withStyles from "@material-ui/core/styles/withStyles";
import green from "@material-ui/core/colors/green";
import grey from "@material-ui/core/colors/grey";
import {red, yellow} from "@material-ui/core/colors";
import {useDispatch} from "react-redux";

const {v4: uuidv4} = require('uuid');

const errorStyle = {color: "red"};


// Bai tap 2:
// - them priority (DANGER, WARNING, NORMAL, LOW) vao cau truc cua task
// - thay doi <TaskDescription> :
//      DANGER : red
//      WARNING: yellow
//      NORMAL: mau mac dinh
//      LOW: grey
const createNewTask = ({description, date, important}) =>
    ({
        id: uuidv4(),
        date,
        done: false,
        description,
        important,
    });
const GreenCheckbox = withStyles({
    root: {
        color: grey[600],
        '&$checked': {
            color: green[700],
        },
    },
    checked: {},
})((props) => <Checkbox color="default" {...props} />);
const RedCheckbox = withStyles({
    root: {
        color: grey[600],
        '&$checked': {
            color: red[700],
        },
    },
    checked: {},
})((props) => <Checkbox color="default" {...props} />);
const YellowCheckbox = withStyles({
        root: {
            color: grey[600],
            '&$checked': {
                color: yellow[700],
            },
        },
        checked: {},
})((props) => <Checkbox color="default" {...props} />);
const GreyCheckbox = withStyles({
    root: {
        color: grey[600],
        '&$checked': {
            color: grey[700],
        },
    },
    checked: {},
})((props) => <Checkbox color="default" {...props} />);


function InputTask({
                       selectedDate,
                       error,
                       setError,
                       displayedTodos
                   }) {
    const [newTaskDescription, setNewTaskDescription] = useState("");
    const [newTaskPriority, setNewTaskPriority] = useState("Danger");
    const dispatch = useDispatch();
    const addTask = newTask => {
        const myAction = {
            type: "ADD_TASK",
            payload: newTask
        };
        dispatch(myAction);
    };

    const handleChange = (event) => {
        const value = event.target.value;
        setNewTaskPriority(value);
    };

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
            const newTask = createNewTask({
                description: newTaskDescription,
                date: selectedDate,
                important: newTaskPriority
            });
            addTask(newTask);
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
                           onChange={handleChangeNewTask}/>
                <Button onClick={handleClickAdd}
                        variant="contained"
                            color="secondary"
                        size={"small"}
                        style={{margin: "15px"}}
                >Add</Button>
                <div  onChange={handleChange}>
                    <FormControlLabel
                        control={<RedCheckbox />}
                        value={"Danger"}
                        checked={newTaskPriority === "Danger"}
                        label={"Danger"}
                    />
                    <FormControlLabel
                        control={<YellowCheckbox />}
                        value={"Warning"}
                        checked={newTaskPriority === "Warning"}
                        label={"Warning"}
                    />
                    <FormControlLabel
                        control={<GreenCheckbox />}
                        value={"Normal"}
                        checked={newTaskPriority === "Normal"}
                        label={"Normal"}
                    />
                    <FormControlLabel
                        control={<GreyCheckbox />}
                        value={"Low"}
                        checked={newTaskPriority === "Low"}
                        label={"Low"}
                    />
                </div>
                <div style={errorStyle}>{error}</div>
            </div>
        </div>
    );
}

export default InputTask;