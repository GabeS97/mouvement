import React from 'react'
import { useParams } from 'react-router-dom'
import './TaskList.css'
const TaskList = ({ boards }) => {
    const { boardId } = useParams()
    const board = boards.find(board => board.id === +boardId)
    return (
        <div className="taskList">
            <div className="taskList__contents">
                <div className="taskList__headers">
                    <div className="taskList__icon">
                        {board?.icon}
                    </div>

                    <div className="taskList__descs">
                        <h1 className='taskList__title'>{board?.name}</h1>
                        <h3 className='taskList__description'>{board?.description}</h3>
                    </div>
                </div>

                <table className="taskList__table">
                </table>
            </div>
        </div>
    )
}

export default TaskList
