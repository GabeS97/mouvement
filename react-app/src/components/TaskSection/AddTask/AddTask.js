import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { addTaskThunk } from '../../../store/tasks'
import './AddTask.css'

const AddTask = ({ boardId, closeField }) => {
    const sessionUser = useSelector(state => state.session.user)
    const [currTask, setCurrTasks] = useState('')
    const [currMedia, setCurrMedia] = useState('')
    const [currAuthor, setCurrAuthor] = useState(sessionUser?.username)
    const [currHeader, setCurrHeader] = useState('Books')
    const dispatch = useDispatch()
    const handleCurrTask = (e) => setCurrTasks(e.target.value)

    const handleSubmit = async (e) => {
        e.preventDefault()

        const create_tasks = {
            user_id: sessionUser?.id,
            board_id: +boardId,
            tasks: currTask,
            // media: currMedia,
            // author: currAuthor,
            // header: currHeader,
        }
        await dispatch(addTaskThunk(+boardId, create_tasks))
        setCurrTasks('')
        closeField()
    }


    return (
        <div className='addTask'>
            <form onSubmit={handleSubmit}>
                <label htmlFor='quickNote__new__task'>
                    <input
                        className='quickNote__add__task'
                        placeholder='Enter your new task...'
                        value={currTask}
                        onChange={handleCurrTask}
                    />
                </label>
                <button type='submit'>Submit</button>
            </form>
        </div>
    )
}

export default AddTask
