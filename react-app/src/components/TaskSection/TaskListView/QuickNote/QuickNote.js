import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { Modal } from '../../../../context/Modal';
import { deleteBoardThunk, getBoardThunk } from '../../../../store/boards';
import AddTask from '../../AddTask/AddTask';
import EditBoard from '../../EditBoard/EditBoard';
import QuickList from './QuickList/QuickList';
import './QuickNote.css'

const QuickNote = ({ boards, tasks, handleDelete }) => {
    const { boardId } = useParams()
    const board = boards.find(board => board.id === +boardId)
    const history = useHistory()
    const dispatch = useDispatch()
    const [showModal, setShowModal] = useState(false)
    const [showField, setShowField] = useState(false)



    const closeField = () => {
        setShowField(false)
    }

    const hideForm = () => {
        setShowModal(false)
    }

    return (
        <div className='quickNote'>
            <div className="quickNote__contents">
                <div className="quickNote__headers">
                    <div className="quickNote__icon">
                        {board?.icon}
                    </div>

                    <div className="quickNote__boardInfo">
                        <div className="quickNote__descs">
                            <div className="quickNote__options">
                                <div className="quickNote__header">
                                    {/* <div className="quickNote__icons">
                                        <div className="quickNote__addIcon">
                                            <i className="fa-solid fa-face-smile add__icon"></i>
                                            <div className="quickNote__addAIcon">
                                                Add icon
                                            </div>
                                        </div>

                                        <div className="quickNote__addCover">
                                            <i className="fa-regular fa-image"></i>
                                            <div className="quickNote__addACover">
                                                Add Cover
                                            </div>
                                        </div>
                                    </div> */}
                                    <h1 className='quickNote__title'>{board?.name}</h1>
                                </div>
                                <div className="quickNote__editAndDelete">
                                    <div className="quickNote__edit" onClick={() => setShowModal(true)}>
                                        Edit
                                    </div>

                                    {showModal && (
                                        <Modal onClose={() => setShowModal(false)}>
                                            <EditBoard board={board} hideForm={hideForm} />
                                        </Modal>
                                    )}
                                    <div className="quickNote__delete" onClick={handleDelete}>
                                        Delete
                                    </div>
                                </div>
                            </div>
                            <h3 className='quickNote__description'>{board?.description}</h3>
                        </div>

                    </div>
                </div>

                <div className="quickNote__notes">
                    <h2>Jot down some text</h2>
                    <p>Jot down your ideas below! Hover to the to-do-list, to display the options to edit and delete. To make an edit, click on the text to make an inline text, and click off from the text item to commit the changes, or you can click on the pen to paper icon.</p>
                </div>

                <div className="quickNote__list">
                    <>
                        <div className="quickNote__list__header">
                            <div className="quickList__toDo">
                                <h2 style={{ display: 'flex', }}>Make a to-do-list
                                    <div className="quickNote__addList">
                                        <i className="fa-solid fa-plus quickNote__list__addItem" onClick={() => setShowField(!showField)} style={{ paddingLeft: '5px' }}></i>
                                    </div>

                                </h2>
                                <div className="quickList__instructions">
                                    <h5>Hover over your Make a to-do-list or over journal to display + to make a new entry</h5>
                                    <h5>Please click on journal entry to make an edit</h5>
                                    <h5>The changes you made will be applied once you click off the input field</h5>
                                    <h5>Hover over the fields to dispaly a delete option</h5>
                                </div>
                            </div>
                        </div>
                        {showField && (
                            <AddTask boardId={boardId} closeField={closeField} />
                        )}
                    </>
                    {/* <div className="quickList__list"> */}
                    <QuickList tasks={tasks} boardId={boardId} />
                    {/* </div> */}
                </div>
            </div>
        </div>
    )
}

export default QuickNote
