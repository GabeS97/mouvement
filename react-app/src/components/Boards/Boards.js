import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addBoardThunk, getBoardThunk } from '../../store/boards'
import { ChevronRightIcon } from '@heroicons/react/24/outline';
import LogoutButton from '../auth/LogoutButton'
import './Boards.css'
import { useHistory } from 'react-router-dom';
function Boards() {
    const user = useSelector(state => state.session.user)
    const boards = useSelector(state => state.boards)
    const history = useHistory();
    const boardsValues = Object.values(boards)
    const dispatch = useDispatch()

    const truncate = (string, n) => {
        return string?.length > n ? string.substr(0, n - 1) + '...' : string
    }

    const changePage = (id) => history.push(`/boards/${id}`)
    const addPage = async (e) => {
        e.preventDefault();

        const addPage = {
            user_id: user?.id,
            name: 'Untitled',
            template: 'Untitled',
            description: '',
            icon: ''
        }
        await dispatch(addBoardThunk(addPage))
    }

    useEffect(async () => {
        await dispatch(getBoardThunk(user?.id))
    }, [dispatch])

    return (
        <div className='boards'>


            <div className='boards__owner boards__sections'>
                <div className="owner__container  boards__containers">
                    <img className='boards__profilepic' src="https://www.si.com/.image/ar_1:1%2Cc_fill%2Ccs_srgb%2Cfl_progressive%2Cq_auto:good%2Cw_1200/MTg5ODc5NTY3MDQ3OTkzMDg2/gervonta-davis-vs-rolando-romero---052822_05_28_2022_fight_ryan-hafey-_-premier-boxing-champions.jpg" alt="" />
                    <p>{truncate(user.username, 25)}</p>
                </div>
            </div>

            <div className='boards__search boards__sections'>
                <div className="search__container boards__containers hoverable__container menu__items">
                    <i className="fa-solid fa-magnifying-glass search"></i>
                    <p>Search</p>
                </div>
            </div>

            <div className="boards__board" id='boards__board'>
                {boardsValues.map(board => (
                    <div
                        onClick={() => changePage(board?.id)}
                        key={board.id}
                        className='hoverable__container boards__containers board__container'>
                        {board?.icon ? <span>{board?.icon}</span> :
                            <i className="fa-regular fa-file-lines file"></i>
                        }
                        <ChevronRightIcon height={15} />
                        <p>{board.name}</p>
                    </div>
                ))}
            </div>

            <div className="boards__buttons">
                <div className="divider" />
                <div
                    onClick={addPage}
                    className="boards__newpage hoverable__container" >
                    <i className="fa-solid fa-plus plus"></i>
                    <h2>New Page</h2>
                </div>
            </div>

            <LogoutButton />
        </div>
    )
}

export default Boards
