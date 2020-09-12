import React from 'react';

function TaskStatus({task, onStatusChange}) {
    return (
        <input type={"checkbox"} checked={task.done}
               onChange={event => {
                   onStatusChange(event, task)
               }}/>
    );
}

export default TaskStatus;