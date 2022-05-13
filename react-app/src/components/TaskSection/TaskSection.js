import React, { useEffect } from 'react'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams, useLocation } from 'react-router-dom'
import { getBoardThunk, getOneBoardThunk } from '../../store/boards'
import { getTasksThunk } from '../../store/tasks'
import BoardSection from '../BoardSection/BoardSection'
import Journal from './TaskListView/Journal/Journal'
import PersonalHome from './TaskListView/PersonalHome/PersonalHome'
import QuickNote from './TaskListView/QuickNote/QuickNote'
import ReadingList from './TaskListView/ReadingList/ReadingList'
import TaskList from './TaskListView/TaskList/TaskList'

const TaskSection = () => {
    const { boardId } = useParams()
    const path = useLocation()
    const dispatch = useDispatch()
    const pathname = path.pathname.split('/')
    const name = pathname[pathname.length - 1].split('_').join(' ')
    const boards = Object.values(useSelector(state => state.boards))
    const board = Object.values(useSelector(state => state.boards))
    const oneBoard = boards.find(board => board.name.toLowerCase() === name)
    const tasks = Object.values(useSelector(state => state.tasks))


    useEffect(() => {
        dispatch(getTasksThunk(+boardId))
    }, [dispatch])

    useEffect(() => {
        dispatch(getOneBoardThunk(+boardId))
    }, [dispatch])

    const [showModal, setShowModal] = useState(false)
    let template;
    if (oneBoard?.template) {
        template = oneBoard?.template.toLowerCase()
    }

    const hideForm = () => {
        setShowModal(false)
    }

    useEffect(() => {
        dispatch(getBoardThunk())
    }, [dispatch])


    if (template === 'quick note') {
        return <QuickNote boards={boards} hideForm={hideForm} tasks={tasks} />
    } else if (template === 'task list') {
        return <TaskList boards={boards} hideForm={hideForm} tasks={tasks} />
    } else if (template === 'reading list') {
        return <ReadingList boards={boards} hideForm={hideForm} tasks={tasks} />
    } else if (template === 'journal') {
        return <Journal boards={boards} hideForm={hideForm} />
    } else if (template === 'personal home') {
        return <PersonalHome boards={boards} hideForm={hideForm} />
        // } else {
        //     return 'Change this to a defautl task list page (make later) '
    }



    return (
        <div>

        </div>
    )
}

export default TaskSection
