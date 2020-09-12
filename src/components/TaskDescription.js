import React from 'react';
import Typography from "@material-ui/core/Typography";

function TaskDescription({task}) {
    return (
        <Typography component={"span"}>
            {task.description} ({task.id})
        </Typography>
    );
}

export default TaskDescription;