import React from 'react'
import './DefaultHome.css'
const DefaultHome = () => {
    return (
        <div className='defaultHome'>
            <div className="defaultHome__gettingStarted">
                <div className="defaultHome__container">
                    <div className="defaultHome__welcome">
                        <h1>Getting started with Mouvement</h1>
                        <p>👋 Welcome to Mouvement! Mouvement is a clone of Notion </p>
                    </div>

                    <div className="defaultHome__basics">
                        <h4>Here are the basics: </h4>
                        <li>Press on either 'Edit' or 'Delete' on the right hand corner to edit the template</li>
                        <li>Hover over the list contents to display options to delete and to edit the list item</li>
                        <li>Click on the input item to edit text inline</li>
                        <li>Edit can be commited by clicking out of the input item or by clicking the pen to paper icon</li>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default DefaultHome
