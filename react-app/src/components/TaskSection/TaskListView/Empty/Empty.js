import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory, useParams } from 'react-router-dom'
import { Modal } from '../../../../context/Modal'
import { editBoardThunk } from '../../../../store/boards'
import './Empty.css'

const Empty = ({ boards, tasks, handleDelete }) => {
    const { boardId } = useParams()
    const board = boards.find(board => board?.id === +boardId)
    const { user_id, template, name, description, icon } = board
    const sessionUser = useSelector(state => state.session.user)
    const [currName, setCurrName] = useState(name ? name : 'Untitled')
    const [currDesc, setCurrDesc] = useState(description ? description : '')
    const [currSelect, setCurrSelect] = useState(template ? template : 'Empty')
    const [currIcon, setCurrIcon] = useState(icon ? icon : '📗')
    const [showModal, setShowModal] = useState(false)
    const [errors, setErrors] = useState([])
    const [showEmoji, setShowEmoji] = useState(false)
    const history = useHistory()
    const dispatch = useDispatch()


    const handleEdit = async (e) => {
        e.preventDefault()

        const edit_board = {
            id: +boardId,
            user_id: sessionUser?.id,
            name: currName,
            template: currSelect,
            description: currDesc,
            icon: currIcon
        }

        await dispatch(editBoardThunk(edit_board))
        history.push(`/home/boards/${+boardId}/${currName.split(' ').join('_').toLowerCase()}`)
    }

    return (
        <div className='default__empty'>
            <div className="default__header">
                <div className="default__top">
                    <div className="default__icon">
                        <div className="default__addIcon">
                            <i className="fa-solid fa-face-smile add__icon"></i>
                            <div className="default__addAIcon">
                                Add icon
                            </div>
                        </div>

                        <div className="default__addCover">
                            <i className="fa-regular fa-image"></i>
                            <div className="default__addACover">
                                Add Cover
                            </div>
                        </div>
                    </div>
                    <div className="default__addBoard__title">

                        <input
                            onBlur={handleEdit}
                            className="default__title"
                            value={currName}
                            placeholder='Untitled'
                            onChange={(e) => setCurrName(e.target.value)}
                        >
                        </input>
                    </div>
                    <div className="default__description">
                        <h5>Hover over the title to make "+" visible, in order to add a database, or click <strong onClick={() => setShowModal(true)}>template</strong> to access one of
                        our pre-made templates</h5>
                    </div>
                </div>

                {showModal && (
                    <Modal onClose={() => setShowModal(false)}>
                        hey
                    </Modal>
                )}

                {/* <div className="default__body">
                    <h5>TEMPLATE</h5>
                    <div className="default__templates">
                        <div className="default__quicknote">
                            <i class="fa-solid fa-note-sticky"></i>
                            <h5>Quick Note</h5>
                        </div>
                        <div className="default__readinglist">
                            <i class="fa-solid fa-book-open"></i>
                            <h5>Reading List</h5>
                        </div>
                        <div className="default__journal">
                            <i class="fa-solid fa-book"></i>
                            <h5>Journal</h5>
                        </div>
                    </div>
                </div> */}
            </div>
        </div>
    )
}

export default Empty
