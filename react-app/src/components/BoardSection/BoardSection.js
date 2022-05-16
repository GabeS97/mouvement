import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { NavLink } from 'react-router-dom'
import { deleteBoardThunk, getBoardThunk } from '../../store/boards'
import { getTasksThunk } from '../../store/tasks'
import LogoutButton from '../auth/LogoutButton'
import './BoardSection.css'
const BoardSection = () => {
    const sessionUser = useSelector(state => state.session.user)
    const boards = Object.values(useSelector(state => state.boards))
    const userBoards = boards.filter(board => board.user_id === sessionUser?.id)
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
                {userBoards.map(board => (
                    <div className="boardSection__board__container" key={board.id}  >
                        <NavLink className="boardSection__board" to={`/home/boards/${board.id}/${board?.name.split(' ').join('_').toLowerCase()}`} style={{ color: 'black', textDecoration: 'none' }} activeStyle={{ backgroundColor: `rgb(232,231, 228)` }} onClick={() => dispatch(getTasksThunk(board.id))}>
                            <i className="fa-solid fa-caret-right"></i>
                            <div className="boardSection__icon">
                                {board?.icon ?
                                    <div>{board?.icon}</div> : <div>📝</div>
                                }
                            </div>
                            <div className="boardSection__title">
                                {board?.name ?
                                    <div>{board?.name}</div> : <div>{board?.template}</div>
                            }
                        </div>
                    </NavLink>
                        {/* <i className="fa-regular fa-trash-can boardSection__delete__button" onClick={() => dispatch(deleteBoardThunk(board.id))}></i> */}
                        {/* <div className="boardSection__options">

                            <i class="fa-solid fa-ellipsis boardSection__more__button"></i>
                            <div className="boardSection___more__dropdown">
                                <div className="boardSection__delete">
                                    Edit
                                </div>

                                <div className="boardSection__edit">
                                    Delete
                                </div>
                            </div>
                        </div> */}
                    </div>
                ))}

                <div className="boardSection__addAPage">
                    <div className="boardSection__addPageIcon">
                        <i className="fa-solid fa-plus boardSection__add_page"></i>
                    <NavLink to='/home/add_page' style={{ color: 'black', textDecoration: 'none', width: '100%' }}>
                        <div className="">
                            Add a Page
                        </div>
                    </NavLink>
                    </div>
                </div>
            </div>
            <div className="boardSection__logoutButton">
                <LogoutButton/>
            </div>
        </div>
    )
}

export default BoardSection
