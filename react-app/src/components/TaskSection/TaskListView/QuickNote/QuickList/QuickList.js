import React, { useEffect } from 'react'
import './QuickList.css'

const QuickList = ({ tasks }) => {

    return (
        <div className='quickList'>
            {tasks.map(task => (
                <div className="quickList__checkBox">
                    <label htmlFor='checkbox' className='boxContainer'>
                        <input type='checkbox' />
                        {task.tasks}
                        {/* <span className='quickList__checked'></span> */}
                    </label>
                </div>
            ))}
        </div>
    )
}

export default QuickList
