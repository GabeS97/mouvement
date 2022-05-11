import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { NavLink } from 'react-router-dom'
import { getBoardThunk } from '../../store/boards'
import LogoutButton from '../auth/LogoutButton'
import './BoardSection.css'
const BoardSection = () => {
    const sessionUser = useSelector(state => state.session.user)
    const boards = Object.values(useSelector(state => state.boards))
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getBoardThunk())
    }, [dispatch])

    return (
        <div className='boardSection'>

            <div className="boardSection__user__profile">
                <div className="boardSection__user__image">
                    {sessionUser?.profile_pic ?
                        <img src={sessionUser.profile_pic} alt='' /> : <div>{sessionUser.first_name[0]}</div>
                    }
                </div>

                <div className="boardSection__user__name">
                    <p>{sessionUser.first_name} {sessionUser.last_name}</p>
                </div>
            </div>

            <div className="boardSection__user__boards">
                {boards.map(board => (
                    <NavLink key={board.id} className="boardSection__board" to={`/home/boards/${board?.name.split(' ').join('_').toLowerCase()}`} style={{ color: 'black', textDecoration: 'none' }} activeStyle={{ backgroundColor: `rgb(232,231, 228)` }}>
                        <i className="fa-solid fa-caret-right"></i>
                        <div className="boardSection__icon">
                            {board?.icon ?
                                <div>{board?.icon}</div> : <div>📝</div>
                            }
                        </div>
                        <div className="boardSection__title">
                            {board?.template ?
                                <div>{board?.template}</div> : <div>{board?.name}</div>
                            }
                        </div>
                    </NavLink>
                ))}

                <div className="boardSection__addAPage">
                    <div className="boardSection__Logo">
                        <i className="fa-solid fa-plus boardSection__add_page"></i>
                    </div>
                    <NavLink to='/home/add_page' style={{ color: 'black', textDecoration: 'none'}}>
                        <div className="boardSection__add">Add a Page</div>
                    </NavLink>
                </div>
            </div>
            <LogoutButton />
        </div>
    )
}

export default BoardSection
