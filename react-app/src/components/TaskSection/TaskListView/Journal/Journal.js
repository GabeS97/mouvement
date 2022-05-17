import React, { useState, useCallback } from 'react'
import './Journal.css'
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { Modal } from '../../../context/Modal';
import { deleteBoardThunk } from '../../../../store/boards';
import EditBoard from '../../EditBoard/EditBoard';
import { useEffect } from 'react';
import { getTasksThunk, deleteTaskThunk, editTaskThunk } from '../../../../store/tasks';
import AddTask from '../../AddTask/AddTask';
import ShowReflection from './ShowReflection/ShowReflection';
import ToDoList from '../ToDoList/ToDoList';

const Journal = ({ hideForm, boards, tasks, handleDelete }) => {
    const { boardId } = useParams()
    const board = boards.find(board => board.id === +boardId)
    const dispatch = useDispatch()
    const [showModal, setShowModal] = useState(false)
    const items = Object.values(useSelector(state => state.tasks))
    const sessionUser = useSelector(state => state.session.user)
    const [showField, setShowField] = useState(false)
    const [showReflection, setShowReflection] = useState(false)
    const [currTaskId, setCurrTaskId] = useState()
    const [currTask, setCurrTask] = useState()
    // const [innerText, setInnerText] = useState('')
    let editableElement = document.getElementById(`journal-task-editable-${currTaskId}`)


    useEffect(() => {
        dispatch(getTasksThunk(+boardId))
    }, [dispatch])

    const closeField = () => {
        setShowField(false)
    }


    const hanldeEdit = (e) => {
        e.preventDefault()
        let taskId = +e.currentTarget.id
        let editableElement = document.getElementById(`journal-task-editable-${taskId}`)
        // let task = tasks.find(task => task.id === taskId)

        editableElement.setAttribute('contentEditable', 'true')
        // setCurrTask(task.tasks)
        setCurrTask(editableElement.innerText)
        setCurrTaskId(taskId)

        // if (errors.length > 0) editableElement.setAttribute('contentEditable', 'false')
    }


    // let task;
    // useEffect(() => {
    //     window.addEventListener('keypress', e => {
    //         task = e.target.innerText
    //         setInnerText(task)
    //     })
    // }, [task])

    // useEffect(() => {
    //     let errorValidation = []
    //     if (!innerText.length) errorValidation.push('Edit must not be the same as the original input')
    //     if (innerText.length > 100) errorValidation.push('Edit entry must be less that 115 characters')
    //     if (!innerText) errorValidation.push('You may not leave this field empty')

    //     setErrors(errorValidation)
    // }, [innerText])
    // console.log('innerText: ', task, 'currTask:', currTask, '>>>>>>>>> errors', errors)


    // console.log(currTask)
    // const submitEdit = async (e) => {
    //     e.preventDefault()
    //     let editableElement = document.getElementById(`journal-task-editable-${currTaskId}`)

    //     const edit_journal = {
    //         id: currTaskId,
    //         user_id: sessionUser?.id,
    //         board_id: +boardId,
    //         tasks: editableElement.innerText
    //     }

    //     setCurrTask(editableElement.innerText)
    //     await dispatch(editTaskThunk(+boardId, edit_journal))
    //     editableElement.setAttribute('contentEditable', 'false')
    // }

    return (
        <div className='journal'>
            <div className="journal__contents">
                <div className="journal__headers">
                    <div className="journal__header__container">
                        <div className="journal__icon">
                            {board?.icon}
                            <h1 className='journal__title'>{board?.name}</h1>
                        </div>
                        <div className="journal__options">
                            <div className="journal__editAndDelete">
                                <div className="journal__edit" onClick={() => setShowModal(true)}>
                                    Edit
                                </div>
                                {showModal && (
                                    <Modal onClose={() => setShowModal(false)}>
                                        <EditBoard board={board} hideForm={hideForm} />
                                    </Modal>
                                )}
                                <div className="journal__delete" onClick={handleDelete}>
                                    Delete
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="journal__boardInfo">
                        <div className="journal__descs">
                            <h3 className='journal__description'>{board?.description}</h3>
                        </div>
                        <div className="quickList__instructions" style={{ paddingTop: '5px' }}>
                            <h5>Please click on journal entry to make an edit</h5>
                            <h5>Click on "+New" or "Daily Reflection" to make a new entry</h5>
                            <h5>Hover over the fields  to dispaly edit and delete option</h5>
                        </div>
                    </div>
                </div>
                <div className="journal__dailyReflection">
                    <div className="journal__newEntry" onClick={() => setShowField(!showField)}>
                        💬 Daily Reflection
                    </div>

                    {items.map(thought => (
                        <div className="journal__singleThought">
                            <ToDoList thought={thought} boardId={boardId} />
                        </div>
                        // <div className='journal__thinks' key={thought.id} id={thought.id} onClick={hanldeEdit}>
                        //     <div className="journal__errors">
                        //         {errors.map(err => (
                        //             <div>{err}</div>
                        //         ))}
                        //     </div>
                        //     <div className='journal__thoughts' id={`journal-task-editable-${thought.id}`} contentEditable='false' suppressContentEditableWarning='true' onBlur={submitEdit}>
                        //         {thought.tasks}</div>

                        //     <div className="journal__optionsButtons">
                        //         <div className="journal__moreOptions">
                        //             <i className="fa-regular fa-pen-to-square quickList__edit" onClick={submitEdit}></i>
                        //             <i className="fa-regular fa-trash-can journal__trash" onClick={() => dispatch(deleteTaskThunk(+boardId, thought.id))}></i>
                        //         </div>
                        //     </div>
                        // </div>
                    ))}
                    <div className="journal__newThought" onClick={() => setShowField(!showField)}>
                        <i className="fa-solid fa-plus"></i>
                        New
                    </div>
                    {showField && <AddTask closeField={closeField} boardId={boardId} />}
                </div>

            </div>
        </div>
    )
}

export default Journal
