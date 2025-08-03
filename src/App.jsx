import React from 'react'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from './pages/Home';
import Project from './pages/Project';
import Resume from './pages/Resume';
import Contact from './pages/Contact';
import Feedback from './pages/Feedback';
import Navbar from './Components/Navbar';


const App = () => {
  return (
    <>
      <Router>
        <div>
          <Navbar/>
          <Routes>
            <Route path='/' element = {<Home/>} />
            <Route path='/project' element = {<Project/>} />
            <Route path='/resume' element = {<Resume/>} />
            <Route path='/contact' element = {<Contact/>} />
            <Route path='/feedback' element = {<Feedback/>} />
          </Routes>
        </div>
      </Router>
    </>
  );
}

export default App
