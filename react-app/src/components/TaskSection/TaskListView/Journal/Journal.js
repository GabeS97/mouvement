import React from 'react'
import './Journal.css'
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { Modal } from '../../../context/Modal';
import { deleteBoardThunk } from '../../../../store/boards';
import EditBoard from '../../EditBoard/EditBoard';

const Journal = ({ hideForm, boards }) => {
    const { boardId } = useParams()
    const board = boards.find(board => board.id === +boardId)
    const dispatch = useDispatch()
    const [showModal, setShowModal] = useState(false)

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

            </div>
        </div>
    )
}

export default Journal
