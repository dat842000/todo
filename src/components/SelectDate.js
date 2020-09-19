import React from 'react';
import Calendar from "react-calendar";
import formatDate from "../utils/formatDate";
import Button from "@material-ui/core/Button";

function SelectDate({selectedDate, onCalendarChange, tasks, handleBackToNow}) {

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
                <Button onClick={handleBackToNow}
                        variant="contained"
                        color="secondary"
                        size={"small"}
                        style={{margin: "15px"}}
                >Back to now</Button>
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