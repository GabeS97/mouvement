import React from 'react'
import './ShowReflection.css'
const ShowReflection = () => {

    let time = new Date().toLocaleTimeString()
    let date = new Date().toLocaleDateString()
    return (
        <div className='showReflection'>

            <div className="showReflection__page">
                <div className="showReflection__title">
                    <div className='showReflection__icon'>💬</div>
                    <h1>Daily Reflection</h1>
                </div>

                <div className="showReflection__created__at">
                    <div className="showReflection__created">
                        <i class="fa-regular fa-clock"></i>
                        Created
                    </div>
                    <div className="showReflection__timestamp">
                        {`${date} ${time} `}
                    </div>
                </div>

                <div className="showReflection__lists">
                    <div className="showReflection__intentions">
                        <h2>Intentions</h2>
                    </div>

                    <div className="showReflection__happenings">
                        <h2>Happenings</h2>
                    </div>

                    <div className="showReflection__grateful">
                        <h2>Grateful for</h2>
                    </div>

                    <div className="showReflection__actions">
                        <h2>Action Items</h2>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default ShowReflection
