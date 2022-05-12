import React, { useEffect } from 'react'
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

    const handleEdit = (e) => {
        e.preventDefault()

        const edit_toDo = {
            user_id: sessionUser?.id,
            board_id: +boardId,

        }
        console.log(e.currentTarget.id)
    }

    useEffect(() => {
        dispatch(getBoardThunk())
    }, [dispatch])



    return (
        <div className='quickList'>
            {tasks.map(task => (
                <div className="quickList__checkBox" key={task.id} id={task.id}>
                    <label htmlFor='checkbox' className='boxContainer'>
                        <input type='checkbox' />
                        {task.tasks}
                        {/* <span className='quickList__checked'></span> */}
                    </label>    
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
