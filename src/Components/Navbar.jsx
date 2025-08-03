import React from 'react'
import { Link } from 'react-router-dom'
import '../styling/Navbar.css'
import { NavLink } from 'react-router-dom';


function Navbar() {
  return (
    <>
        <nav>
                <div className="left">

                    <li>Om's Portfolio</li>

                </div>

                <div className="right">

                    <ul>
                    <li><NavLink to="/" className={({ isActive }) => isActive ? "selected" : ""}>Home</NavLink></li>
                    <li><NavLink to="/project" className={({ isActive }) => isActive ? "selected" : ""}>Projects</NavLink></li>
                    <li><NavLink to="/resume" className={({ isActive }) => isActive ? "selected" : ""}>Resume</NavLink></li>
                    <li><NavLink to="/contact" className={({ isActive }) => isActive ? "selected" : ""}>Contact</NavLink></li>
                    <li><NavLink to="/feedback" className={({ isActive }) => isActive ? "selected" : ""}>Feedback</NavLink></li>
                    </ul>

                </div>

            </nav>
      
    </>
  )
}

export default Navbar
