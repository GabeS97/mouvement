import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'
import { editTaskThunk } from '../../../../../../store/tasks'

const EditReadingList = ({ task, boardId, closeTask }) => {
    const sessionUser = useSelector(state => state.session.user)
    const [currTask, setCurrTask] = useState(task?.tasks ? task?.tasks : '')
    const [currMedia, setCurrMedia] = useState(task?.media ? task?.media : '')
    const [currAuthor, setCurrAuthor] = useState(task?.author ? task?.author : '')
    const dispatch = useDispatch()

    const hanldeTask = (e) => setCurrTask(e.target.value)
    const handleMedia = (e) => setCurrMedia(e.target.value)
    const handleAuthor = (e) => setCurrAuthor(e.target.value)


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
                <div className="addReadingList_tasks">
                    <input
                        className='addReadingList__task'
                        placeholder='What are you reading?'
                        value={currTask}
                        onChange={hanldeTask}
                    />
                </div>

                <div className="addReadingList_authors">
                    <input
                        className='addReadingList__author'
                        placeholder='Who wrote this?'
                        value={currAuthor}
                        onChange={handleAuthor}
                    />
                </div>

                <div className="addReadingList__medias">
                    <input
                        className='addReadingList__media'
                        placeholder='Which media is this on?'
                        value={currMedia}
                        onChange={handleMedia}
                    />
                </div>

                {/* <div className="addReadingList__custom__media">
                    <input />
                </div> */}
                <button type='submit'>Create new list</button>
            </form>
        </div>
    )
}

export default EditReadingList
