import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { useSelector } from 'react-redux'
import LogoutButton from '../auth/LogoutButton'
import './Boards.css'
function Boards() {
    const user = useSelector(state => state.session.user).username

    const truncate = (string, n) => {
        return string?.length > n ? string.substr(0, n - 1) + '...' : string
    }

    return (
        <div className='boards'>

            <div className='boards__owner boards__sections'>
                <div className="owner__container  boards__containers">
                    <img className='boards__profilepic' src="https://www.si.com/.image/ar_1:1%2Cc_fill%2Ccs_srgb%2Cfl_progressive%2Cq_auto:good%2Cw_1200/MTg5ODc5NTY3MDQ3OTkzMDg2/gervonta-davis-vs-rolando-romero---052822_05_28_2022_fight_ryan-hafey-_-premier-boxing-champions.jpg" alt="" />
                    <p>{truncate(user, 25)}</p>
                </div>
            </div>

            <div className='boards__search boards__sections'>
                <div className="search__container boards__containers hoverable__container menu__items">
                    <i className="fa-solid fa-magnifying-glass search"></i>
                    <p>Search</p>
                </div>
            </div>

            <div className="boards__board" id='boards__board'>

            </div>
            <div className="divider" />
            <div className="boards__buttons">
                <div className="boards__newpage hoverable__container " onClick={}>
                    <i className="fa-solid fa-plus plus"></i>
                    <h2>New Page</h2>
                </div>
            </div>

            <LogoutButton />
        </div>
    )
}

export default Boards
