import React, {useState} from 'react';
import {format} from "date-fns";
import useInterval from "../hooks/useInterval";
import Typography from "@material-ui/core/Typography";
import makeStyles from "@material-ui/core/styles/makeStyles";

function formatTime(t) {
    return format(t, "dd.MM.yyyy HH:mm");
}

const useStyles = makeStyles((theme) => {
    return {
        clock: {
            color: theme.palette.warning.dark
        }
    }
});

function Clock() {
    const classes = useStyles();
    const [ctime, setCtime] = useState(new Date());

    useInterval(() => {
        setCtime(new Date());
    }, 6000);
    return (
        <>
            <Typography variant={"body2"} component={"span"} className={classes.clock}>
                {formatTime(ctime)}
            </Typography>
        </>
    );
}

export default Clock;