import React from 'react';
import Button from "@material-ui/core/Button";

function TaskRemover({task, onTaskRemove}) {


    return (
        <Button onClick={event => onTaskRemove(task)}>Remove</Button>
    );
}

export default TaskRemover;