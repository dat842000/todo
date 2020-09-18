import React, {useState} from 'react';
import './App.css';
import Calendar from "react-calendar";
import 'react-calendar/dist/Calendar.css';
import {useDispatch, useSelector} from "react-redux";
import {getTasks} from "./reducers/selectors";
// import DeleteIcon from '@material-ui/icons/Delete';
// import IconButton from "@material-ui/core/IconButton";
// import {makeStyles} from "@material-ui/core/styles";

const errorStyle = {color: "red"};
function formatDate(d){
    return new Intl.DateTimeFormat('en', { year: 'numeric', month: "numeric", day: "numeric" }).format(d)
}
function App() {

  // Local State management => redux (global state)
  const tasks = useSelector(getTasks);
  const dispatch = useDispatch();
  const [newTaskDescription, setNewTaskDescription] = useState("");
  const [error, setError] = useState();
  const [selectedDate, setSelectedDate] = useState(new Date());

  const setTasks = (tasks)=>{
    dispatch({type:"SET_TASKS", payload: tasks})
  }

  const onCalendarChange = (date) => {
    setSelectedDate(date);
  };

  const handleChangeNewTask = (event) => {
    const value = event.target.value;
    setNewTaskDescription(value);
  };

  const handleClickAdd = (event) => {
    let e = "";
    if (newTaskDescription === "") {
      e = "Task cannot be empty";
    }
    else {
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

  const removeTask = (indexToBeDeleted) => {
    const newTaskList = tasks.filter((x, index) => index !== indexToBeDeleted);
    setTasks(newTaskList);
  };
  const displayedTodos = tasks.filter(task => formatDate(task.date) === formatDate(selectedDate));

  const howManyTodosOnDate = date => {
      return tasks.filter(task => formatDate(task.date) === formatDate(date)).length
  }

  const markTaskAsDone = (indexToBeDone) => {
    const newTaskList = tasks.map((task, index) => {
      if (index === indexToBeDone) {
        return {
          ...task,
          done: true
        }
      }
      else {
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
      }
      else {
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
      }
      else {
        return task;
      }
    })
    setTasks(newTaskList);
  }
  return (
    <>
      {/*{classes = useStyles()}*/}
      <h2>Welcome to my todo list</h2>
      <div style={{display:'flex'}}>
        <div style={{marginRight: 24}}>
          <span>Please enter your task:</span>
          <input value={newTaskDescription} onChange={handleChangeNewTask}/>
          <button onClick={handleClickAdd}>Add</button>
          <div style={errorStyle}>{error}</div>
        </div>
        <div>
            <div>
                The selected date is : {new Intl.DateTimeFormat('en', { weekday: "long", year: 'numeric', month: "numeric", day: "numeric" }).format(selectedDate)}
            </div>
          <Calendar
            onChange={onCalendarChange}
            value={selectedDate}
            tileContent={({ activeStartDate, date, view }) => {
                const counter = howManyTodosOnDate(date);
                if (counter>0){
                    return ` (${counter})`;
                }
            }}
          />
        </div>
      </div>


      <div>
        <strong>Task of date {formatDate(selectedDate)}</strong>
        {/* @anhquan: ko dung filter o day nhu the nay duoc */}
        {/* {fiter(selectedDate)} */}
        {displayedTodos.map((task, index) => (
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
