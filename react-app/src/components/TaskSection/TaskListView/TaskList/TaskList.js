import React from 'react'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom'
import { deleteBoardThunk } from '../../../../store/boards'
import { Modal } from '../../../context/Modal'
import EditBoard from '../../EditBoard/EditBoard'
import './TaskList.css'
const TaskList = ({ boards, hideForm }) => {
    const { boardId } = useParams()
    const board = boards.find(board => board.id === +boardId)
    const [showModal, setShowModal] = useState(false)
    const dispatch = useDispatch()

    const items = document.querySelectorAll('.taskList__item')
    const columns = document.querySelectorAll('.taskList__column')

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

                    <div className="taskList__boardInfo">
                        <div className="taskList__descs">
                            <div className="taskList__options">
                                <h1 className='taskList__title'>{board?.name}</h1>
                                <div className="taskList__editAndDelete">
                                    <div className="taskList__edit" onClick={() => setShowModal(true)}>
                                        Edit
                                    </div>

                                    {showModal && (
                                        <Modal onClose={() => setShowModal(false)}>
                                            <EditBoard board={board} hideForm={hideForm} />
                                        </Modal>
                                    )}
                                    <div className="taskList__delete" onClick={() => dispatch(deleteBoardThunk(+boardId))}>
                                        Delete
                                    </div>
                                </div>
                            </div>
                            <h3 className='taskList__description'>{board?.description}</h3>
                        </div>
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
