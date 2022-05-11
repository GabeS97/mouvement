const GET_BOARDS = 'boards/GET_BOARDS'
const ADD_BOARD = 'boards/ADD_BOARD'
const EDIT_BOARD = 'boards/EDIT_BOARD'
const DELETE_BOARD = 'boards/DELETE_BOARD'

const getBoardsActionCreator = (boards) => ({ type: GET_BOARDS, boards })
const addBoardActionCreator = (board) => ({ type: ADD_BOARD, board })
const editBoardActionCreator = (board) => ({ type: EDIT_BOARD, board })
const deleteBoardActionCreator = (board) => ({ type: DELETE_BOARD, board })

export const getBoardThunk = () => async dispatch => {
    const response = await fetch('/api/boards')
    if (response.ok) {
        const boards = await response.json()
        dispatch(getBoardsActionCreator(boards))
        return response
    }
}

export const editBoardThunk = (board) => async dispatch => {
    const response = await fetch(`/api/boards/${board.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(board)
    })
    if (response.ok) {
        const board = await response.json()
        dispatch(editBoardActionCreator(board))
        return board
    }
}

export const addBoardThunk = (board) => async dispatch => {
    console.log(board, 'this is the payload that is passed into through the AddBoard component, this is the thunk');
    const response = await fetch(`/api/boards/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(board)
    })
    if (response.ok) {
        const board = await response.json()
        dispatch(addBoardActionCreator(board))
        return board
    }
}

export const deleteBoardThunk = (board_id) => async dispatch => {
    const response = await fetch(`/api/boards/${board_id}`, {
        method: 'DELETE'
    })
    if (response.ok) {
        const board = await response.json()
        dispatch(deleteBoardActionCreator(board))
        return board
    }
}

const boardsReducer = (state = {}, action) => {
    let newState;
    switch (action.type) {
        case GET_BOARDS: {
            newState = { ...state }
            action.boards.forEach(board => newState[board.id] = board)
            return newState
        }
        case ADD_BOARD: {
            newState = { ...state }
            newState[action.board.id] = action.board
            return newState
        }
        case DELETE_BOARD: {
            newState = { ...state }
            delete newState[action.board.id]
            return newState
        }
        case EDIT_BOARD: {
            newState = { ...state }
            newState[action.board.id] = action.board
            return newState
        }
        default:
            return state
    }
}


export default boardsReducer
