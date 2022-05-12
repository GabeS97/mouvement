import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { deleteTaskThunk } from '../../../../../store/tasks'
import './QuickList.css'

const QuickList = ({ tasks, boardId }) => {
    const dispatch = useDispatch()

    return (
        <div className='quickList'>
            {tasks.map(task => (
                <div className="quickList__checkBox" key={task.id}>
                    <label htmlFor='checkbox' className='boxContainer'>
                        <input type='checkbox' />
                        {task.tasks}
                        {/* <span className='quickList__checked'></span> */}
                    </label>
                    <i className="fa-solid fa-trash-can quickList__delete" onClick={() => dispatch(deleteTaskThunk(+boardId, task.id))}></i>
                </div>
            ))}
        </div>
    )
}

export default QuickList
