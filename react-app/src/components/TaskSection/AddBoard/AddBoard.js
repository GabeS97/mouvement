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

            </form>
        </div>
    )
}

export default AddBoard
