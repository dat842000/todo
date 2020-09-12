import React from 'react';
import TaskDescription from "./TaskDescription";

function TaskRender({task}) {

    const renderTask = (task) => {
        if (task.done) {
            return (
                <del><TaskDescription task={task}/></del>
            )
        }
        return <TaskDescription task={task}/>
    };

    return (
        <span style={{margin: '10px'}}>{renderTask(task)}</span>
    );
}

export default TaskRender;