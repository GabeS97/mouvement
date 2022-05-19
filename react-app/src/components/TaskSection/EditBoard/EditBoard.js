import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min'
import { useParams } from 'react-router-dom/cjs/react-router-dom.min'
import { editBoardThunk } from '../../../store/boards'
import './EditBoard.css'
const EditBoard = ({ board, hideForm }) => {
    const { boardId } = useParams()
    const { user_id, template, name, description, icon } = board
    const dispatch = useDispatch()
    const sessionUser = useSelector(state => state.session.user)
    const [currName, setCurrName] = useState(name ? name : '')
    const [currDesc, setCurrDesc] = useState(description ? description : '')
    const [currSelect, setCurrSelect] = useState(template ? template : 'Quick Note')
    const [currIcon, setCurrIcon] = useState(icon ? icon : '📗')
    const [errors, setErrors] = useState([])
    const [showEmoji, setShowEmoji] = useState(false)
    const history = useHistory()


    let emojis = ['🏆', '🥇', '🥈', '🥉', '🏅', '🎖', '🐶', '🐱', '🐭', '🐹', '🐰', '🦊', '🐻', '🐼', '🐻‍❄️', '🐨', '🐯', '🦁', '🐮', '🐷', '🐽', '🐸', '🐵', '🙈', '🙉', '🙊', '🐒', '🐔', '🐧', '🐦', '🐤', '🐣', '🐥', '🦆', '🦅', '🦉', '🦇', '🐺', '🐗', '🐴', '🦄', '🐝', '🪱', '🐛', '🦋', '🐌', '🐞', '🐜', '🪰', '🪲', '🪳', '🦟', '🦗', '🕷', '🕸', '🦂', '🐢', '🐍', '🦎', '🦖', '🦕', '🐙', '🦑', '🦐', '🦞', '🦀', '🐡', '🐠', '🐟', '🐬', '🐳', '🐋', '🦈', '🐊', '🐅', '🐆', '🦓', '🦍', '🦧', '🦣', '🐘', '🦛', '🦏', '🐪', '🐫', '🦒', '🦘', '🦬', '🐃', '🐂', '🐄', '🐎', '🐖', '🐏', '🐑', '🦙', '🐐', '🦌', '🐕', '🐩', '🦮', '🐕‍🦺', '🐈 ', '🐈‍⬛', '📄', '📑', '🧾', '📊', '📈', '📉', '🗒', '🗓', '📆', '📅', '🗑', '📇', '🗃', '🗳', '🗄', '📋', '📁', '📂', '🗂', '🗞', '📰', '📓', '📔', '📒', '📕', '📗', '📘', '📙', '📚', '📖', '🔖', '🧷', '🔗', '📎', '🖇', '📐', '📏', '🧮', '📌', '📍', '✂️', '🖊', '🖋', '✒️', '🖌', '🖍', '📝', '✏️', '🔍', '🔎', '🔏', '🔐', '🔒', '🔓',]

    const changeIcon = (e) => {
        let emojiId = +e.currentTarget.id
        let emoji = document.getElementById(emojiId).innerText

        setCurrIcon(emoji)
        setShowEmoji(false)
    }

    useEffect(() => {
        let validationErrors = []
        if (currName.includes('?') || currName.includes('!') || currName.includes('<') || currName.includes('>')) validationErrors.push('The use of special characters are not permited')
        if (currName.length <= 5) validationErrors.push('Please re-enter a board title that is longer than 5 characters.');
        if (currName.length >= 30) validationErrors.push('Please re-enter a board title that is shorter than 30 characters.');
        if (!currName) validationErrors.push('In order to submit this field, a title is required.');
        else {
            setErrors([])
        }

        setErrors(validationErrors)
    }, [currName])


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
        hideForm()
    }
    const handleName = (e) => {
        setCurrName(e.target.value)
    }

    const handleDesc = (e) => {
        setCurrDesc(e.target.value)
    }

    const handleSelect = (e) => {
        setCurrSelect(e.target.value)
    }
    return (
        <div className='editBoard' >
            <div className="editBoard__viewIcon">
                <div className="icon">
                    {currIcon}
                </div>
                <div className="name">
                    {currName}
                </div>
            </div>
            <form className='editBoard__form' onSubmit={handleEdit}>
                <div className="addBoard__errors">
                    {errors.map(error => (
                        <li key={error}>{error}</li>
                    ))}
                </div>
                <div className="editBoard__icons">
                    <div className="editBoard__icon">
                        <label>Icon:
                            <div value={currIcon} className='editIcon__emoji' style={{ cursor: 'pointer', border: 'none', outline: 'none' }} onClick={() => setShowEmoji(!showEmoji)}>{currIcon}</div>
                        </label>
                    </div>
                    <>
                        {showEmoji &&
                            <div className="editBoard__emoji__dropdown">
                                {emojis.map((emoji, idx) => (
                                    <div className='editBoard__emoji' key={idx} id={idx} onClick={changeIcon} >
                                        {emoji}</div>
                                ))}
                            </div>
                        }
                    </>
                </div>
                <div className="editBoard__boardName">
                    <label>Title:
                        <input
                            className='editBoard__name'
                            placeholder='Untitled'
                            value={currName}
                            onChange={handleName}
                        />
                    </label>
                </div>

                <div className="editBoard__descriptiom">
                    <label>Description:
                        <input
                            className='editBoard__boardDescription'
                            placeholder='Add a description'
                            value={currDesc}
                            onChange={handleDesc}
                        />
                    </label>
                </div>

                <div className="editBoard__custom__select">
                    {/* <label>Select: */}
                    <select value={currSelect} onChange={handleSelect}>
                        {/* <option disabled>Templates</option> */}
                        <option disabled>Select Template</option>
                        <option value='Quick Note'>Quick Note</option>
                        {/* <option value='Task List'>Task List</option> */}
                        <option value='Reading List'>Reading List</option>
                        <option value='Journal'>Journal</option>
                        {/* <option value='Personal Home'>Personal Home</option> */}
                    </select>
                    {/* </label> */}
                </div>
                <button type='submit' style={{ cursor: 'pointer' }} className='editBoard__submit' disabled={errors.length > 0}>Edit board</button>
            </form>
        </div>
    )
}

export default EditBoard
