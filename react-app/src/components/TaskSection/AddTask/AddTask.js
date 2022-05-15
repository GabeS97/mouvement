import React, { useState } from 'react'
import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { addTaskThunk } from '../../../store/tasks'
import './AddTask.css'

const AddTask = ({ boardId, closeField }) => {
    const sessionUser = useSelector(state => state.session.user)
    const [currTask, setCurrTasks] = useState('')
    const [currMedia, setCurrMedia] = useState('')
    const [currAuthor, setCurrAuthor] = useState(sessionUser?.username)
    const [currHeader, setCurrHeader] = useState('Books')
    const [errors, setErrors] = useState([])
    const dispatch = useDispatch()
    const handleCurrTask = (e) => setCurrTasks(e.target.value)

    useEffect(() => {
        let validationErrors = []
        if (!currTask) validationErrors.push('You are required to enter an input before you submit a new entry. ')
        // if (!currMedia) validationErrors.push('You are required to enter an input before you submit a new entry. ')

        setErrors(validationErrors)
    }, [currTask, currMedia])

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
                {errors.map(error => (
                    <li key={error}>{error} </li>
                ))}
                <label htmlFor='quickNote__new__task'>
                    <input
                        className='quickNote__add__task'
                        placeholder='Enter your new task...'
                        value={currTask}
                        onChange={handleCurrTask}
                    />
                </label>
                <button type='submit' disabled={errors.length}>Submit</button>
            </form>
        </div>
    )
}

export default AddTask
