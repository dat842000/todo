import React from 'react';
import withStyles from "@material-ui/core/styles/withStyles";
import grey from "@material-ui/core/colors/grey";
import green from "@material-ui/core/colors/green";
import Checkbox from "@material-ui/core/Checkbox";
import {red, yellow} from "@material-ui/core/colors";
import FormControlLabel from "@material-ui/core/FormControlLabel";



const GreenCheckbox = withStyles({
    root: {
        color: grey[600],
        '&$checked': {
            color: green[700],
        },
    },
    checked: {},
})((props) => <Checkbox color="default" {...props} />);
const RedCheckbox = withStyles({
    root: {
        color: grey[600],
        '&$checked': {
            color: red[700],
        },
    },
    checked: {},
})((props) => <Checkbox color="default" {...props} />);
const YellowCheckbox = withStyles({
    root: {
        color: grey[600],
        '&$checked': {
            color: yellow[700],
        },
    },
    checked: {},
})((props) => <Checkbox color="default" {...props} />);
const GreyCheckbox = withStyles({
    root: {
        color: grey[600],
        '&$checked': {
            color: grey[700],
        },
    },
    checked: {},
})((props) => <Checkbox color="default" {...props} />);


function TaskLevel({task}) {

    const levelTask = (task) => {
        if (task.important === "Danger") {
            return (
                <FormControlLabel
                    disabled control={<RedCheckbox/>}
                    checked
                />
            )
        } else if (task.important === "Warning"){
            return (
                <FormControlLabel
                    disabled control={<YellowCheckbox/>}
                    checked
                />
            )
        } else if (task.important === "Normal"){
            return (
                <FormControlLabel
                    disabled control={<GreenCheckbox/>}
                    checked
                />
            )
        } else {
            return (
                <FormControlLabel
                    disabled control={<GreyCheckbox/>}
                    checked
                />
            )
        }
    };

    return(
        levelTask(task)
    );
}

export default TaskLevel;