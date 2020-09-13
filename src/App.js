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

    const onCalendarChange = (date) => {
        setSelectedDate(date);
    };
    const displayedTodos = tasks.filter(task => formatDate(task.date) === formatDate(selectedDate));

    return (
        <>
            <AppHeader/>

            <InputTask error={error}
                       tasks={tasks}
                       selectedDate={selectedDate}
                       setError={setError}
                       setTasks={setTasks}
                       displayedTodos={displayedTodos}
            />

            <SelectDate selectedDate={selectedDate}
                        onCalendarChange={onCalendarChange}
                        tasks={tasks}
            />

            <TaskList
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
