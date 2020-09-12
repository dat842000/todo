import React from 'react';

function TaskRender({task}) {

    const renderTask = (task) => {
        if (task.done) {
            return (
                <del>{task.description}</del>
            )
        }
        return task.description
    };

    return (
        <span style={{margin: '10px'}}>{renderTask(task)}</span>
    );
}

export default TaskRender;