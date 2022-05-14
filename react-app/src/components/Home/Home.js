import React from 'react'
import { Switch, Route } from 'react-router-dom'
import BoardSection from '../BoardSection/BoardSection'
import AddBoard from '../TaskSection/AddBoard/AddBoard'
import TaskSection from '../TaskSection/TaskSection'
import DefaultHome from './DefaultHome/DefaultHome'
import './Home.css'

const Home = () => {
    return (
        <div className='home'>
            <div className="home__leftBar">
                <BoardSection />
            </div>

            <div className="home__rightBar">
                <Switch>
                    <Route path='/home' exact={true}>
                        <DefaultHome />
                    </Route>
                    <Route path='/home/boards/:boardId/:path'>
                        <TaskSection />
                    </Route>

                    <Route path='/home/add_page'>
                        <AddBoard />
                    </Route>
                </Switch>
            </div>

        </div>
    )
}

export default Home
