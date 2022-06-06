import React from 'react'
import './PersonalHome.css'
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { deleteBoardThunk } from '../../../../store/boards';
import EditBoard from '../../EditBoard/EditBoard';
import { Modal } from '../../../../context/Modal';

const PersonalHome = ({ boards, hideForm }) => {
    const { boardId } = useParams()
    const board = boards.find(board => board.id === +boardId)
    const dispatch = useDispatch()
    const [showModal, setShowModal] = useState(false)

    return (
        <div className='personalHome'>
            <div className="personalHome__contents">
                <div className="personalHome__headers">
                    <div className="personalHome__icon">
                        {board?.icon}
                    </div>

                    <div className="personalHome__boardInfo">
                        <div className="personalHome__descs">
                            <div className="personalHome__options">
                                <h1 className='personalHome__title'>{board?.name}</h1>
                                <div className="personalHome__editAndDelete">
                                    <div className="personalHome__edit" onClick={() => setShowModal(true)}>
                                        Edit
                                    </div>

                                    {showModal && (
                                        <Modal onClose={() => setShowModal(false)}>
                                            <EditBoard board={board} hideForm={hideForm} />
                                        </Modal>
                                    )}
                                    <div className="personalHome__delete" onClick={() => dispatch(deleteBoardThunk(+boardId))}>
                                        Delete
                                    </div>
                                </div>
                            </div>
                            <h3 className='personalHome__description'>{board?.description}</h3>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    )
}

export default PersonalHome
