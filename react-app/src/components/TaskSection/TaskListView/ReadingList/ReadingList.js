import React from 'react'
import './ReadingList.css'
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { Modal } from '../../../context/Modal';
import { deleteBoardThunk } from '../../../../store/boards';
import EditBoard from '../../EditBoard/EditBoard';
import AddReadingList from './AddReadingList/AddReadingList';


const ReadingList = ({ hideForm, boards, tasks }) => {
    const { boardId } = useParams()
    const board = boards.find(board => board.id === +boardId)
    const dispatch = useDispatch()
    const [showModal, setShowModal] = useState(false)
    const [mediaModal, setMediaModal] = useState(false)

    
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
                                <div className="readingList__delete" onClick={() => dispatch(deleteBoardThunk(+boardId))}>
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
                        <h1>Media</h1>
                        <i class="fa-solid fa-plus fa-lg readingList__plus" style={{ paddingLeft: '5px' }} onClick={() => setMediaModal(true)}></i>
                    </div>
                    {mediaModal &&
                        <Modal onClose={() => setMediaModal(false)}>
                            <AddReadingList boardId={boardId} />
                        </Modal>
                    }
                    {tasks.map(task => (
                        <div className="readingList__medias" >
                            <li>
                                <h5>
                                    {`Category: ${task.media}`}
                                </h5>
                                <h4>
                                    {`${task.tasks} By: ${task.author}`}
                                </h4>
                            </li>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default ReadingList
