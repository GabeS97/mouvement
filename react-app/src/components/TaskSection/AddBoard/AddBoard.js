import React from 'react'
import { useState } from 'react'
import './AddBoard.css'
const AddBoard = () => {
    const [currName, setCurrName] = useState('')
    const [currDesc, setCurrDesc] = useState('')
    const [currSelect, setCurrSelect] = useState('quick note' )

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
            <form className='addBoard__form'>
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
                        value={handleDesc}
                        onChange={currDesc}
                    />
                </div>

                <div className="addBoard__custom__select">
                    <select value={currSelect} onChange={handleSelect}>
                        {/* <option disabled>Templates</option> */}
                        <option value='quick note'>Quick Note</option>
                        <option value='task list'>Task List</option>
                        <option value='reading list '>Reading List</option>
                        <option value='journal'>Journal</option>
                        <option value='personal home'>Personal Home</option>
                    </select>
                </div>
            </form>
        </div>
    )
}

export default AddBoard
