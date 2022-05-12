import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom'
import { getTasksThunk } from '../../../../../store/tasks'


const QuickList = () => {
    const dispatch = useDispatch()
    const { boardId } = useParams()

    const tasks = Object.values(useSelector(state => state.tasks))
    console.log(tasks);

    useEffect(() => {
        dispatch(getTasksThunk(boardId))
    }, [dispatch])

    return (
        <div>

        </div>
    )
}

export default QuickList
