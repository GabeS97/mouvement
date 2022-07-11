import React from 'react'
import { NavLink } from 'react-router-dom'
import './LandingPage.css'
const LandingPage = () => {
    return (
        <div className='landingPage'>
            <div className="landingPage__contents">

                <div className="landingPage__oneWorkspace">
                    <div className="landingPage__oneWorkspace__text">
                        <h1>One workspace. Every team.</h1>
                        <h2>We're more than a doc. Or a table. Customize <br></br >Mouvement to work that way you do.</h2>

                        <div className="landingPage__freeTrial">
                            <NavLink to='/signup' style={{ textDecoration: 'none', color: 'white' }}>
                                Try Mouvement free
                            </NavLink>
                        </div>

                    </div>

                    <div className="landingPage__oneWorkspace__image">
                        <img src={`https://www.notion.so/cdn-cgi/image/format=auto,width=640,quality=100/front-static/pages/product/home-page-hero-refreshed-v3.png`} alt='' />
                    </div>
                </div>

                <div className="landingPage__teams">
                    <div className="landingPage__teams__texts">
                        <div className="landingPage__teams__image">
                            <img src={`https://www.notion.so/cdn-cgi/image/format=auto,width=128,quality=100/front-static/pages/product/spot/spot-team-up.png`} alt='' />
                        </div>
                        <div className="landingPage__teams__text">
                            <h3>Team up without <br></br> the chaos</h3>
                            <p>Connect your teams, projects, and <br></br> docs in Mouvement — so you can bust silos and move as one.</p>
                        </div>
                    </div>

                    <div className="landingPage__teams__vid">
                        <video width='800px' height='500px' playsInline autoPlay loop muted>
                            <source src='https://www.notion.so/front-static/pages/product/value-props/team-up-emoji-tile-v2/en-US.mp4' type='video/mp4' />
                        </video>
                    </div>
                </div>

                <div className="landingPage__context">
                    <div className="landingPage__context__texts">
                        <div className="landingPage__context__leftText">
                            <img src='https://www.notion.so/cdn-cgi/image/format=auto,width=96,quality=100/front-static/pages/product/spot/spot-context.png' alt='' />
                            <h3 className='landingPage__context__firstP'>Never ask "What's the <br></br> context?" again</h3>
                            <p className='landingPage__context__secondP' >Stale wikis aren't helpful. Neither are <br></br>floating docs. In Notion, your daily work <br></br>and knowledge live side by side — so<br></br> you never lose context.</p>
                        </div>
                    </div>

                    <div className="landingPage__context__rightImage">
                        <img src='https://miro.medium.com/max/700/1*Pfa_1ltYEIsSEoZkfLyyDQ.png' alt='' />
                    </div>
                </div>

                <div className="landingPage__workflow">
                    <div className="landingPage__workflow__texts">
                        <div className="landingPage__workflow__leftText">
                            <img src='https://www.notion.so/cdn-cgi/image/format=auto,width=256,quality=100/front-static/pages/product/spot/spot-workflow.png' alt='' />
                            <h3>Build the workflow <br></br>you want</h3>
                            <p>Customize Mouvement to make it work the <br></br>way you want it to. <br></br></p>

                            <p>Just drag and drop to craft the <br></br>dashboard, website, doc, or system you need.</p>
                        </div>

                        <div className="landingPage__workflow__video">
                            <video width='800px' height='500px' playsInline autoPlay loop muted>
                                <source src='https://www.notion.so/front-static/pages/product/value-props/workflow-tile-v2/en-US.mp4' type='video/mp4' />
                            </video>
                        </div>
                    </div>
                </div>

                <div className="landingPage__benefit">
                    <div className="landingPage__benefit__texts">
                        <div className="landingPage__benefit__leftText">
                            <img src='https://www.notion.so/cdn-cgi/image/format=auto,width=64,quality=100/front-static/pages/product/spot/spot-ecosystem.png' alt='' />
                            <h3 >Benefit from a global <br></br>ecosystem of creators</h3>
                            <p>Get inspiration from thousands of <br></br> community-made templates, <br></br> integrations, and events.</p>

                            <p>You'll never want for resources or <br></br>support.</p>
                        </div>
                    </div>

                    <div className="landingPage__benefit__rightImage">
                        <img src='https://media.glassdoor.com/template/l/3304926/notion-labs-template-1639769045149.jpg' alt='' />
                    </div>
                </div>
            </div>

        </div>
    )
}

export default LandingPage
