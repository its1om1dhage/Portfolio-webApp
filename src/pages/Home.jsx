import React, { useEffect, useRef, useState } from 'react';
import Typed from 'typed.js';
import { personalInfo, stats, testimonials } from '../data/experienceData';
import { projects } from '../data/projectsData';
import '../styling/Home_Enhanced.css';

function Home() {
  const typedRef = useRef(null);
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  useEffect(() => {
    const typed = new Typed(typedRef.current, {
      strings: [
        'Senior Full Stack Developer',
        'React.js Specialist',
        'Node.js Expert',
        'Cloud Solutions Architect',
        'UI/UX Enthusiast',
        'Problem Solver',
        'Tech Innovation Leader',
        'Open Source Contributor',
      ],
      typeSpeed: 60,
      backSpeed: 40,
      loop: true,
      showCursor: true,
      cursorChar: '|',
      backDelay: 2000,
      startDelay: 1000,
    });

    return () => typed.destroy();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const scrollToSection = (sectionId) => {
    document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
  };

  const featuredProjects = projects.filter(project => project.featured).slice(0, 3);

  return (
    <>
      {/* Hero Section */}
      <div className="hero-section">
        <div className="hero-content">
          <div className="hero-text">
            <div className="greeting">Hello, I'm</div>
            <div className="name">
              <span className="highlight">{personalInfo.name}</span>
            </div>
            <div className="role">
              <span ref={typedRef}></span>
            </div>
            <div className="hero-description">
              {personalInfo.subtitle} I specialize in building exceptional digital experiences 
              with modern technologies, focusing on performance, scalability, and user experience. 
              Let's create something amazing together.
            </div>

            <div className="hero-buttons">
              <button className="btn-primary" onClick={() => scrollToSection('about')}>
                <i className="fas fa-user"></i>
                Learn More
              </button>
              <button className="btn-secondary" onClick={() => window.location.href = '/contact'}>
                <i className="fas fa-paper-plane"></i>
                Start a Project
              </button>
              <a href={personalInfo.resumeUrl} className="btn-outline" target="_blank" rel="noopener noreferrer">
                <i className="fas fa-download"></i>
                View Resume
              </a>
            </div>

            <div className="social-links">
              <a href={personalInfo.socialLinks.linkedin} target="_blank" rel="noopener noreferrer" title="LinkedIn">
                <i className="fab fa-linkedin"></i>
              </a>
              <a href={personalInfo.socialLinks.github} target="_blank" rel="noopener noreferrer" title="GitHub">
                <i className="fab fa-github"></i>
              </a>
              <a href={personalInfo.socialLinks.whatsapp} target="_blank" rel="noopener noreferrer" title="WhatsApp">
                <i className="fab fa-whatsapp"></i>
              </a>
              <a href={personalInfo.socialLinks.instagram} target="_blank" rel="noopener noreferrer" title="Instagram">
                <i className="fab fa-instagram"></i>
              </a>
            </div>
          </div>
          
          <div className="hero-image">
            <div className="profile-card">
              <div className="profile-img">
                <img src={personalInfo.profileImage} alt={personalInfo.name} />
              </div>
              <div className="profile-info">
                <h3>{personalInfo.name}</h3>
                <p>{personalInfo.title}</p>
                <div className="status">
                  <span className="status-dot"></span>
                  {personalInfo.availability}
                </div>
                <div className="location">
                  <i className="fas fa-map-marker-alt"></i>
                  {personalInfo.location}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Bar */}
        <div className="stats-bar">
          <div className="container">
            <div className="stats-grid">
              <div className="stat-item">
                <span className="stat-number">{stats.experience}</span>
                <span className="stat-label">Years Experience</span>
              </div>
              <div className="stat-item">
                <span className="stat-number">{stats.projects}</span>
                <span className="stat-label">Projects Completed</span>
              </div>
              <div className="stat-item">
                <span className="stat-number">{stats.clients}</span>
                <span className="stat-label">Happy Clients</span>
              </div>
              <div className="stat-item">
                <span className="stat-number">{stats.technologies}</span>
                <span className="stat-label">Technologies</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* About Section */}
      <section id="about" className="about-section">
        <div className="container">
          <h2 className="section-title">About Me</h2>
          <div className="about-content">
            <div className="about-text">
              <p>
                I'm a passionate Senior Full Stack Developer with {stats.experience} years of experience in creating 
                innovative web solutions that drive business growth. My expertise spans the entire development 
                lifecycle, from concept and design to deployment and optimization.
              </p>
              <p>
                I specialize in modern JavaScript technologies, particularly React.js and Node.js ecosystems, 
                and have extensive experience with cloud platforms like AWS, Azure, and Google Cloud. 
                My approach combines technical excellence with business acumen to deliver solutions that 
                not only work flawlessly but also provide measurable value.
              </p>
              <p>
                Beyond coding, I'm passionate about mentoring other developers, contributing to open source 
                projects, and staying at the forefront of technological innovation. I believe in writing 
                clean, maintainable code and building systems that scale with business growth.
              </p>
              
              <div className="about-highlights">
                <div className="highlight-item">
                  <i className="fas fa-rocket"></i>
                  <div>
                    <h4>Performance-Driven</h4>
                    <p>Optimized applications achieving 95+ PageSpeed scores</p>
                  </div>
                </div>
                <div className="highlight-item">
                  <i className="fas fa-users"></i>
                  <div>
                    <h4>Team Leadership</h4>
                    <p>Led and mentored development teams of 5+ developers</p>
                  </div>
                </div>
                <div className="highlight-item">
                  <i className="fas fa-cloud"></i>
                  <div>
                    <h4>Cloud Expert</h4>
                    <p>AWS, Azure, and GCP certified solutions architect</p>
                  </div>
                </div>
                <div className="highlight-item">
                  <i className="fas fa-chart-line"></i>
                  <div>
                    <h4>Business Impact</h4>
                    <p>Delivered solutions generating millions in revenue</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="skills-preview">
              <div className="skill-category">
                <h3>Frontend Excellence</h3>
                <div className="skills">
                  <span className="skill">React.js</span>
                  <span className="skill">Next.js</span>
                  <span className="skill">TypeScript</span>
                  <span className="skill">Vue.js</span>
                  <span className="skill">HTML5</span>
                  <span className="skill">CSS3</span>
                  <span className="skill">Tailwind CSS</span>
                  <span className="skill">Material-UI</span>
                </div>
              </div>
              
              <div className="skill-category">
                <h3>Backend Mastery</h3>
                <div className="skills">
                  <span className="skill">Node.js</span>
                  <span className="skill">Express.js</span>
                  <span className="skill">Python</span>
                  <span className="skill">FastAPI</span>
                  <span className="skill">GraphQL</span>
                  <span className="skill">REST APIs</span>
                  <span className="skill">Microservices</span>
                  <span className="skill">Socket.io</span>
                </div>
              </div>
              
              <div className="skill-category">
                <h3>Cloud & DevOps</h3>
                <div className="skills">
                  <span className="skill">AWS</span>
                  <span className="skill">Azure</span>
                  <span className="skill">Docker</span>
                  <span className="skill">Kubernetes</span>
                  <span className="skill">CI/CD</span>
                  <span className="skill">GitHub Actions</span>
                  <span className="skill">Terraform</span>
                  <span className="skill">Monitoring</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Projects Section */}
      <section className="featured-projects-section">
        <div className="container">
          <h2 className="section-title">Featured Projects</h2>
          <p className="section-subtitle">
            Showcasing some of my best work that demonstrates technical excellence and business impact
          </p>
          
          <div className="projects-grid">
            {featuredProjects.map(project => (
              <div key={project.id} className="project-card">
                <div className="project-image">
                  <img src={project.image} alt={project.title} />
                  <div className="project-overlay">
                    <div className="overlay-content">
                      <a href={project.liveLink} target="_blank" rel="noopener noreferrer" className="btn-overlay">
                        <i className="fas fa-external-link-alt"></i>
                        Live Demo
                      </a>
                      <a href={project.githubLink} target="_blank" rel="noopener noreferrer" className="btn-overlay">
                        <i className="fab fa-github"></i>
                        Code
                      </a>
                    </div>
                  </div>
                </div>
                <div className="project-content">
                  <h3 className="project-title">{project.title}</h3>
                  <p className="project-description">{project.description}</p>
                  <div className="project-technologies">
                    {project.technologies.slice(0, 4).map((tech, index) => (
                      <span key={index} className="tech-tag">{tech}</span>
                    ))}
                    {project.technologies.length > 4 && (
                      <span className="tech-tag">+{project.technologies.length - 4} more</span>
                    )}
                  </div>
                  <div className="project-achievements">
                    {project.achievements && project.achievements.slice(0, 2).map((achievement, index) => (
                      <div key={index} className="achievement">
                        <i className="fas fa-check-circle"></i>
                        <span>{achievement}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="projects-cta">
            <button className="btn-primary" onClick={() => window.location.href = '/work'}>
              <i className="fas fa-folder-open"></i>
              View All Projects
            </button>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="services-section">
        <div className="container">
          <h2 className="section-title">What I Do</h2>
          <p className="section-subtitle">
            Comprehensive development services to bring your ideas to life
          </p>
          <div className="services-grid">
            <div className="service-card">
              <div className="service-icon">
                <i className="fas fa-code"></i>
              </div>
              <h3>Full Stack Development</h3>
              <p>End-to-end web application development using modern technologies like React, Node.js, and cloud platforms. From database design to user interface implementation.</p>
              <div className="service-features">
                <span className="feature">Frontend Development</span>
                <span className="feature">Backend APIs</span>
                <span className="feature">Database Design</span>
                <span className="feature">Cloud Deployment</span>
              </div>
            </div>
            
            <div className="service-card">
              <div className="service-icon">
                <i className="fas fa-mobile-alt"></i>
              </div>
              <h3>Mobile-First Design</h3>
              <p>Creating responsive, mobile-first applications that provide seamless experiences across all devices and screen sizes with optimized performance.</p>
              <div className="service-features">
                <span className="feature">Responsive Design</span>
                <span className="feature">PWA Development</span>
                <span className="feature">Cross-Platform</span>
                <span className="feature">Performance Optimization</span>
              </div>
            </div>
            
            <div className="service-card">
              <div className="service-icon">
                <i className="fas fa-cloud"></i>
              </div>
              <h3>Cloud Solutions</h3>
              <p>Architecting and deploying scalable cloud solutions using AWS, Azure, and Google Cloud with focus on security, performance, and cost optimization.</p>
              <div className="service-features">
                <span className="feature">Cloud Architecture</span>
                <span className="feature">DevOps & CI/CD</span>
                <span className="feature">Microservices</span>
                <span className="feature">Auto Scaling</span>
              </div>
            </div>
            
            <div className="service-card">
              <div className="service-icon">
                <i className="fas fa-rocket"></i>
              </div>
              <h3>Performance Optimization</h3>
              <p>Optimizing applications for speed, performance, and scalability to ensure the best user experience and search engine rankings.</p>
              <div className="service-features">
                <span className="feature">Speed Optimization</span>
                <span className="feature">SEO Enhancement</span>
                <span className="feature">Code Splitting</span>
                <span className="feature">Monitoring Setup</span>
              </div>
            </div>
            
            <div className="service-card">
              <div className="service-icon">
                <i className="fas fa-shield-alt"></i>
              </div>
              <h3>Security Implementation</h3>
              <p>Implementing robust security measures including authentication, authorization, data encryption, and security audits to protect your applications.</p>
              <div className="service-features">
                <span className="feature">Authentication</span>
                <span className="feature">Data Encryption</span>
                <span className="feature">Security Audits</span>
                <span className="feature">Compliance</span>
              </div>
            </div>
            
            <div className="service-card">
              <div className="service-icon">
                <i className="fas fa-users"></i>
              </div>
              <h3>Team Leadership</h3>
              <p>Leading development teams, establishing coding standards, conducting code reviews, and mentoring junior developers to ensure project success.</p>
              <div className="service-features">
                <span className="feature">Team Management</span>
                <span className="feature">Code Reviews</span>
                <span className="feature">Mentoring</span>
                <span className="feature">Best Practices</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="testimonials-section">
        <div className="container">
          <h2 className="section-title">What Clients Say</h2>
          <p className="section-subtitle">
            Trusted by clients worldwide for delivering exceptional results
          </p>
          
          <div className="testimonial-carousel">
            <div className="testimonial-card active">
              <div className="testimonial-content">
                <div className="quote-icon">
                  <i className="fas fa-quote-left"></i>
                </div>
                <p className="testimonial-text">
                  "{testimonials[currentTestimonial].text}"
                </p>
                <div className="testimonial-author">
                  <img 
                    src={testimonials[currentTestimonial].image} 
                    alt={testimonials[currentTestimonial].name}
                    className="author-image"
                  />
                  <div className="author-info">
                    <h4 className="author-name">{testimonials[currentTestimonial].name}</h4>
                    <p className="author-position">
                      {testimonials[currentTestimonial].position} at {testimonials[currentTestimonial].company}
                    </p>
                    <div className="rating">
                      {[...Array(testimonials[currentTestimonial].rating)].map((_, i) => (
                        <i key={i} className="fas fa-star"></i>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="testimonial-indicators">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  className={`indicator ${index === currentTestimonial ? 'active' : ''}`}
                  onClick={() => setCurrentTestimonial(index)}
                />
              ))}
            </div>
          </div>
          
          <div className="testimonials-stats">
            <div className="stat-item">
              <span className="stat-number">98%</span>
              <span className="stat-label">Client Satisfaction</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">100%</span>
              <span className="stat-label">On-Time Delivery</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">24/7</span>
              <span className="stat-label">Support Available</span>
            </div>
          </div>
        </div>
      </section>

      {/* Experience Timeline */}
      <section className="experience-section">
        <div className="container">
          <h2 className="section-title">My Journey</h2>
          <p className="section-subtitle">
            A timeline of my professional growth and key achievements
          </p>
          <div className="timeline">
            <div className="timeline-item">
              <div className="timeline-date">2023 - Present</div>
              <div className="timeline-content">
                <h3>Senior Full Stack Developer</h3>
                <h4>TechVision Solutions</h4>
                <p>Leading development of enterprise-grade applications serving 100,000+ users. Architected microservices solutions and mentored development teams.</p>
                <div className="timeline-achievements">
                  <span className="achievement">Led microservices migration</span>
                  <span className="achievement">40% performance improvement</span>
                  <span className="achievement">Team of 5 developers</span>
                </div>
              </div>
            </div>
            
            <div className="timeline-item">
              <div className="timeline-date">2021 - 2023</div>
              <div className="timeline-content">
                <h3>Full Stack Developer</h3>
                <h4>InnovateTech Pvt Ltd</h4>
                <p>Developed 15+ client projects ranging from e-commerce to SaaS platforms. Implemented real-time features and payment integrations.</p>
                <div className="timeline-achievements">
                  <span className="achievement">15+ successful projects</span>
                  <span className="achievement">100% client satisfaction</span>
                  <span className="achievement">50% performance boost</span>
                </div>
              </div>
            </div>
            
            <div className="timeline-item">
              <div className="timeline-date">2020 - 2021</div>
              <div className="timeline-content">
                <h3>Frontend Developer</h3>
                <h4>DigitalCraft Studios</h4>
                <p>Specialized in creating pixel-perfect, responsive interfaces. Built design systems and optimized frontend performance.</p>
                <div className="timeline-achievements">
                  <span className="achievement">Design system creation</span>
                  <span className="achievement">45% speed improvement</span>
                  <span className="achievement">Developer of the Month</span>
                </div>
              </div>
            </div>
            
            <div className="timeline-item">
              <div className="timeline-date">2019 - 2020</div>
              <div className="timeline-content">
                <h3>Junior Web Developer</h3>
                <h4>StartupHub Technologies</h4>
                <p>Started career building websites and learning modern frameworks. Gained experience in fast-paced startup environment.</p>
                <div className="timeline-achievements">
                  <span className="achievement">First full-stack app</span>
                  <span className="achievement">Excellent performance review</span>
                  <span className="achievement">10+ courses completed</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="cta-section">
        <div className="container">
          <div className="cta-content">
            <h2>Let's Build Something Amazing Together</h2>
            <p>Ready to bring your ideas to life? Let's discuss your project and create something extraordinary.</p>
            <div className="cta-buttons">
              <button className="btn-primary" onClick={() => window.location.href = '/contact'}>
                Start a Project
              </button>
              <button className="btn-secondary" onClick={() => window.location.href = '/resume'}>
                Download Resume
              </button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Home;
