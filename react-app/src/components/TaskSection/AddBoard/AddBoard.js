import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { addBoardThunk, getBoardThunk } from '../../../store/boards'
import './AddBoard.css'
const AddBoard = () => {
    const dispatch = useDispatch()
    const history = useHistory()
    const sessionUser = useSelector(state => state.session.user)
    const [currName, setCurrName] = useState('')
    const [currDesc, setCurrDesc] = useState('')
    const [currSelect, setCurrSelect] = useState('Quick Note')
    const [currIcon, setCurrIcon] = useState('🧢')
    const boards = Object.values(useSelector(state => state.boards))
    let newBoard = boards[boards.length - 1]


    console.log(newBoard);
    useEffect(() => {
        dispatch(getBoardThunk())
    }, [dispatch])

    const handleSumbit = async (e) => {
        e.preventDefault()

        const add_board = {
            user_id: sessionUser?.id,
            name: currName,
            template: currSelect,
            description: currDesc,
            icon: currIcon
        }

        await dispatch(addBoardThunk(add_board))
        alert('Congratulations! You have just created a new board!')
        history.push(`/home/boards/${newBoard.id}/${newBoard?.name.split(' ').join('_').toLowerCase()}`)

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
        <div className='addBoard'>
            <form className='addBoard__form' onSubmit={handleSumbit}>
                <div className="addBoard__boardName">
                    <input
                        className='addBoard__name'
                        placeholder='Untitled'
                        value={currName}
                        onChange={handleName}
                    />
                </div>

                <div className="addBoard__descriptiom">
                    <input
                        className='addBoard__boardDescription'
                        placeholder='Add a description'
                        value={currDesc}
                        onChange={handleDesc}
                    />
                </div>

                <div className="addBoard__custom__select">
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
                <button type='submit' className='addBoard__button'>Post new board</button>
            </form>
        </div>
    )
}

export default AddBoard
