import React from 'react';
import formatDate from "../utils/formatDate";
import TaskCounter from "./TaskCounter";
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import {makeStyles, withStyles} from '@material-ui/core/styles';
import TaskStatus from "./TaskStatus";
import TaskRemover from "./TaskRemover";
import TaskRender from "./TaskRender";
import TaskLevel from  "./TaskLevel";
import TablePagination from "@material-ui/core/TablePagination";

function TaskList({
                      selectedDate,
                      displayedTodos,
                      tasks,
                      setTasks
                  }) {

    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);

    const StyledTableCell = withStyles((theme) => ({
        head: {
            backgroundColor: theme.palette.common.black,
            color: theme.palette.common.white,
        },
        body: {
            fontSize: 14,
        },
    }))(TableCell);

    const StyledTableRow = withStyles((theme) => ({
        root: {
            '&:nth-of-type(odd)': {
                backgroundColor: theme.palette.action.hover,
            },
        },
    }))(TableRow);

    const onTaskRemove = (taskRemove) => {
        const newTaskList = tasks.filter(task => taskRemove.id !== task.id);
        setTasks(newTaskList);
    };

    const onStatusChange = (event, taskToChange) => {
        // bai tap 2
        const newTaskList = tasks.map((task) => {
            if (task.id === taskToChange.id) {
                return {
                    ...task,
                    done: event.target.checked,
                }
            } else {
                return task;
            }
        });
        setTasks(newTaskList);
    };
    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };
    const useStyles = makeStyles({
        table: {
            minWidth: 700,
        },
    });

    // Bai tap 1: Thay Task List bang <Table> cua material-ui

    const classes = useStyles();
    return (
        <>
            <div style={{display: 'flex', margin: '15px'}}>
                <div style={{marginRight: '35px'}}>
                    <div style={{marginBottom :"20px"}}>
                    <strong>Task of date {formatDate(selectedDate)}</strong>
                    </div>
                    <TableContainer component={Paper}>
                        <Table className={classes.table} aria-label="customized table">
                            <TableHead>
                                <StyledTableRow>
                                    <StyledTableCell>Task</StyledTableCell>
                                    <StyledTableCell align="right">Important</StyledTableCell>
                                    <StyledTableCell align="right">Date Create</StyledTableCell>
                                    <StyledTableCell align="right">Check</StyledTableCell>
                                    <StyledTableCell align="right">Delete</StyledTableCell>
                                </StyledTableRow>
                            </TableHead>
                            <TableBody>
                                {displayedTodos
                                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((task, index) => (
                                    <StyledTableRow key={index}>
                                        <StyledTableCell component="th" scope="row">
                                            <TaskRender task={task}/>
                                        </StyledTableCell>
                                        <StyledTableCell align={"right"}>
                                            <TaskLevel task={task}/>
                                        </StyledTableCell>
                                        <StyledTableCell align={"right"}>
                                            <strong>{formatDate(task.date)}</strong>
                                        </StyledTableCell>
                                        <StyledTableCell align="right">
                                            <TaskStatus task={task} onStatusChange={onStatusChange}/>
                                        </StyledTableCell>
                                        <StyledTableCell align="right">
                                            <TaskRemover task={task} onTaskRemove={onTaskRemove}/>
                                        </StyledTableCell>
                                    </StyledTableRow>
                                ))}
                            </TableBody>
                        </Table>
                        <TablePagination
                            rowsPerPageOptions={[5, 10, 25]}
                            component="div"
                            count={displayedTodos.length}
                            rowsPerPage={rowsPerPage}
                            page={page}
                            onChangePage={handleChangePage}
                            onChangeRowsPerPage={handleChangeRowsPerPage}
                        />
                    </TableContainer>



                </div>

            </div>
            <hr/>
            <TaskCounter tasks={tasks}/>
        </>
    );

}

export default TaskList;



