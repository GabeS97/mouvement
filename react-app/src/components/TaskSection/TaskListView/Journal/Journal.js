import React from 'react'
import './Journal.css'
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { Modal } from '../../../context/Modal';
import { deleteBoardThunk } from '../../../../store/boards';
import EditBoard from '../../EditBoard/EditBoard';
import { useEffect } from 'react';
import { getTasksThunk,deleteTaskThunk } from '../../../../store/tasks';
import AddTask from '../../AddTask/AddTask';
import ShowReflection from './ShowReflection/ShowReflection';

const Journal = ({ hideForm, boards }) => {
    const { boardId } = useParams()
    const board = boards.find(board => board.id === +boardId)
    const dispatch = useDispatch()
    const [showModal, setShowModal] = useState(false)
    const items = Object.values(useSelector(state => state.tasks))
    const [showField, setShowField] = useState(false)
    const [showReflection, setShowReflection] = useState(false)
    useEffect(() => {
        dispatch(getTasksThunk(+boardId))
    }, [dispatch])

    const closeField = () => {
        setShowField(false)
    }

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
                                <div className="journal__delete" onClick={() => dispatch(deleteBoardThunk(+boardId))}>
                                    Delete
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="journal__boardInfo">
                        <div className="journal__descs">
                            <h3 className='journal__description'>{board?.description}</h3>
                        </div>
                    </div>
                </div>
                <div className="journal__dailyReflection">
                    <div className="journal__newEntry" onClick={() => setShowReflection(true)}>
                        💬 Daily Reflection
                    </div>

                    {showReflection && (
                        <Modal onClose={() => setShowReflection(false)}>
                            <ShowReflection />
                        </Modal>
                    )}
                    {items.map(thought => (
                        <div className='journal__thinks'>
                            <div className='journal__thoughts'>{thought.tasks}
                            </div>
                            <i class="fa-regular fa-trash-can journal__trash" onClick={() => dispatch(deleteTaskThunk(+boardId, thought.id))}></i>
                        </div>
                    ))}
                    <div className="journal__newThought" onClick={() => setShowField(!showField)}>
                        <i class="fa-solid fa-plus"></i>
                        New
                    </div>
                    {showField && <AddTask closeField={closeField} boardId={boardId} />}
                </div>

            </div>
        </div>
    )
}

export default Journal
