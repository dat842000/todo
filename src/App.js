import React from 'react';
import './App.css';
import 'react-calendar/dist/Calendar.css';
import AppFooter from "./components/AppFooter";
import AppHeader from "./components/AppHeader";
import InputTask from "./components/InputTask";
import TaskList from "./components/TaskList";
import SelectDate from "./components/SelectDate";
import {useDispatch, useSelector} from "react-redux";
import {
    getDisplayedTasks,
    getError,
    getSearchText,
    getSelectedDate,
    getTasks,
    todoActions
} from "./reducers/todoReducer";
import LoginDialog from "./components/LoginDialog";

function App() {
    const tasks = useSelector(getTasks);
    const selectedDate = useSelector(getSelectedDate);
    const searchText = useSelector(getSearchText);
    const displayedTasks = useSelector(getDisplayedTasks);
    const error = useSelector(getError);
    const dispatch = useDispatch();

    const setError = newError => {
        dispatch({
            type: todoActions.setError,
            payload: newError
        })
    };

    const handelSearch = (event) => {
        dispatch({
            type: todoActions.setSearchText,
            payload: event.target.value
        })
    };

    const setSelectedDate = date => {
        dispatch({
            type: todoActions.setSelectedDate,
            payload: date
        })
    };
    const onCalendarChange = (date) => {
        setSelectedDate(date);
    };

    const handleBackToNow = () => {
        const date = new Date();
        setSelectedDate(date);
    };

    return (
        <>
            <AppHeader handelSearch={handelSearch}
                       search={searchText}
            />

            <InputTask error={error}
                       selectedDate={selectedDate}
                       setError={setError}
                       displayedTodos={displayedTasks}
            />

            <div style={{display: "flex", flexDirection: "row"}}>
                <div style={{flex: 1}}>
                    {displayedTasks.length > 0 &&
                    <TaskList
                        setSelectedDate={setSelectedDate}
                        selectedDate={selectedDate}
                        displayedTodos={displayedTasks}
                    />}

                </div>
                <div style={{flex: 1}}>
                    <SelectDate selectedDate={selectedDate}
                                onCalendarChange={onCalendarChange}
                                handleBackToNow={handleBackToNow}
                                tasks={tasks}
                    />
                </div>
            </div>
            <AppFooter/>
            <LoginDialog/>
        </>
    );
}

export default App;
