import React from 'react';
import Typography from "@material-ui/core/Typography";

function TaskCounter({tasks}) {
    return (
        <div>
            <Typography variant={"subtitle2"}>
                Total: {tasks.length} {tasks.length === 1 ? "task" : "tasks"}
            </Typography>
        </div>
    );
}

export default TaskCounter;