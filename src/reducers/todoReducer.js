import formatDate from "../utils/formatDate";

const initialState = {
    tasks: [],
    error: null,
    selectedDate: null,
    loading: false,
    searchText: ""
};

// Selector
export const getTasks = state => state.tasks;
export const getError = state => state.error;

export const getUnfinishedTasks = state => {
    return state.tasks.filter(task => !task.done)
};

export const getFinishedTasks = state => {
    return state.tasks.filter(task => task.done)
};

export const getSelectedDate = state => state.selectedDate;

export const getSearchText = state => state.searchText;

export const getDisplayedTasks = state => {
    return state.tasks.filter(task => {
        const searchIsEmpty = state.searchText.length === 0;
        return formatDate(task.date) === formatDate(state.selectedDate)
        && searchIsEmpty ? true : state.searchText === task.description
    });
};

/**
 * action = object (type, payload)
 * @param state
 * @param action
 */
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

        case "SET_SEARCH_TEXT":
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