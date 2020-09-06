import React, {useState} from 'react';
import './App.css';

const errorStyle = {color: "red"};

function App() {

    // Local State management => redux (global state)
    const [tasks, setTasks] = useState([]);
    const [newTaskDescription, setNewTaskDescription] = useState("");
    const [error, setError] = useState();

    const handleChangeNewTask = (event) => {
        const value = event.target.value;
        setNewTaskDescription(value);
    };

    const handleClickAdd = (event) => {
        // bai tap 1: check duplicate
        setError("");
        if (newTaskDescription === "") {
                 setError("Task cannot be empty");
         } else {
             tasks.map((task, index) => {
                 if (newTaskDescription === task) {
                     setError("Task cannot be duplicate");
                 }
             })
         }
         if (error === "" || error === undefined) {
             const newTask = {
                 done: false,
                 description: newTaskDescription
             };
             const newTaskList = [newTask, ...tasks];
             setTasks(newTaskList);
             setNewTaskDescription("");
         }
    };

    const removeTask = (indexToBeDeleted) => {
        const newTaskList = tasks.filter((x, index) => index !== indexToBeDeleted);
        setTasks(newTaskList);
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

    const handleCheckboxOnChange = (event, indexToBeDone) => {
        // bai tap 2



    }

    return (
        <>
            <h2>Welcome to my todo list</h2>
            <div>
                <span>Please enter your task:</span>
                <input value={newTaskDescription} onChange={handleChangeNewTask}/>
                <button onClick={handleClickAdd}>Add</button>
                <div style={errorStyle}>{error}</div>
            </div>

            <div>
                <strong>Task list:</strong>
                <ol>
                    {tasks.map((task, index) => (
                        <li>
                            <input type={"checkbox"} checked={task.done}
                                   onChange={event => handleCheckboxOnChange(event, index)}/>
                            {renderTask(task)}
                            <button onClick={event => removeTask(index)}>Remove</button>
                            {
                                task.done ? <button onClick={event => markTaskAsUndone(index)}>Mark as undone</button>
                                    : <button onClick={event => markTaskAsDone(index)}>Mark as done</button>
                            }
                        </li>
                    ))}
                </ol>

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
