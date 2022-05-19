import React, { useState } from 'react'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'
import { editTaskThunk } from '../../../../../../store/tasks'
import './EditReadingList.css'
const EditReadingList = ({ task, boardId, closeTask}) => {
    const sessionUser = useSelector(state => state?.session?.user)
    const [currTask, setCurrTask] = useState(task?.tasks ? task?.tasks : '')
    const [currMedia, setCurrMedia] = useState(task?.media ? task?.media : '')
    const [currAuthor, setCurrAuthor] = useState(task?.author ? task?.author : '')


    const dispatch = useDispatch()
    const hanldeTask = (e) => setCurrTask(e.target.value)
    const handleMedia = (e) => setCurrMedia(e.target.value)
    const handleAuthor = (e) => setCurrAuthor(e.target.value)

    console.log(task?.id)
    const [errors, setErrors] = useState([])

    useEffect(() => {
        let validationErrors = []
        if (currTask.length <= 5) validationErrors.push('Task should not be less than 5 characters.');
        if (currTask.length >= 75) validationErrors.push('Task should not exceed 75 characters.');
        if (currMedia.length < 5) validationErrors.push('Media should not be less than 5 characters.');
        if (currMedia.length >= 50) validationErrors.push('Media should not exceed 50 characters.');
        if (currAuthor.length < 5) validationErrors.push('Author should not be less than 5 characters.');
        if (currAuthor.length > 50) validationErrors.push('Author should not exceed 50 characters.');
        if (!currTask) validationErrors.push('In order to submit this field, a title is required.');
        else {
            setErrors([])
        }

        setErrors(validationErrors)
    }, [currTask, currAuthor, currMedia])

    const handleSumbit = async (e) => {
        e.preventDefault()

        const edit_media = {
            id: task?.id,
            user_id: sessionUser?.id,
            board_id: +boardId,
            tasks: currTask,
            media: currMedia,
            author: currAuthor,
        }
        await dispatch(editTaskThunk(+boardId, edit_media))
        closeTask()
    }

    return (
        <div className="editReadingList">
            <header>Edit reading</header>
            <form className='addReadingList__form' onSubmit={handleSumbit}>
                < div className="editReads__errors">
                    {errors.map(error => (
                        <li key={error}>{error}</li>
                    ))}
                </div>
                <div className="addReadingList_tasks">
                    <label>Book:
                        <input
                            className='addReadingList__task'
                            placeholder='What are you reading?'
                            value={currTask}
                            onChange={hanldeTask}
                            maxLength='75'
                        />
                    </label>
                </div>
                <div className="addReadingList_authors">
                    <label>Author/Director:
                        <input
                            className='addReadingList__author'
                            placeholder='Who wrote this?'
                            value={currAuthor}
                            onChange={handleAuthor}
                            maxLength='50'
                        />
                    </label>
                </div>

                <div className="addReadingList__medias">
                    <label>Media:
                        <input
                            className='addReadingList__media'
                            placeholder='Which media is this on?'
                            value={currMedia}
                            onChange={handleMedia}
                            maxLength='50'
                        />
                    </label>
                </div>

                {/* <div className="addReadingList__custom__media">
                    <input />
                </div> */}
                <button type='submit' className='editReadingList__button' disabled={errors.length > 0}>Edit list</button>
            </form >
        </div >
    )
}

export default EditReadingList
