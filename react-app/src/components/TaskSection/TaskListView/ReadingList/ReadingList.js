import React from 'react'
import './ReadingList.css'
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { deleteBoardThunk } from '../../../../store/boards';
import EditBoard from '../../EditBoard/EditBoard';
import AddReadingList from './AddReadingList/AddReadingList';
import { deleteTaskThunk, editTaskThunk } from '../../../../store/tasks';
import { Route } from 'react-router-dom';
import EditReadingList from './EditReadingList/EditReadingList';
import ReadingListModal from './ReadingListModal/ReadingListModal';
import { Modal } from '../../../../context/Modal';


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
                        <ReadingListModal task={task} closeTask={closeTask} boardId={boardId} key={task.id} />
                    ))}
                </div>
            </div>
        </div>
    )
}

export default ReadingList
