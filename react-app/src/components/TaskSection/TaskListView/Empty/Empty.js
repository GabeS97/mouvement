import React from 'react'
import { useParams } from 'react-router-dom'
import './Empty.css'
const Empty = ({ boards, tasks, handleDelete }) => {
    const { boardId } = useParams()
    const board = boards.find(board => board?.id === +boardId)

    return (
        <div className='default__empty'>
            <div className="default__header">
                <div className="default__top">
                    <div className="default__icon">
                        <div className="default__addIcon">
                            <i class="fa-solid fa-face-smile add__icon"></i>
                            <div className="default__addAIcon">
                                Add icon
                            </div>
                        </div>

                        <div className="default__addCover">
                            <i class="fa-regular fa-image"></i>
                            <div className="default__addACover">
                                Add Cover
                            </div>
                        </div>

                        <div className="default__addComment">
                            <i class="fa-regular fa-comment"></i>
                            <div className="default__addACommet">
                                Add Comment
                            </div>

                        </div>
                    </div>
                    <div className="default__title">
                        {board?.name}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Empty
