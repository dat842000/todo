import React, {useState} from 'react';
import './App.css';
import 'react-calendar/dist/Calendar.css';
import AppFooter from "./components/AppFooter";
import AppHeader from "./components/AppHeader";
import InputTask from "./components/InputTask";
import TaskList from "./components/TaskList";
import SelectDate from "./components/SelectDate";
import formatDate from "./utils/formatDate";

function App() {
    const [tasks, setTasks] = useState([]);
    const [error, setError] = useState();
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [search, setSearch] = useState("");

    // nut search chua hay

    const handelSearch = (event) => {
        const input = event.target.value;
        setSearch(input);
    };

    const onCalendarChange = (date) => {
        setSelectedDate(date);
    };
    const displayedTodos = tasks.filter(task => {
        const searchIsEmpty = search === null || search === undefined || search.length === 0;
        return formatDate(task.date) === formatDate(selectedDate) && searchIsEmpty ? true : search === task.description
    });

    const handleBackToNow = () => {
        const date = new Date();
        setSelectedDate(date);
    };

    return (
        <>
            <AppHeader handelSearch={handelSearch}
                       search={search}
            />

            <InputTask error={error}
                       tasks={tasks}
                       selectedDate={selectedDate}
                       setError={setError}
                       setTasks={setTasks}
                       displayedTodos={displayedTodos}
            />

            <div style={{display: "flex", flexDirection: "row"}}>
                <div style={{flex: 1}}>
                    <TaskList
                        setSelectedDate={setSelectedDate}
                        selectedDate={selectedDate}
                        displayedTodos={displayedTodos}
                        tasks={tasks}
                        setTasks={setTasks}
                    />
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
        </>
    );
}

export default App;
