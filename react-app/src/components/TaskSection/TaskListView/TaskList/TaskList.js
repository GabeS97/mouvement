import React from 'react'
import { useParams } from 'react-router-dom'
import './TaskList.css'
const TaskList = ({ boards }) => {
    const { boardId } = useParams()
    const board = boards.find(board => board.id === +boardId)

    const items = document.querySelectorAll('.taskList__item')
    const columns = document.querySelectorAll('.taskList__column')

    console.log(items)
    items.forEach(item => {
        item.addEventListener('dragstart', dragStart)
        item.addEventListener('dragend', dragEnd)
    })
    let dragItem = null

    function dragStart() {
        dragItem = this;
        setTimeout(() => this.className = 'invisible', 0)
    }
    function dragEnd() {
        this.className = 'taskList__item'
        dragItem = null;
    }

    columns.forEach(column => {
        column.addEventListener('dragover', dragOver);
        column.addEventListener('drop', dragDrop);
    });

    function dragOver(e) {
        e.preventDefault()
    }

    function dragDrop() {
        this.append(dragItem)
    }
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

                <div className="taskList__container">
                    <div className="taskList__column">
                        <h1>To Do</h1>
                        <div className="taskList__item" draggable="true">Finish TaskList view</div>
                        <div className="taskList__item" draggable="true">Finish PUT frontend for Boards</div>
                        <div className="taskList__item" draggable="true">Fix remaining bugs on first feat</div>
                        <div className="taskList__item" draggable="true">Change to state value later</div>
                    </div>

                    <div className="taskList__column">
                        <h1>Doing</h1>
                    </div>

                    <div className="taskList__column">
                        <h1>Done</h1>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default TaskList
