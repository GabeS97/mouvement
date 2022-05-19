import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams, useLocation, useHistory } from 'react-router-dom'
import { deleteBoardThunk, getBoardThunk, getOneBoardThunk } from '../../store/boards'
import { getTasksThunk } from '../../store/tasks'
import BoardSection from '../BoardSection/BoardSection'
import Journal from './TaskListView/Journal/Journal'
import PersonalHome from './TaskListView/PersonalHome/PersonalHome'
import QuickNote from './TaskListView/QuickNote/QuickNote'
import ReadingList from './TaskListView/ReadingList/ReadingList'
import TaskList from './TaskListView/TaskList/TaskList'
import './TaskSelection.css'

const TaskSection = () => {
    const { boardId } = useParams()
    const path = useLocation()
    const dispatch = useDispatch()
    const history = useHistory()
    const pathname = path.pathname.split('/')
    const name = pathname[pathname.length - 1].split('_').join(' ')
    const boards = Object.values(useSelector(state => state.boards))
    const sessionUser = useSelector(state => state.session.user)
    // const board = Object.values(useSelector(state => state.boards))
    const board = boards.filter(board => board.user_id === sessionUser?.id)
    const oneBoard = boards.find(board => board.name.toLowerCase() === name)
    const tasks = Object.values(useSelector(state => state.tasks))
    const task = tasks.filter(task => task.user_id === sessionUser?.id)
    const boardsArr = Object.values(useSelector(state => state.boards))
    let newBoard = boardsArr[boardsArr.length - 2]

    useEffect(() => {
        dispatch(getBoardThunk(sessionUser?.id))
    }, [dispatch])

    useEffect(() => {
        dispatch(getTasksThunk(+boardId))
    }, [dispatch])

    const handleDelete = async (e) => {
        e.preventDefault()
        await dispatch(deleteBoardThunk(+boardId))

        if (boardsArr.length > 1) {
            history.push(`/home/boards/${newBoard?.id}/${newBoard?.name.split(' ').join('_').toLowerCase()}`)
        } else {
            history.push('/')
        }
    }


    const [showModal, setShowModal] = useState(false)

    let template;
    if (oneBoard?.template) {
        template = oneBoard?.template.toLowerCase()
    }

    const hideForm = () => {
        setShowModal(false)
    }

    if (template === 'quick note') {
        return <QuickNote boards={board} hideForm={hideForm} tasks={tasks} handleDelete={handleDelete} />
    }
    else if (template === 'reading list') {
        return <ReadingList boards={boards} hideForm={hideForm} tasks={tasks} handleDelete={handleDelete} />
        // return <ReadingList boards={boards} hideForm={hideForm}  handleDelete={handleDelete} />
    }
    else if (template === 'journal') {
        // return <Journal boards={boards} hideForm={hideForm}  handleDelete={handleDelete} />
        return <Journal boards={boards} hideForm={hideForm} tasks={tasks} handleDelete={handleDelete} />
        // } else if (template === 'personal home') {
        //     return <PersonalHome boards={boards} hideForm={hideForm} />
        // } else {
        //     return 'Change this to a defautl task list page (make later) '
    }



    return (
        <div className='taskSelection'>

        </div>
    )
}

export default TaskSection
