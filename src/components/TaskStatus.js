import React from 'react';
import Checkbox from "@material-ui/core/Checkbox";

function TaskStatus({task, onStatusChange}) {
    return (

        <Checkbox
            checked={task.done}
            color="primary"
            inputProps={{'aria-label': 'secondary checkbox'}}
            onChange={event => {
                onStatusChange(event, task)
            }}
        />
    );
}

export default TaskStatus;