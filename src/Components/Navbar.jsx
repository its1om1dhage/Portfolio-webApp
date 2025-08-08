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

  const handleNavClick = () => {
    closeMenu();
    // Scroll to top when navigating
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth'
    });
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
          <li><NavLink to="/" className={({ isActive }) => isActive ? "selected" : ""} onClick={handleNavClick}>About</NavLink></li>
          <li><NavLink to="/work" className={({ isActive }) => isActive ? "selected" : ""} onClick={handleNavClick}>Work</NavLink></li>
          <li><NavLink to="/resume" className={({ isActive }) => isActive ? "selected" : ""} onClick={handleNavClick}>Resume</NavLink></li>
          <li><NavLink to="/contact" className={({ isActive }) => isActive ? "selected" : ""} onClick={handleNavClick}>Contact</NavLink></li>
        </ul>
      </div>
    </nav>
  )
}

export default Navbar
