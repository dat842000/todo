import React from 'react';
import formatDate from "../utils/formatDate";
import TaskCounter from "./TaskCounter";
import TaskRender from "./TaskRender";
import TaskStatus from "./TaskStatus";
import TaskRemover from "./TaskRemover";

function TaskList({
                      selectedDate,
                      tasks,
                      setTasks
                  }) {

    const displayedTodos = tasks.filter(task => formatDate(task.date) === formatDate(selectedDate));

    const onTaskRemove = (taskRemove) => {
        const newTaskList = tasks.filter(task => formatDate(task.date) !== formatDate(taskRemove.date) && task.description === taskRemove.description);
        setTasks(newTaskList);
    };

    const onStatusChange = (event, taskToChange) => {
        // bai tap 2
        const newTaskList = tasks.map((task) => {
            if (task.id === taskToChange.id) {
                return {
                    ...task,
                    done: event.target.checked,
                }
            } else {
                return task;
            }
        });
        setTasks(newTaskList);
    };

    return (
        <>
            <div style={{display: 'flex', margin: '15px'}}>
                <div style={{marginRight: '35px'}}>
                    <strong>Task of date {formatDate(selectedDate)}</strong>
                    {displayedTodos.map((task, index) => (
                        <li key={index}>
                            <TaskStatus task={task} onStatusChange={onStatusChange}/>
                            <TaskRender task={task}/>
                            <TaskRemover task={task} onTaskRemove={onTaskRemove}/>
                        </li>
                    ))
                    }
                </div>

            </div>
            <hr/>
            <TaskCounter tasks={tasks}/>
        </>
    );
}

export default TaskList;