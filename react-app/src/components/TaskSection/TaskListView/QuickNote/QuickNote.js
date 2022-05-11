import React from 'react'
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import './QuickNote.css'
const QuickNote = ({ boards }) => {
    const { boardId } = useParams()
    const board = boards.find(board => board.id === +boardId)
    return (
        <div className='quickNote'>
            <div className="quickNote__contents">
                <div className="quickNote__headers">
                    <div className="quickNote__icon">
                        {board?.icon}
                    </div>

                    <div className="quickNote__descs">
                        <h1 className='quickNote__title'>{board?.name}</h1>
                        <h3 className='quickNote__description'>{board?.description}</h3>
                    </div>
                </div>

                <div className="quickNote__notes">
                    <h2>Jot down some text</h2>
                    <p>They found Mary, as usual, deep in the study of thorough-bass and human nature; and had some extracts to admire, and some new observations of threadbare morality to listen to. Catherine and Lydia had information for them of a different sort. CHANGE LATER TO SEEDER VALUE</p>
                </div>

                <div className="quickNote__list">
                    <h2>Make a to-do-list</h2>
                    <p>MAKE THE LSIT FORM THE TASK SEEDS </p>
                </div>
            </div>
        </div>
    )
}

export default QuickNote
