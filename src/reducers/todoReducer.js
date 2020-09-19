import formatDate from "../utils/formatDate";
import {createSelector, createSlice} from "@reduxjs/toolkit";


const initialState = {
    tasks: [],
    error: null,
    selectedDate: null,
    loading: false,
    searchText: ""
};

// Selector => DRY
export const getTodo = state => state.todo;

export const getTasks = createSelector(getTodo,
    todo => todo.tasks);
export const getError = createSelector(getTodo,
    todo => todo.error);
export const getSelectedDate = createSelector(getTodo,
    todo => todo.selectedDate);
export const getSearchText = createSelector(getTodo,
    todo => todo.searchText);

// export const getUnfinishedTasks_OLD = state => {
//     return state.tasks.filter(task => !task.done)
// };

// memorized selector
// lan goi 1: tasks = [1,2,3] => [1,2] (calculate)
// lan goi 2: tasks = [1,2,3] => [1,2] (no calculation required, from cache)
// lan goi 3: tasks = [1,2,3,4] => [1,2,3] (calculate)
export const getUnfinishedTasks = createSelector(
    getTasks,
    tasks => tasks.filter(task => !task.done)
);

// Syntax:
// export const getUnfinishedTasks = createSelector(
//     select1,
//     select2,
//     select3,
//     (result1, result2, result3) => {
//         return ....
//     }
// );

export const getFinishedTasks = createSelector(
    getTasks,
    tasks => tasks.filter(task => task.done)
);

// export const getDisplayedTasks = state => {
//     return state.tasks.filter(task => {
//         const searchIsEmpty = state.searchText.length === 0;
//         return formatDate(task.date) === formatDate(state.selectedDate)
//         && searchIsEmpty ? true : state.searchText === task.description
//     });
// };

export const getDisplayedTasks = createSelector(
    getTasks,
    getSearchText,
    getSelectedDate,
    (tasks, searchText, selectedDate) => {
        return tasks.filter(task => {
            const searchIsEmpty = searchText.length === 0;
            return formatDate(task.date) === formatDate(selectedDate)
            && searchIsEmpty ? true : searchText === task.description
        });
    }
);


/**
 * action = object (type, payload)
 * @param state
 * @param action
 */

const todoSlice = createSlice({
    name: "todoSlice",
    initialState: initialState,
    reducers: {
        /**
         * @function TodoActions~addTask
         */
        addTask: (state, action) => {
            state.tasks = [
                action.payload,
                ...state.tasks
            ];
        },

        /**
         * @function TodoActions~removeTask
         */
        removeTask: (state, action) => {
            const taskRemove = action.payload;
            state.tasks = state.tasks.filter(task => taskRemove.id !== task.id);
        },

        /**
         * @function TodoActions~clearTasks
         */
        clearTasks: (state, action) => {
            state.tasks = [];
        },

        /**
         * @function TodoActions~setTasks
         */
        setTasks: (state, action) => {
            state.tasks = action.payload;
        },

        /**
         * @function TodoActions~setTaskStatus
         */
        setTaskStatus: (state, action) => {
            const taskToChange = action.payload.taskToChange;
            const newTaskStatus = action.payload.newTaskStatus;

            const newTaskList = state.tasks.map((task) => {
                if (task.id === taskToChange.id) {
                    return {
                        ...task,
                        done: newTaskStatus,
                    }
                } else {
                    return task;
                }
            });

            state.tasks = newTaskList;
        },

        /**
         * @function TodoActions~setTaskPriority
         */
        setTaskPriority: (state, action) => {

        },

        /**
         * @function TodoActions~setSelectedDate
         */
        setSelectedDate: (state, action) => {
            state.selectedDate = action.payload;
        },

        /**
         * @function TodoActions~setSearchText
         */
        setSearchText: (state, action) => {
            state.searchText = action.payload;
        },

        /**
         * @function TodoActions~setError
         */
        setError: (state, action) => {
            state.error = action.payload;
        },
    }
});

export const todoReducer = todoSlice.reducer;
/**
 * @type {TodoActions}
 */
export const todoActions = todoSlice.actions;
/*
export function todoReducer(state = initialState, action) {

    switch (action.type) {
        case "ADD_TASK":
            return {
                ...state,

                //override
                tasks: [
                    action.payload,
                    ...state.tasks
                ]
            };

        case "REMOVE_TASK":
            const taskRemove = action.payload;
            return {
                ...state,
                tasks: state.tasks.filter(task => taskRemove.id !== task.id)
            };

        case "CLEAR_TASKS":
            return {
                ...state,
                tasks: []
            };

        case "SET_TASKS":
            return {
                ...state,
                tasks: action.payload
            };

        case "SET_TASK_STATUS":
            const taskToChange = action.payload.taskToChange;
            const newTaskStatus = action.payload.newTaskStatus;

            const newTaskList = state.tasks.map((task) => {
                if (task.id === taskToChange.id) {
                    return {
                        ...task,
                        done: newTaskStatus,
                    }
                } else {
                    return task;
                }
            });

            return {
                ...state,
                tasks: newTaskList
            };

        case "SET_TASK_PRIORITY":
            return {};

        case "SET_SELECTED_DATE":
            return {
                ...state,
                selectedDate: action.payload
            };

        case SET_SEARCH_TEXT:
            return {
                ...state,
                searchText: action.payload
            };

        case "SET_ERROR":
            return {
                ...state,
                error: action.payload
            };

        default:
            return state;
    }

}
 */