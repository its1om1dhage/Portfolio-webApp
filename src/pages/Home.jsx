import React, { useEffect, useRef } from 'react';
import Typed from 'typed.js';
import '../styling/Home.css';

function Home() {
  const typedRef = useRef(null);

  useEffect(() => {
    const typed = new Typed(typedRef.current, {
      strings: [
        'Software Developer',
        'Video Editor',
        'Computer Science Engineer',
        'Freelancer',
        'Graphic Designer',
        'Welcome You Here',
      ],
      typeSpeed: 100,
      loop: true,
    });

    return () => typed.destroy();
  }, []);

  return (
    <>
      <div className="first-section bgImg">
        <div className="section-left">
          <div className="h1">Hello !</div>
          <div className="h2">
            I'm <span id="highlight">Om Dhage</span>
          </div>
          <div className="h3">
            <span ref={typedRef}></span>
          </div>

          <div className="first-section-buttons">
            <div className="button-instagram">
              <button>Instagram</button>
            </div>
            <div className="button-linkedin">
              <button>LinkedIn</button>
            </div>
          </div>
        </div>
        {/* You can add profile image here if needed */}
      </div>

      <div className="second-section">
        <div className="section-left2">
          <div className="intro">
            <div className="p1">Name : Om Dhage</div>
            <div className="p1">Job Role : Software Developer</div>
            <div className="p1">Address : Hinganghat, Maharashtra</div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;
