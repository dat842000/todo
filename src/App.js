import React, {useState} from 'react';
import './App.css';
import Calendar from "react-calendar";
import 'react-calendar/dist/Calendar.css';
// import DeleteIcon from '@material-ui/icons/Delete';
// import IconButton from "@material-ui/core/IconButton";
// import {makeStyles} from "@material-ui/core/styles";

const errorStyle = {color: "red"};

function App() {

    // Local State management => redux (global state)
    const [tasks, setTasks] = useState([]);
    const [newTaskDescription, setNewTaskDescription] = useState("");
    const [error, setError] = useState();
    const [selectedDate, setselectedDate] = useState(new Date());
    // const [dateTask, setdateTask] = useState(tasks.filter(task => task.date === selectedDate));
    const [dateTask, setdateTask] = useState([]);


    const onChange = (date) => {
        setselectedDate(date);
    };
    const handleChangeNewTask = (event) => {
        const value = event.target.value;
        setNewTaskDescription(value);
    };

    const handleClickAdd = (event) => {
        // bai tap 1: check duplicate
        let e="";
        if (newTaskDescription === "") {
                 e="Task cannot be empty";
         } else {
             for(let index =0;index<tasks.length;index++){
                 if (newTaskDescription === tasks[index].description) {
                     e="Task cannot be duplicate";
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

    const removeTask = (indexToBeDeleted) => {
        const newTaskList = tasks.filter((x, index) => index !== indexToBeDeleted);
        setTasks(newTaskList);
    };
    const fiter = (selectedDate) => {
        const  tempTask = tasks.filter(task => task.date === selectedDate);
        setdateTask(tempTask);
    };

    const markTaskAsDone = (indexToBeDone) => {
        const newTaskList = tasks.map((task, index) => {
            if (index === indexToBeDone) {
                return {
                    ...task,
                    done: true
                }
            } else {
                return task;
            }
        })

        setTasks(newTaskList);
    }

    const markTaskAsUndone = (indexToBeUndone) => {
        const newTaskList = tasks.map((task, index) => {
            if (index === indexToBeUndone) {
                return {
                    ...task,
                    done: false
                }
            } else {
                return task;
            }
        })

        setTasks(newTaskList);
    }

    const renderTask = (task) => {
        if (task.done) {
            return (
                <del>{task.description}</del>
            )
        }

        return task.description
    }


    const handleCheckboxOnChange = (indexToBeUndone) => {
        // bai tap 2
        const newTaskList = tasks.map((task, index) => {
            if (index === indexToBeUndone) {
                return {
                    ...task,
                    done: !task.done,
                }
            } else {
                return task;
            }
        })
        setTasks(newTaskList);
    }
    // const useStyles = makeStyles((theme) => ({
    //     button: {
    //         margin: theme.spacing(1),
    //     },
    // }));
    // let classes = useStyles();
        return (
            <>
                {/*{classes = useStyles()}*/}
                <h2>Welcome to my todo list</h2>
                <div>
                    <span>Please enter your task:</span>
                    <input value={newTaskDescription} onChange={handleChangeNewTask}/>
                    <button onClick={handleClickAdd}>Add</button>
                    <div style={errorStyle}>{error}</div>
                </div>

                <div>
                    <strong>Task list:</strong>
                    {fiter(selectedDate)}
                    {dateTask.map((task, index) => (
                        <li>
                            <input type={"checkbox"} checked={task.done}
                                   onChange={event => handleCheckboxOnChange(index)}/>
                            <span style={{margin: '10px'}}>{renderTask(task)}</span>
                            <button onClick={event => removeTask(index)}>Remove</button>
                            {/*<IconButton aria-label="delete">*/}
                            {/*    <DeleteIcon/>*/}
                            {/*</IconButton>*/}
                        </li>
                    ))
                    }
                    <div>
                        <Calendar
                            onChange={onChange}
                            value={selectedDate}
                        />
                    </div>
                    <hr/>
                    <block>
                        Total: {tasks.length} {tasks.length === 1 ? "task" : "tasks"}
                    </block>
                </div>

                <h3>Copyright &copy; 2020 mytodo </h3>

            </>
        );
    }

export default App;
