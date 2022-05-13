import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom'
import { getTasksThunk } from '../../../../store/tasks'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import './TaskList.css'

const TaskList = ({ boards, hideForm, tasks }) => {
    const [task, setTask] = useState(tasks)
    const { boardId } = useParams()
    const dispatch = useDispatch()
    const board = boards.find(board => board.id === +boardId)
    const [showModal, setShowModal] = useState(false)
    // const items = document.querySelectorAll('.taskList__item')
    // const columns = document.querySelectorAll('.taskList__column')

    // const tasks = Object.values(useSelector(state => state.tasks))
    const handleOnDragEnd = (result) => {
        if (!result.destination) return;
        const items = Array.from(task);
        const [reorderItem] = items.splice(result.source.index, 1);
        items.splice(result.destination.index, 0, reorderItem)

        setTask(items)
    }

    useEffect(() => {
        dispatch(getTasksThunk(+boardId))
    }, [dispatch])


    return (
        <div className="taskList" style={{ display: 'flex', justifyContent: 'center', height: '100%'}}>
            <DragDropContext onDragEnd={result => console.log(result)}>


            </DragDropContext>
        </div>
    )
}

export default TaskList
