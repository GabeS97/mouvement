import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min'
import { useParams } from 'react-router-dom/cjs/react-router-dom.min'
import { editBoardThunk } from '../../../store/boards'

const EditBoard = ({ board, hideForm }) => {
    const { boardId } = useParams()
    const { user_id, template, name, description, icon } = board
    const dispatch = useDispatch()
    const sessionUser = useSelector(state => state.session.user)
    const [currName, setCurrName] = useState(name ? name : '')
    const [currDesc, setCurrDesc] = useState(description ? description : '')
    const [currSelect, setCurrSelect] = useState(template ? template : 'Quick Note')
    const [currIcon, setCurrIcon] = useState(icon ? icon : '📗')
    const history = useHistory()


    const handleEdit = async (e) => {
        e.preventDefault()

        const add_board = {
            id: +boardId,
            user_id: sessionUser?.id,
            name: currName,
            template: currSelect,
            description: currDesc,
            icon: currIcon
        }

        await dispatch(editBoardThunk(add_board))
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
            <form className='editBoard__form' onSubmit={handleEdit}>
                <div className="editBoard__viewIcon">
                    {currIcon}
                </div>
                <div className="editBoard__icon">
                    <input value={currIcon} onChange={(e) => setCurrIcon(e.target.value)} />
                </div>
                <div className="editBoard__boardName">
                    <input
                        className='editBoard__name'
                        placeholder='Untitled'
                        value={currName}
                        onChange={handleName}
                    />
                </div>

                <div className="editBoard__descriptiom">
                    <input
                        className='editBoard__boardDescription'
                        placeholder='Add a description'
                        value={currDesc}
                        onChange={handleDesc}
                    />
                </div>

                <div className="editBoard__custom__select">
                    <select value={currSelect} onChange={handleSelect}>
                        {/* <option disabled>Templates</option> */}
                        <option disabled>Select Template</option>
                        <option value='Quick Note'>Quick Note</option>
                        {/* <option value='Task List'>Task List</option> */}
                        <option value='Reading List'>Reading List</option>
                        <option value='Journal'>Journal</option>
                        {/* <option value='Personal Home'>Personal Home</option> */}
                    </select>
                </div>
                <button type='submit'>Edit board</button>
            </form>
        </div>
    )
}

export default EditBoard
