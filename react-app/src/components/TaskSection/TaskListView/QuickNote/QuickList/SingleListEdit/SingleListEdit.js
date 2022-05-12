import React from 'react'
import { useDispatch } from 'react-redux'
import { deleteTaskThunk } from '../../../../../../store/tasks'

const SingleListEdit = ({ boardId, task}) => {
    const dispatch = useDispatch()

    return (
        <div className='singleListEdit'>
            <div className="quickList__checkBox" key={task.id}>
                <label htmlFor='checkbox' className='boxContainer'>
                    <input type='checkbox' />
                    {task.tasks}
                    {/* <span className='quickList__checked'></span> */}
                </label>
                <i className="fa-solid fa-trash-can quickList__delete" onClick={() => dispatch(deleteTaskThunk(+boardId, task.id))}></i>
            </div>
        </div>
    )
}

export default SingleListEdit
