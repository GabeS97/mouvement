import React, { createContext, useContext, useState } from 'react'
import { deleteTaskThunk } from '../../../../../store/tasks'
import { Modal } from '../../../../context/Modal'
import { useDispatch, useSelector } from 'react-redux';
import EditReadingList from '../EditReadingList/EditReadingList'

export const ReadingListModalContext = createContext()
export const useReadingListModal = () => useContext(ReadingListModalContext)

const ReadingListModal = ({ task, boardId }) => {
    const [readinglistModal, setReadingListModal] = useState(false)
    const [taskModal, setTaskModal] = useState(false)
    const dispatch = useDispatch()

    const closeTask = () => setTaskModal(false)

    return (
        // <ReadingListModalContext.Provider value={{ readinglistModal, setReadingListModal }}>

        //     <Modal onClose={closeTask}>
        //         <EditReadingList task={task} boardId={boardId} closeTask={closeTask} />
        //     </Modal>
        // </ReadingListModalContext.Provider>
        <div className="readingList__medias" id={task?.id} key={task.id} >
            {/* <div className="readingList__reads"> */}
            <div className="readingList__reads" onClick={() => setTaskModal(true)} >
                <li style={{ listStyle: 'none' }} id={task?.id}>
                    <h5 id={`readingList-category-edit-${task?.id}`} >
                        {`Category: ${task?.media}`}
                    </h5>
                    <h4 id={`readingList-tasks-edit-${task?.id}`}>
                        {`${task?.tasks} By: ${task?.author}`}
                    </h4>
                </li>
            </div>

            <div className="readingList__buttons">
                <div className="readingList__iconButtons">
                    <i className="fa-regular fa-pen-to-square quickList__edit" onClick={() => setTaskModal(true)} ></i>
                    <i className="fa-solid fa-trash-can quickList__delete" onClick={() => dispatch(deleteTaskThunk(+boardId, task?.id))}></i>
                </div>
            </div>


            {taskModal && (
                <Modal onClose={() => setTaskModal(false)}>
                    <EditReadingList task={task} boardId={boardId} closeTask={closeTask} />
                </Modal>
            )}
        </div>
    )
}

export default ReadingListModal
