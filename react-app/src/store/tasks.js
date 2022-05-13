const GET_TASKS = 'tasks/GET_TASKS'
const ADD_TASK = 'tasks/ADD_TASK'
const EDIT_TASK = 'tasks/EDIT_TASK'
const DELETE_TASK = 'tasks/DELETE_TASK'

const getTasksActionCreator = (tasks) => ({ type: GET_TASKS, tasks })
const addTasksActionCreator = (task) => ({ type: ADD_TASK, task })
const editTaskActionCreator = (task) => ({ type: EDIT_TASK, task })
const deleteTaskActionCreator = (task) => ({ type: DELETE_TASK, task })

export const getTasksThunk = (board_id) => async dispatch => {
    const response = await fetch(`/api/tasks/boards/${board_id}/`)

    if (response.ok) {
        const tasks = await response.json()
        dispatch(getTasksActionCreator(tasks))
        return tasks
    }
}

export const addTaskThunk = (board_id, task) => async dispatch => {
    console.log('thunk response >>>>>>>>>>>>>>', board_id, task);

    const response = await fetch(`/api/tasks/boards/${board_id}/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(task)
    })
    if (response.ok) {
        const task = await response.json()
        dispatch(addTasksActionCreator(task))
        return task
    }
}

export const editTaskThunk = (board_id, task) => async dispatch => {
    const response = await fetch(`/api/tasks/boards/${board_id}/${task.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(task)
    })
    if (response.ok) {
        const task = await response.json()
        dispatch(editTaskActionCreator(task))
        return task
    }
}

export const deleteTaskThunk = (board_id, task_id) => async dispatch => {
    const response = await fetch(`/api/tasks/boards/${board_id}/${task_id}/`, {
        method: 'DELETE',
        body: JSON.stringify({ task_id })
    })
    if (response.ok) {
        const task = await response.json()
        dispatch(deleteTaskActionCreator(task))
        return task
    }
}

const tasksReducer = (state = {}, action) => {
    let newState;
    switch (action.type) {
        case GET_TASKS: {
            newState = {}
            action.tasks.forEach(task => newState[task.id] = task)
            return newState
        }
        case ADD_TASK: {
            newState = { ...state }
            newState[action.task.id] = action.task
            return newState
        }
        case EDIT_TASK: {
            newState = { ...state }
            newState[action.task.id] = action.task
            return newState
        }
        case DELETE_TASK: {
            newState = { ...state }
            delete newState[action.task.id]
            return newState
        }
        default:
            return state
    }
}

export default tasksReducer
