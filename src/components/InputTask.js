import React, {useState} from 'react';
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Checkbox from "@material-ui/core/Checkbox";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import withStyles from "@material-ui/core/styles/withStyles";
import green from "@material-ui/core/colors/green";
import grey from "@material-ui/core/colors/grey";
import {red, yellow} from "@material-ui/core/colors";

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
                       tasks,
                       error,
                       setTasks,
                       setError,
                       displayedTodos
                   }) {
    const [newTaskDescription, setNewTaskDescription] = useState("");
    const [selectedValue, setSelectedValue] = useState("Danger");

    const handleChange = (event) => {
        const value = event.target.value;
        setSelectedValue(value);
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
            const newTask = createNewTask({description: newTaskDescription, date: selectedDate, important: selectedValue});
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
                        checked={selectedValue === "Danger"}
                        label={"Danger"}
                    />
                    <FormControlLabel
                        control={<YellowCheckbox />}
                        value={"Warning"}
                        checked={selectedValue === "Warning"}
                        label={"Warning"}
                    />
                    <FormControlLabel
                        control={<GreenCheckbox />}
                        value={"Normal"}
                        checked={selectedValue === "Normal"}
                        label={"Normal"}
                    />
                    <FormControlLabel
                        control={<GreyCheckbox />}
                        value={"Low"}
                        checked={selectedValue === "Low"}
                        label={"Low"}
                    />
                </div>
                <div style={errorStyle}>{error}</div>
            </div>
        </div>
    );
}

export default InputTask;