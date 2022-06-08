import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory, NavLink } from 'react-router-dom'
import { getBoardThunk } from '../../store/boards'
import { getTasksThunk } from '../../store/tasks'
import LogoutButton from '../auth/LogoutButton'
import './BoardSection.css'

const BoardSection = () => {
    const sessionUser = useSelector(state => state.session.user)
    const boards = Object.values(useSelector(state => state.boards))
    const userBoards = boards.filter(board => board?.user_id === sessionUser?.id)
    let newBoard = boards[boards.length - 1]
    const dispatch = useDispatch()
    const history = useHistory()

    useEffect(() => {
        dispatch(getBoardThunk(sessionUser?.id))
    }, [dispatch])

    // const createDefault = async (e) => {
    //     e.preventDefault()

    //     const add_board = {
    //         user_id: sessionUser?.id,
    //         name: currName,
    //         template: currSelect,
    //         description: currDesc,
    //         icon: currIcon
    //     }

    //     const board = await dispatch(addBoardThunk(add_board))
    //     if (board?.errors) {
    //         setErrors(board.errors)
    //     } else {
    //         if (newBoard?.id) {
    //             history.push(`/home/boards/${newBoard?.id}/${newBoard?.name.split(' ').join('_').toLowerCase()}`)
    //         } else {
    //             history.push('/')
    //         }
    //     }
    // }


    const activeClassName = (e) => {
        let button = document.getElementsByClassName('boardSection__board__container');

        for (let i = 0; i < button.length; i++) {
            button[i].addEventListener('click', function () {
                let curr = document.getElementsByClassName('active');
                if (curr.length > 0) {
                    curr[0].className = curr[0].className.replace('active', '');
                }
            })
        }
    }

    return (

        <div className='boardSection'>
            <div className="boardSection__user__profile">
                <div className="boardSection__user__image">
                    {sessionUser?.profile_pic ?
                        <img src={sessionUser?.profile_pic} alt='' /> : <div className='boardSection__default__profile'>{sessionUser?.first_name[0]}</div>
                    }
                </div>

                <div className="boardSection__user__name">
                    <p>{sessionUser?.first_name} {sessionUser?.last_name}</p>
                </div>
            </div>

            <div className="boardSection__search">
                <i className="fa-solid fa-magnifying-glass"></i>
                Quick Find
            </div>

            <div className="boardSection__user__boards">
                {userBoards?.map(board => (
                    <div className="boardSection__board__container"
                        key={board?.id}
                        id={`boardSection__board__container__${board?.id}`}
                        onClick={activeClassName}>

                        <i className="fa-solid fa-caret-right"></i>
                        <div className="boardSection__iconAndTitle">
                            <NavLink
                                className="boardSection__board"
                                to={`/home/boards/${board.id}/${board?.name.split(' ').join('_').toLowerCase()}`}
                                onClick={() => dispatch(getTasksThunk(board.id))}>
                                {board?.icon ?
                                    <div>{board?.icon}</div> : <div>📝</div>
                                }
                                <div className="boardSection__title">
                                    {board?.name ?
                                        <div>{board?.name}</div> : <div>{board?.template}</div>
                                    }
                                </div>
                            </NavLink>

                            <div className="boardSection__options">
                                <div className="boardSection__option">
                                    <div className="boardSection__option__container">
                                        <i
                                            className="fa-solid fa-ellipsis boardSection__more"
                                        ></i>
                                    </div>
                                    <div className="boardSection__option__container">
                                        <i className="fa-solid fa-plus boardSection__add"></i>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}

                <div
                    className="boardSection__addAPage"
                // onClick={createDefault}
                >
                    <div className="boardSection__addPageIcon">
                        <i className="fa-solid fa-plus boardSection__add_page"></i>
                        <NavLink to='/home/add_page' className='boardSection__navLink'>
                            <div >
                                Add a Page
                            </div>
                        </NavLink>
                    </div>
                </div>
            </div>
            <div className="boardSection__logoutButton">
                <LogoutButton />
            </div>
        </div >
    )
}

export default BoardSection
