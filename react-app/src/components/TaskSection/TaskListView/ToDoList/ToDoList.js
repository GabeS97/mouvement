import React, { useState } from 'react'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { deleteTaskThunk, editTaskThunk, getOneTaskThunk, getTasksThunk } from '../../../../store/tasks'
import './ToDoList.css'
const ToDoList = ({ task, boardId }) => {
    const dispatch = useDispatch()
    const sessionUser = useSelector(state => state.session.user)
    const [currTask, setCurrTask] = useState(task?.tasks ? task?.tasks : '')
    const [stateVar, setStateVar] = useState(task?.tasks ? task?.tasks : '')
    const [currTaskId, setCurrTaskId] = useState(task?.id ? task?.id : null)
    const [errors, setErrors] = useState([])
    let editableElement = document.getElementById(`journal-task-editable`)
    console.log(editableElement)

    const submitEdit = async (e) => {
        e.preventDefault()

        const edit_journal = {
            id: currTaskId,
            user_id: sessionUser?.id,
            board_id: +boardId,
            tasks: currTask
        }

        if (edit_journal.tasks.length > 0 && edit_journal.tasks.length < 100) {
            await dispatch(editTaskThunk(+boardId, edit_journal))
        } else {
            // await dispatch(getOneTaskThunk(+boardId, task))
            // await dispatch(editTaskThunk(+boardId, task))
            setCurrTask(task.tasks)
        }
    }


    useEffect(() => {
        let errorValidations = []
        let task = document.getElementById('journal-task-editable')
        if (currTask.length >= 100) { errorValidations.push('Your entry must not exceed 100 characters, if you proceed to submit, input will revert to most recent change') }
        if (currTask.length <= 0) { errorValidations.push(`If a value is not inputed, we will revert to your most recent change upon submit.`) }

        setErrors(errorValidations)
    }, [currTask])


    return (
        <div className="journal__list">
            {errors.map(error => (
                <div className="journal__error" key={error} style={{ paddingLeft: '5px' }}>
                    {error}
                </div>
            ))}
            <div className='journal__thinks' key={task.id} id={task.id} >
                <input style={{ border: 'none', outline: 'none' }} type='text' className='journal__thoughts' id={`journal-task-editable`} value={currTask} onChange={(e) => setCurrTask(e.target.value)} maxLength='100' onBlur={submitEdit} placeholder={`If a value is not inputed, we will revert to your most recent change: ${task?.tasks}`} />
                <div className="journal__optionsButtons">
                    <div className="journal__moreOptions">
                        {/* <i className="fa-regular fa-pen-to-square quickList__edit" onClick={submitEdit}></i> */}
                        <i className="fa-regular fa-trash-can journal__trash" onClick={() => dispatch(deleteTaskThunk(+boardId, task?.id))}></i>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ToDoList
