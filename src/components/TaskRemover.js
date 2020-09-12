import React from 'react';
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from '@material-ui/icons/Delete';

function TaskRemover({task, onTaskRemove}) {

    return (
        <IconButton onClick={event => onTaskRemove(task)}
                    title={"Remove task"}
        >
            <DeleteIcon fontSize={"small"}/>
        </IconButton>
    );
}

export default TaskRemover;