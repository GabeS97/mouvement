import React from 'react'
import { Switch, Route } from 'react-router-dom'
import Boards from '../Boards/Boards'
import Main from '../Main/Main'
import './Home.css'

const Home = () => {
    return (
        <div className='home'>
            <div className="home__leftBar">
                {/* <BoardSection /> */}
                <Boards />
            </div>

            <div className="home__rightBar">
                <Switch>
                    <Route path='/boards/:boardId'>
                        <Main />
                    </Route>
                </Switch>
            </div>

        </div>
    )
}

export default Home
