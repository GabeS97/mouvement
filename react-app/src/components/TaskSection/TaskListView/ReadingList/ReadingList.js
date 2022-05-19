import React from 'react'
import './ReadingList.css'
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { Modal } from '../../../context/Modal';
import { deleteBoardThunk } from '../../../../store/boards';
import EditBoard from '../../EditBoard/EditBoard';
import AddReadingList from './AddReadingList/AddReadingList';
import { deleteTaskThunk, editTaskThunk } from '../../../../store/tasks';
import EditReadingList from './AddReadingList/EditReadingList/EditReadingList';
import { Route } from 'react-router-dom';


const ReadingList = ({ boards, tasks, handleDelete }) => {
    const { boardId } = useParams()
    const board = boards.find(board => board?.id === +boardId)
    const sessionUser = useSelector(state => state.session.user)
    const dispatch = useDispatch()
    const [showModal, setShowModal] = useState(false)
    const [mediaModal, setMediaModal] = useState(false)
    const [taskModal, setTaskModal] = useState(false)
    const [currTask, setCurrTask] = useState()
    const [currTaskId, setCurrTaskId] = useState()

    // console.log(tasks,'<<<<<<<<<<<<<<<<<<<')

    const closeTask = () => {
        setTaskModal(false)
    }

    const hideForm = () => {
        setShowModal(false)
    }

    const hideMedia = () => {
        setMediaModal(false)
    }

    const handleEdit = (e) => {
        e.preventDefault()

        let taskId = +e.currentTarget.id
        let task = tasks.find(task => task.id === taskId)
        setCurrTaskId(taskId)
        setCurrTask(task)
    }

    // const submitEdit = async (e) => {
    //     e.preventDefault()
    //     let editCategory = document.getElementById(`readingList-category-edit-${currTaskId}`).innerText.split(':')
    //     let category = editCategory[editCategory.length - 1]


    //     let readInfo = document.getElementById(`readingList-tasks-edit-${currTaskId}`).innerText.split('By:')
    //     let bookAuthor = readInfo[readInfo.length - 1]
    //     let book = readInfo[0]

    //     const edit_readingList = {
    //         id: +e.currentTarget.id,
    //         user_id: sessionUser?.id,
    //         boardId: +boardId,
    //         tasks: book,
    //         media: category,
    //         author: bookAuthor,
    //     }
    //     await dispatch(editTaskThunk(+boardId, edit_readingList))
    // }

    return (
        <div className='readingList'>
            <div className="readingList__contents">
                <div className="readingList__headers">
                    <div className="readingList__header__container">
                        <div className="readingList__icon">
                            {board?.icon}
                            <h1 className='readingList__title'>{board?.name}</h1>
                        </div>

                        <div className="readingList__options">
                            <div className="readingList__editAndDelete">
                                <div className="readingList__edit" onClick={() => setShowModal(true)}>
                                    Edit
                                </div>

                                {showModal && (
                                    <Modal onClose={() => setShowModal(false)}>
                                        <EditBoard board={board} hideForm={hideForm} />
                                    </Modal>
                                )}
                                <div className="readingList__delete" onClick={handleDelete}>
                                    Delete
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="readingList__boardInfo">
                        <div className="readingList__descs">

                            <div className="readingList__descriptionContainer">
                                <h3 className='readingList__description'>{board?.description}</h3>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="readingList__notes">
                    <div className="readingList__addIcon">
                        <h1>What are you reading?</h1>
                        <i className="fa-solid fa-plus fa-lg readingList__plus" style={{ paddingLeft: '5px' }} onClick={() => setMediaModal(true)}></i>
                    </div>
                    {mediaModal &&
                        <Modal onClose={() => setMediaModal(false)}>
                            <AddReadingList boardId={boardId} hideMedia={hideMedia} />
                        </Modal>
                    }
                    {tasks?.map(task => (
                        <div className="readingList__medias" id={task?.id} key={task.id} >
                            <div className="readingList__reads" onClick={() => setTaskModal(true)} >
                                <li style={{ listStyle: 'none' }} id={task?.id}>
                                    <h5 id={`readingList-category-edit-${task?.id}`} >
                                        {`Category: ${task?.media}`}
                                    </h5>
                                    <h4 id={`readingList-tasks-edit-${task?.id}`}>
                                        {`${task?.tasks} By: ${task?.author}`}
                                    </h4>
                                </li>
                            </div>

                            <div className="readingList__buttons">
                                <div className="readingList__iconButtons">
                                    <i className="fa-regular fa-pen-to-square quickList__edit" onClick={() => setTaskModal(true)}></i>
                                    <i className="fa-solid fa-trash-can quickList__delete" onClick={() => dispatch(deleteTaskThunk(+boardId, task?.id))}></i>
                                </div>
                            </div>


                            {taskModal && (
                                <Modal onClose={() => setTaskModal(false)}>
                                    <EditReadingList task={task} boardId={boardId} closeTask={closeTask} taskId={task?.id} />
                                </Modal>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default ReadingList
