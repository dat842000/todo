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
    const [search,setSearch] = useState("");

    // nut search chua hay

    const handelSearch = (event) =>{
        const input = event.target.value;
        setSearch(input);
        setSelectedDate(null);
    }

    const onCalendarChange = (date) => {
        setSelectedDate(date);
        setSearch("");
    };
    const displayedTodos = tasks.filter(task => formatDate(task.date) === formatDate(selectedDate) || search === task.description );

    const handleBackToNow = () => {
        const date = new Date();
        setSelectedDate(date);
        setSearch("");
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

            <SelectDate selectedDate={selectedDate}
                        onCalendarChange={onCalendarChange}
                        handleBackToNow={handleBackToNow}
                        tasks={tasks}
            />

            <TaskList
                setSelectedDate={setSelectedDate}
                selectedDate={selectedDate}
                displayedTodos={displayedTodos}
                tasks={tasks}
                setTasks={setTasks}
            />

            <AppFooter/>
        </>
    );
}

export default App;
