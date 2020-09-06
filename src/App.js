import React, {useState} from 'react';
import './App.css';

const errorStyle = {color: "red"};

function App() {

    // Local State management => redux (global state)
    const [tasks, setTasks] = useState([]);
    const [newTaskDescription, setNewTaskDescription] = useState("");
    const [error, setError] = useState();
    const [counter, setCounter] = useState(0);

    const handleChangeNewTask = (event) => {
        const value = event.target.value;
        setNewTaskDescription(value);
    };

    const handleClickAdd = (event) => {

        setCounter(prev=>prev * 2 +1);
        // bai tap 1: check duplicate
        // asynchronous vs synchronous
        let e = "";
        console.log("L23: ", e);
        if (newTaskDescription === "") {
            e = "Task cannot be empty";
            console.log("L26: ", e);
         } else {
            for(let i=0;i<tasks.length;i++){
                if (tasks[i].description === newTaskDescription){
                    e = "Task cannot be duplicate";
                    break;
                }
            }
         }
         console.log("L35: ", e);
         if (e === "") {
             const newTask = {
                 done: false,
                 description: newTaskDescription
             };
             const newTaskList = [newTask, ...tasks];
             setTasks(newTaskList);
             setNewTaskDescription("");
         }

         setError(error);
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
        console.log(event);
    }

    return (
        <>
            <h2>Welcome to my todo list</h2>
            <div>
                <span>Please enter your task:</span>
                <input value={newTaskDescription} onChange={handleChangeNewTask}/>
                <button onClick={handleClickAdd}>Add {counter}</button>
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
