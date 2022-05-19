import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { addBoardThunk, getBoardThunk } from '../../../store/boards'
import UsersList from '../../UsersList'
import './AddBoard.css'
const AddBoard = () => {
    const dispatch = useDispatch()
    const history = useHistory()
    const sessionUser = useSelector(state => state.session.user)
    const [currName, setCurrName] = useState('')
    const [currDesc, setCurrDesc] = useState('')
    const [currSelect, setCurrSelect] = useState('Quick Note')
    const [errors, setErrors] = useState([])
    const [currIcon, setCurrIcon] = useState('🧢')
    const boards = Object.values(useSelector(state => state.boards))
    let newBoard = boards[boards.length - 1]

    useEffect(() => {
        let validationErrors = []
        if (currName.includes('?') || currName.includes('!') || currName.includes('<') || currName.includes('>')) validationErrors.push('The use of special characters are not permited')
        if (currName.length <= 5) validationErrors.push('Please re-enter a board titila that is longer than 5 characters.');
        if (currName.length >= 30) validationErrors.push('Please re-enter a board title that is shorter than 30 characters.');
        if (!currName) validationErrors.push('In order to submit this field, a title is required.');
        else {
            setErrors([])
        }

        setErrors(validationErrors)
    }, [currName])


    console.log(errors)
    console.log(newBoard);
    useEffect(() => {
        dispatch(getBoardThunk(sessionUser?.id))
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

        const board = await dispatch(addBoardThunk(add_board))
        console.log(board);
        if (board.errors) {
            setErrors(board.errors)
        } else {
            alert('Congratulations! You have just created a new board!')
            if (newBoard?.id) {
                history.push(`/home/boards/${newBoard?.id}/${newBoard?.name.split(' ').join('_').toLowerCase()}`)
            } else {
                history.push('/')
            }
        }

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
                <div className="addBoard__errors">
                    {errors.map(error => (
                        <li key={error}>{error}</li>
                    ))}
                </div>
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
                        {/* <option value='Reading List'>Reading List</option> */}
                        <option value='Journal'>Journal</option>
                        {/* <option value='Personal Home'>Personal Home</option> */}
                    </select>
                </div>
                <button type='submit' className='addBoard__button' disabled={errors.length > 0}>Post new board</button>
            </form>
        </div>
    )
}

export default AddBoard
