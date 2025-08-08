import React, { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Project from './pages/Project';
import Resume from './pages/Resume';
import Contact from './pages/Contact';
// Removed Feedback import - merged into Contact
import Navbar from './Components/Navbar';
import NeuralNetworkBackground from './Components/NeuralNetworkBackground';
import ScrollToTop from './Components/ScrollToTop';
import Loader from './Components/Loader';

const App = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading time and ensure minimum loading duration
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2500); // 2.5 seconds minimum loading time

    // Also check if document is ready
    const handleLoad = () => {
      setTimeout(() => {
        setLoading(false);
      }, 1000); // Additional 1 second after page load
    };

    if (document.readyState === 'complete') {
      handleLoad();
    } else {
      window.addEventListener('load', handleLoad);
    }

    return () => {
      clearTimeout(timer);
      window.removeEventListener('load', handleLoad);
    };
  }, []);

  if (loading) {
    return <Loader />;
  }

  return (
    <>
      <NeuralNetworkBackground />
      <Router>
        <ScrollToTop />
        <div style={{ position: 'relative', zIndex: 1 }}>
          <Navbar/>
          <Routes>
            <Route path='/' element = {<Home/>} />
            <Route path='/work' element = {<Project/>} />
            <Route path='/resume' element = {<Resume/>} />
            <Route path='/contact' element = {<Contact/>} />
            {/* Redirect old routes */}
            <Route path='/project' element = {<Project/>} />
            <Route path='/feedback' element = {<Contact/>} />
          </Routes>
        </div>
      </Router>
    </>
  );
}

export default App
