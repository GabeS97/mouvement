import React from 'react'
import { Switch, Route } from 'react-router-dom'
import Boards from '../Boards/Boards'
import BoardSection from '../BoardSection/BoardSection'
import AddBoard from '../TaskSection/AddBoard/AddBoard'
import TaskSection from '../TaskSection/TaskSection'
import DefaultHome from './DefaultHome/DefaultHome'
import './Home.css'

const Home = () => {
    return (
        <div className='home'>
            <div className="home__leftBar">
                {/* <BoardSection /> */}
                <Boards />
            </div>

            <div className="home__rightBar">
                hey
                <Switch>
                    {/* <Route path='/' exact={true}>
                        <DefaultHome />
                    </Route>
                    <Route path='/home/boards/:boardId/:path'>
                        <TaskSection />
                    </Route>

                    <Route path='/home/add_page'>
                        <AddBoard />
                    </Route> */}
                </Switch>
            </div>

        </div>
    )
}

export default Home
