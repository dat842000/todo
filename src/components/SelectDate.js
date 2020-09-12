import React from 'react';
import Calendar from "react-calendar";
import formatDate from "../utils/formatDate";

function SelectDate({selectedDate, onCalendarChange, tasks}) {

    const howManyTodosOnDate = date => {
        return tasks.filter(task => formatDate(task.date) === formatDate(date)).length
    };

    return (
        <div>
            <div>
                The selected date is : {new Intl.DateTimeFormat('en', {
                weekday: "long",
                year: 'numeric',
                month: "numeric",
                day: "numeric"
            }).format(selectedDate)}
            </div>
            <Calendar
                onChange={onCalendarChange}
                value={selectedDate}
                tileContent={({activeStartDate, date, view}) => {
                    const counter = howManyTodosOnDate(date);
                    if (counter > 0) {
                        return ` (${counter})`;
                    }
                }}
            />
        </div>
    );
}

export default SelectDate;