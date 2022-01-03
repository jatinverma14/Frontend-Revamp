
import React, { useState } from 'react'
import logo1 from '../assets/Common/codedigger-logo-64px.png'
import '../styles/Navbar/Navigation.css'
import { GiHamburgerMenu } from "react-icons/gi"

export default function Navbar() {
    const [hamOnclick, sethamOnclick] = useState(false)
    return (
        <>
            <nav className='main-nav'>
                <div className='leftSide'>
                    <div className='logo'>
                        <img src={logo1} alt="logo" />
                        <h1>
                            <span>C</span>ode
                            <span>D</span>igger
                        </h1>
                    </div>
                </div>
                <div className="rightSide">
                    <ul>
                        <li><a href="#">Home</a></li>
                        <li><a href="#">Problems</a></li>
                        <li><a href="#">Practice</a></li>
                        <li><a href="#">Ladders</a></li>
                        <li><a href="#">Conests</a></li>
                        <li><a href="#">Upsolve</a></li>
                    </ul>
                </div>
                <div className="btn">
                    <button>Sign In</button>
                    <button>Register</button>

                    <div className="hamburger" >
                        <a href="#" onClick={() => sethamOnclick(!hamOnclick)}>
                            <GiHamburgerMenu />
                        </a>
                    </div>
                </div>

                <div className={ (hamOnclick == true)? ("hamNavbar")  : ("none") }>
                    <ul>
                        <li><a href="#">Home</a></li>
                        <li><a href="#">Problems</a></li>
                        <li><a href="#">Practice</a></li>
                        <li><a href="#">Ladders</a></li>
                        <li><a href="#">Conests</a></li>
                        <li><a href="#">Upsolve</a></li>
                    </ul>
                    <div className="hamBtn">
                        <button>Sign In</button>
                        <button>Register</button>
                    </div>
                </div>

            </nav>
        </>
    )
}
