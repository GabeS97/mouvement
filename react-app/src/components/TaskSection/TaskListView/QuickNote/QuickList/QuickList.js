import React, { useEffect } from 'react'
import { useState } from 'react'
import { useStore } from 'react-redux'
import { useSelector, useDispatch } from 'react-redux'
import { Route } from 'react-router-dom'
import { NavLink } from 'react-router-dom'
import { getBoardThunk } from '../../../../../store/boards'
import { deleteTaskThunk } from '../../../../../store/tasks'
import './QuickList.css'
import SingleListEdit from './SingleListEdit/SingleListEdit'

const QuickList = ({ tasks, boardId }) => {
    const dispatch = useDispatch()
    const boards = Object.values(useSelector(state => state.boards))
    const board = boards.find(board => board.id === +boardId)
    const sessionUser = useSelector(state => state.session.user)
    const [currTask, setCurrTask] = useState({})
    const [currTaskId, setCurrTaskId] = useState()

    const handleEdit = (e) => {
        e.preventDefault()
        let taskId = +e.currentTarget.id
        let task = tasks.find(task => task.id === taskId)
        setCurrTask(task)
        setCurrTaskId(taskId)

        // const edit_toDo = {
        //     id: taskId,
        //     user_id: sessionUser?.id,
        //     board_id: +boardId,
        //     tasks: task.tasks
        // }

        // let elementEdits = document.getElementById(`task-editables-${taskId}`)
        // elementEdits.contentEditable = 'true'
    }

    const submitEdit = (e) => {
        e.preventDefault()

        const edit_toDo = {
            id: currTaskId,
            user_id: sessionUser?.id,
            board_id: +boardId,
            tasks: currTask.tasks
        }
        console.log(edit_toDo)
    }

    useEffect(() => {
        dispatch(getBoardThunk())
    }, [dispatch])


    console.log(currTask, 'this is the currTask component for QuickList')
    console.log(currTaskId, 'this is the currTaskId component for QuickList')
    return (
        <div className='quickList'>
            {tasks.map(task => (
                <div className="quickList__checkBox" key={task.id} id={task.id} onClick={handleEdit}>
                    <div className="quickList__checkbox__container">
                        {/* <label htmlFor='checkbox' className='boxContainer'> */}
                            {/* <input type='checkbox' /> */}
                            <div className="test" id={`task-editables-${task.id}`}>
                                {task.tasks}
                            </div>
                            {}
                            {/* <div className="test_submit" onClick={submitEdit}>
                                Submit
                            </div> */}
                            {/* <span className='quickList__checked'></span> */}
                        {/* </label> */}
                    </div>
                    <i className="fa-solid fa-trash-can quickList__delete" onClick={() => dispatch(deleteTaskThunk(+boardId, task.id))}></i>
                </div>
                // <NavLink to={`/home/boards/${+boardId}/${board?.name.split(' ').join('_').toLowerCase()}/tasks/${task.id}`} >
                //     <SingleListEdit boardId={boardId} task={task} key={task} />
                // </NavLink>
            ))}
            {/* <Route path='/home/boards/:boardId/tasks/:taskId'>
                <SingleListEdit />
            </Route> */}
        </div>
    )
}

export default QuickList
