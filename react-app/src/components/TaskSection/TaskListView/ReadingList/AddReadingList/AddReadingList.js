import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { addTaskThunk } from '../../../../../store/tasks'
import './AddReadingList.css'
const AddReadingList = ({ boardId, hideMedia }) => {
    const dispatch = useDispatch()
    const sessionUser = useSelector(state => state.session.user)
    const [currTask, setCurrTask] = useState('')
    const [currMedia, setCurrMedia] = useState('')
    const [currAuthor, setCurrAuthor] = useState('')
    const [currHeader, setCurrHeader] = useState('')

    const hanldeTask = (e) => setCurrTask(e.target.value)
    const handleMedia = (e) =>   setCurrMedia(e.target.value)
    const handleAuthor = (e) =>  setCurrAuthor(e.target.value)
    const handleHeader = (e) =>  setCurrHeader(e.target.value)

    const handleSumbit = async (e) => {
        e.preventDefault()

        const create_media = {
            user_id: sessionUser?.id,
            board_id: +boardId,
            tasks: currTask,
            media: currMedia,
            author: currAuthor,
            header: currHeader
        }
        await dispatch(addTaskThunk(+boardId, create_media))
        hideMedia()
    }
    return (
        <div className='addReadingList'>
            <header>Add to Reading List</header>
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
                <button type='submit' className='addReadingList__button'>Create new list</button>
            </form>
        </div>
    )
}

export default AddReadingList
