import React, { useState } from 'react'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { deleteTaskThunk, editTaskThunk } from '../../../../store/tasks'
import './ToDoList.css'
const ToDoList = ({ thought, boardId }) => {
    const dispatch = useDispatch()
    const sessionUser = useSelector(state => state.session.user)
    const [currTask, setCurrTask] = useState(thought?.tasks ? thought?.tasks : '')
    const [currTaskId, setCurrTaskId] = useState(thought?.id ? thought?.id : null)
    const [errors, setErrors] = useState([])

    const submitEdit = async (e) => {
        e.preventDefault()
        // let editableElement = document.getElementById(`journal-task-editable-${currTaskId}`)

        const edit_journal = {
            id: currTaskId,
            user_id: sessionUser?.id,
            board_id: +boardId,
            tasks: currTask
        }
        // setCurrTask(editableElement.innerText)
        if (currTask) {
            await dispatch(editTaskThunk(+boardId, edit_journal))
        } else {
            alert('Please fix the failed fields before you continue')
        }
    }

    useEffect(() => {
        let errorValidations = []
        let task = document.getElementById('journal-task-editable')
        // if (currTask === currentTask) errorValidations.push('Your entry must differ from your original entry')
        if (currTask.length >= 115) {
            errorValidations.push('Your maynot exceed 115 characters')
        }
        if (currTask.length < 1) errorValidations.push('Your entry must consist of at least one character')
        setErrors(errorValidations)
    }, [currTask])


    return (
        <div className="journal__list">
            {errors.map(error => (
                <div className="journal__error" key={error}>
                    {error}
                </div>
            ))}
            <div className='journal__thinks' key={thought.id} id={thought.id} >
            <input style={{ border: 'none', outline: 'none' }} type='text' minLength='1' className='journal__thoughts' id={`journal-task-editable`} value={currTask} onChange={(e) => setCurrTask(e.target.value)} maxLength='115' onBlur={submitEdit} />
            <div className="journal__optionsButtons">
                <div className="journal__moreOptions">
                    <i className="fa-regular fa-pen-to-square quickList__edit" onClick={submitEdit}></i>
                    <i className="fa-regular fa-trash-can journal__trash" onClick={() => dispatch(deleteTaskThunk(+boardId, thought.id))}></i>
                </div>
            </div>
            </div>
        </div>
    )
}

export default ToDoList
