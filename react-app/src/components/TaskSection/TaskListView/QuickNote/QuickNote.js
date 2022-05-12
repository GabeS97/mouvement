import React from 'react'
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { deleteBoardThunk } from '../../../../store/boards';
import { Modal } from '../../../context/Modal';
import AddTask from '../../AddTask/AddTask';
import EditBoard from '../../EditBoard/EditBoard';
import QuickList from './QuickList/QuickList';
import './QuickNote.css'

const QuickNote = ({ boards, hideForm, tasks }) => {
    const { boardId } = useParams()
    const board = boards.find(board => board.id === +boardId)
    const dispatch = useDispatch()
    const [showModal, setShowModal] = useState(false)
    const [showField, setShowField] = useState(false)

    const closeField = () => {
        setShowField(false)
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
                                <h1 className='quickNote__title'>{board?.name}</h1>
                                <div className="quickNote__editAndDelete">
                                    <div className="quickNote__edit" onClick={() => setShowModal(true)}>
                                        Edit
                                    </div>

                                    {showModal && (
                                        <Modal onClose={() => setShowModal(false)}>
                                            <EditBoard board={board} hideForm={hideForm} />
                                        </Modal>
                                    )}
                                    <div className="quickNote__delete" onClick={() => dispatch(deleteBoardThunk(+boardId))}>
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
                    <p>They found Mary, as usual, deep in the study of thorough-bass and human nature; and had some extracts to admire, and some new observations of threadbare morality to listen to. Catherine and Lydia had information for them of a different sort. CHANGE LATER TO SEEDER VALUE</p>
                </div>

                <div className="quickNote__list">
                    <>
                        <div className="quickNote__list__header">
                            <h2>Make a to-do-list</h2>
                            <i class="fa-solid fa-plus quickNote__list__addItem" onClick={() => setShowField(true)}></i>
                        </div>
                        {showField && (
                            <AddTask boardId={boardId} closeField={closeField} />
                        )}
                    </>
                    <QuickList tasks={tasks} />
                </div>
            </div>
        </div>
    )
}

export default QuickNote
