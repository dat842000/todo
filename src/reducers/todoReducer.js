const initialState = {
  tasks: []
}

export default function todoReducer(state = initialState, action) {

  switch (action.type) {
    case "SET_TASKS":
      return {
        ...state,
        tasks: action.payload
      }

    case "ADD_TASK":
      return {
        ...state,
        tasks: [
          ...state.tasks,
          action.payload
        ]
      }

    default:
      return state;
  }

}
