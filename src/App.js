import React, {useState} from 'react';
import './App.css';
import Calendar from "react-calendar";
import 'react-calendar/dist/Calendar.css';
import DeleteIcon from '@material-ui/icons/Delete';
import IconButton from "@material-ui/core/IconButton";
import {makeStyles} from "@material-ui/core/styles";

const errorStyle = {color: "red"};
function formatDate(d){
    return new Intl.DateTimeFormat('en', { year: 'numeric', month: "numeric", day: "numeric" }).format(d)
}
function App() {

  // Local State management => redux (global state)
  const [tasks, setTasks] = useState([]);
  const [newTaskDescription, setNewTaskDescription] = useState("");
  const [error, setError] = useState();
  const [selectedDate, setSelectedDate] = useState(new Date());

  const onCalendarChange = (date) => {
    setSelectedDate(date);
  };

  const handleChangeNewTask = (event) => {
    const value = event.target.value;
    setNewTaskDescription(value);
  };

  const handleClickAdd = (event) => {
    // bai tap 1: check duplicate
    let e = "";
    if (newTaskDescription === "") {
      e = "Task cannot be empty";
    }
    else {
      for (let index = 0; index < displayedTodos.length; index++) {
        if (newTaskDescription === displayedTodos[index].description) {
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

  const removeTask = (taskRemove) => {
    const newTaskList = tasks.filter(task => formatDate(task.date) !== formatDate(taskRemove.date) && task.description === taskRemove.description );
    setTasks(newTaskList);
  };
  // @anhquan: khong dung nhu the nay
  // const fiter = (selectedDate) => {
  //     const  tempTask = tasks.filter(task => task.date === selectedDate);
  //     setdateTask(tempTask);
  // };

  // @anhquan: ma phai filter cai tasks, de tao ra mot array moi
  const displayedTodos = tasks.filter(task => formatDate(task.date) === formatDate(selectedDate));

  const howManyTodosOnDate = date => {
      return tasks.filter(task => formatDate(task.date) === formatDate(date)).length
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
      </div>
      <div style={{display:'flex' , margin: '15px'} }>
          <div style={{marginRight: '35px'}}>
              <strong>Task of date {formatDate(selectedDate)}</strong>
              {/* @anhquan: ko dung filter o day nhu the nay duoc */}
              {/* {fiter(selectedDate)} */}
              {displayedTodos.map((task, index) => (
                  <li>
                      <input type={"checkbox"} checked={task.done}
                             onChange={event => handleCheckboxOnChange(index)}/>
                      <span style={{margin: '10px'}}>{renderTask(task)}</span>
                      <button onClick={event => removeTask(task)}>Remove</button>
                  </li>
              ))
              }

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
        <hr/>
        <block>
          Total: {tasks.length} {tasks.length === 1 ? "task" : "tasks"}
        </block>


      <h3>Copyright &copy; 2020 mytodo </h3>

    </>
  );
}

export default App;
