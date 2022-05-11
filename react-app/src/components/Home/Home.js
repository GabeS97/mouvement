import React from 'react'
import BoardSection from '../BoardSection/BoardSection'
import TaskSection from '../TaskSection/TaskSection'
import './Home.css'

const Home = () => {
    return (
        <div className='home'>
            <div className="home__leftBar">
                <BoardSection />
            </div>

            <div className="home__rightBar">
                <TaskSection /> 
            </div>

        </div>
    )
}

export default Home
