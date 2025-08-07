import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import '../styling/Navbar.css'
import { NavLink } from 'react-router-dom';

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      setIsScrolled(scrollTop > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Handle body scroll when menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.classList.add('menu-open');
    } else {
      document.body.classList.remove('menu-open');
    }

    // Cleanup on unmount
    return () => {
      document.body.classList.remove('menu-open');
    };
  }, [isMenuOpen]);

  return (
    <nav className={isScrolled ? 'scrolled' : ''}>
      <div className="left">
        <li>Om's Portfolio</li>
      </div>

      {/* Hamburger Menu Button */}
      <div className={`hamburger ${isMenuOpen ? 'active' : ''}`} onClick={toggleMenu}>
        <span></span>
        <span></span>
        <span></span>
      </div>

      <div className={`right ${isMenuOpen ? 'active' : ''}`}>
        <ul>
          <li><NavLink to="/" className={({ isActive }) => isActive ? "selected" : ""} onClick={closeMenu}>Home</NavLink></li>
          <li><NavLink to="/project" className={({ isActive }) => isActive ? "selected" : ""} onClick={closeMenu}>Projects</NavLink></li>
          <li><NavLink to="/resume" className={({ isActive }) => isActive ? "selected" : ""} onClick={closeMenu}>Resume</NavLink></li>
          <li><NavLink to="/contact" className={({ isActive }) => isActive ? "selected" : ""} onClick={closeMenu}>Contact</NavLink></li>
          <li><NavLink to="/feedback" className={({ isActive }) => isActive ? "selected" : ""} onClick={closeMenu}>Feedback</NavLink></li>
        </ul>
      </div>
    </nav>
  )
}

export default Navbar
