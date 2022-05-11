import React from 'react'
import './AddBoard.css'
const AddBoard = () => {
    return (
        <div className='addBoard'>
            <form className='addBoard__form'>
                <div className="addBoard__boardName">
                    <input className='addBoard__name'
                        placeholder='Untitled'
                    />
                </div>

                <div className="addBoard__descriptiom">
                    <input className='addBoard__boardDescription'
                        placeholder='Add a description'
                    />
                </div>

                <div className="addBoard__custom__select">
                    <select>
                        <option disabled>Templates</option>
                        <option>Quick Note</option>
                        <option>Task List</option>
                        <option>Reading List</option>
                        <option>Journal</option>
                        <option>Personal Home</option>
                    </select>
                </div>
            </form>
        </div>
    )
}

export default AddBoard
