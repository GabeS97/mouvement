import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory, useParams } from 'react-router-dom'
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
        console.log(edit_board)
        history.push(`/home/boards/${+boardId}/${currName.split(' ').join('_').toLowerCase()}`)
        // hideForm()
    }

    return (
        <div className='default__empty'>
            <div className="default__header">
                <div className="default__top">
                    <div className="default__icon">
                        <div className="default__addIcon">
                            <i class="fa-solid fa-face-smile add__icon"></i>
                            <div className="default__addAIcon">
                                Add icon
                            </div>
                        </div>

                        <div className="default__addCover">
                            <i class="fa-regular fa-image"></i>
                            <div className="default__addACover">
                                Add Cover
                            </div>
                        </div>

                        <div className="default__addComment">
                            <i class="fa-regular fa-comment"></i>
                            <div className="default__addACommet">
                                Add Comment
                            </div>
                        </div>
                    </div>
                    <input
                        onBlur={handleEdit}
                        className="default__title"
                        value={currName}
                        placeholder='Untitled'
                        onChange={(e) => setCurrName(e.target.value)}
                    >
                    </input>
                </div>
            </div>
        </div>
    )
}

export default Empty
