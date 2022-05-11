import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { editBoardThunk } from '../../../store/boards'

const EditBoard = () => {
    const dispatch = useDispatch()
    const sessionUser = useSelector(state => state.session.user)
    const [currName, setCurrName] = useState('')
    const [currDesc, setCurrDesc] = useState('')
    const [currSelect, setCurrSelect] = useState('Quick Note')
    const [currIcon, setCurrIcon] = useState('📗')
    const handleSumbit = async (e) => {
        e.preventDefault()

        const add_board = {
            user_id: sessionUser?.id,
            name: currName,
            template: currSelect,
            description: currDesc,
            icon: currIcon
        }

        await dispatch(editBoardThunk(add_board))
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
        <div className='editBoard'>
            <form className='editBoard__form' onSubmit={handleSumbit}>
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
                        <option value='Task List'>Task List</option>
                        <option value='Reading List '>Reading List</option>
                        <option value='Journal'>Journal</option>
                        <option value='Personal Home'>Personal Home</option>
                    </select>
                </div>
                <button type='submit'>Post new board</button>
            </form>
        </div>
    )
}

export default EditBoard
