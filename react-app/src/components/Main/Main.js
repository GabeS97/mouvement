import React from 'react'
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getOneBoardThunk } from '../../store/boards';

import './Main.css'

function Main() {
    const { boardId } = useParams();
    const dispatch = useDispatch();
    const boards = useSelector(state => state.boards)
    const board = boards[boardId]

    return (
        <div className="main">
            <div className="main__header">
                <p className='main__titlesm'>{board?.name}</p>
            </div>

            {/* <div className="main__coverphoto"></div> */}

            <div className="main__contents">
                <div className="main__content">
                    <div className="main__title">
                        <h1>{board?.name}</h1>
                    </div>

                    <div className="main__description">
                        <p>You can hover over the button on the bottom left corner to add a new pagem or you can click oon the below options to use a pre-existing template</p>
                    </div>

                    <div className="main__templates">

                        <h2 className='template__title'>Templates</h2>
                        <div className='template__options'>
                            <h2>
                                ✈️
                            </h2>
                            <h2>Travel Planner</h2>
                        </div>
                        <div className='template__options'>
                            <h2>✔️</h2>
                            <h2>Task List</h2>
                        </div>
                        <div className='template__options'>
                            <h2>📓</h2>
                            <h2>Journal</h2>
                        </div>
                        <div className='template__options'>
                            <h2>📥</h2>
                            <h2>Job Applications</h2>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Main
