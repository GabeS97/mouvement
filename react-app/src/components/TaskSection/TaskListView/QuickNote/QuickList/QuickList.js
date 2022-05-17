import React, { useEffect } from 'react'
import { useState } from 'react'
import { useStore } from 'react-redux'
import { useSelector, useDispatch } from 'react-redux'
import { Route } from 'react-router-dom'
import { NavLink } from 'react-router-dom'
import { getBoardThunk } from '../../../../../store/boards'
import { deleteTaskThunk, editTaskThunk } from '../../../../../store/tasks'
import ToDoList from '../../ToDoList/ToDoList'
import './QuickList.css'
import SingleListEdit from './SingleListEdit/SingleListEdit'

const QuickList = ({ tasks, boardId }) => {
    const dispatch = useDispatch()
    const boards = Object.values(useSelector(state => state.boards))
    const board = boards.find(board => board.id === +boardId)
    const sessionUser = useSelector(state => state.session.user)
    const [currTask, setCurrTask] = useState()
    const [currTaskId, setCurrTaskId] = useState()



    const handleEdit = (e) => {
        e.preventDefault()
        let taskId = +e.currentTarget.id
        let task = tasks.find(task => task.id === taskId)
        let elementEdits = document.getElementById(`task-editables-${taskId}`)
        setCurrTask(elementEdits.innerText)
        setCurrTaskId(taskId)

        // elementEdits.setAttribute('contentEditable', 'true')
        elementEdits.focus()
    }

    const submitEdit = async (e) => {
        e.preventDefault()
        let elementEdits = document.querySelector(`#task-editables-${currTaskId}`)
        const edit_toDo = {
            id: currTaskId,
            user_id: sessionUser?.id,
            board_id: +boardId,
            tasks: elementEdits.innerText
            // tasks: elementEdits.innerText
        }
        await dispatch(editTaskThunk(+boardId, edit_toDo))
    }

    // useEffect(() => {
    //     dispatch(getBoardThunk())
    // }, [dispatch])



    return (
        <div className='quickList'>
            {tasks.map(task => (
                // <div className="quickList__checkBox" key={task.id} id={task.id} onClick={handleEdit}>
                //     <div className="quickList__checkbox__container">
                //         <div className="quickList__editable__content" contentEditable='true' id={`task-editables-${task.id}`} onBlur={submitEdit}  >
                //             {task.tasks}
                //         </div>
                //     </div>
                //     <div className="quickList__editAndDelete">
                //         <div className="quickList__options">
                //             <i className="fa-regular fa-pen-to-square quickList__edit" onClick={() => dispatch(editTaskThunk)} ></i>
                //             <i className="fa-solid fa-trash-can quickList__delete" onClick={() => dispatch(deleteTaskThunk(+boardId, task.id))}></i>
                //         </div>
                //     </div>
                // </div>
                <ToDoList task={task} boardId={boardId} key={task.id}/>
            ))}
        </div>
    )
}

export default QuickList
