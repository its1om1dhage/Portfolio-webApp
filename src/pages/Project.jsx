import React, { useState } from 'react';
import { projects, categories } from '../data/projectsData';
import '../styling/Project_Enhanced.css';

function Project() {
  const [activeFilter, setActiveFilter] = useState('all');
  const [selectedProject, setSelectedProject] = useState(null);

  const filteredProjects = activeFilter === 'all' 
    ? projects 
    : projects.filter(project => project.category === activeFilter);

  const featuredProjects = projects.filter(project => project.featured);

  return (
    <div className="projects-page">
      {/* Hero Section */}
      <section className="projects-hero">
        <div className="container">
          <h1 className="hero-title">My Projects</h1>
          <p className="hero-description">
            Explore my portfolio of innovative solutions and technical achievements. Each project 
            represents a unique challenge solved with modern technologies and best practices, 
            delivering real business value and exceptional user experiences.
          </p>
          <div className="hero-stats">
            <div className="stat-item">
              <span className="stat-number">{projects.length}+</span>
              <span className="stat-label">Projects Built</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">100%</span>
              <span className="stat-label">Success Rate</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">50+</span>
              <span className="stat-label">Technologies</span>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Projects */}
      <section className="featured-section">
        <div className="container">
          <h2 className="section-title">Featured Projects</h2>
          <p className="section-subtitle">
            Highlighted projects that showcase technical excellence and business impact
          </p>
          <div className="featured-grid">
            {featuredProjects.slice(0, 3).map(project => (
              <div key={project.id} className="featured-card" onClick={() => setSelectedProject(project)}>
                <div className="project-image">
                  <img src={project.image} alt={project.title} />
                  <div className="image-overlay">
                    <div className="overlay-buttons">
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
                      <span className="tech-tag-more">+{project.technologies.length - 4} more</span>
                    )}
                  </div>
                  {project.achievements && (
                    <div className="project-achievements">
                      <h4>Key Achievements:</h4>
                      {project.achievements.slice(0, 2).map((achievement, index) => (
                        <div key={index} className="achievement-item">
                          <i className="fas fa-trophy"></i>
                          <span>{achievement}</span>
                        </div>
                      ))}
                    </div>
                  )}
                  <button className="btn-details" onClick={() => setSelectedProject(project)}>
                    <i className="fas fa-info-circle"></i>
                    View Details
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* All Projects */}
      <section className="all-projects-section">
        <div className="container">
          <h2 className="section-title">All Projects</h2>
          
          {/* Filter Buttons */}
          <div className="filter-buttons">
            {categories.map(category => (
              <button
                key={category.id}
                className={`filter-btn ${activeFilter === category.id ? 'active' : ''}`}
                onClick={() => setActiveFilter(category.id)}
              >
                {category.name}
              </button>
            ))}
          </div>

          {/* Projects Grid */}
          <div className="projects-grid">
            {filteredProjects.map(project => (
              <div key={project.id} className="project-card">
                <div className="project-image">
                  <img src={project.image} alt={project.title} />
                  <div className="image-overlay">
                    <div className="overlay-buttons">
                      <a href={project.liveLink} target="_blank" rel="noopener noreferrer" className="btn-overlay">
                        <i className="fas fa-external-link-alt"></i>
                      </a>
                      <a href={project.githubLink} target="_blank" rel="noopener noreferrer" className="btn-overlay">
                        <i className="fab fa-github"></i>
                      </a>
                    </div>
                  </div>
                </div>
                <div className="project-content">
                  <h3 className="project-title">{project.title}</h3>
                  <p className="project-description">{project.description}</p>
                  <div className="project-technologies">
                    {project.technologies.map((tech, index) => (
                      <span key={index} className="tech-tag">{tech}</span>
                    ))}
                  </div>
                  <div className="project-links">
                    <a href={project.liveLink} target="_blank" rel="noopener noreferrer" className="project-link">
                      Live Demo <i className="fas fa-external-link-alt"></i>
                    </a>
                    <a href={project.githubLink} target="_blank" rel="noopener noreferrer" className="project-link">
                      GitHub <i className="fab fa-github"></i>
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Project Modal */}
      {selectedProject && (
        <div className="project-modal" onClick={() => setSelectedProject(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="close-modal" onClick={() => setSelectedProject(null)}>
              <i className="fas fa-times"></i>
            </button>
            
            <div className="modal-header">
              <img src={selectedProject.image} alt={selectedProject.title} />
              <div className="modal-title-section">
                <h2>{selectedProject.title}</h2>
                <p>{selectedProject.description}</p>
                <div className="modal-links">
                  <a href={selectedProject.liveLink} target="_blank" rel="noopener noreferrer" className="btn-primary">
                    <i className="fas fa-external-link-alt"></i>
                    Live Demo
                  </a>
                  <a href={selectedProject.githubLink} target="_blank" rel="noopener noreferrer" className="btn-secondary">
                    <i className="fab fa-github"></i>
                    View Code
                  </a>
                </div>
              </div>
            </div>
            
            <div className="modal-body">
              {selectedProject.longDescription && (
                <div className="long-description">
                  <h3>Project Overview</h3>
                  <p>{selectedProject.longDescription}</p>
                </div>
              )}
              
              <div className="technologies-used">
                <h3>Technologies Used</h3>
                <div className="tech-grid">
                  {selectedProject.technologies.map((tech, index) => (
                    <span key={index} className="tech-badge">{tech}</span>
                  ))}
                </div>
              </div>
              
              {selectedProject.challenges && (
                <div className="challenges-section">
                  <h3>Technical Challenges</h3>
                  <ul>
                    {selectedProject.challenges.map((challenge, index) => (
                      <li key={index}>{challenge}</li>
                    ))}
                  </ul>
                </div>
              )}
              
              {selectedProject.achievements && (
                <div className="achievements-section">
                  <h3>Key Achievements</h3>
                  <ul>
                    {selectedProject.achievements.map((achievement, index) => (
                      <li key={index}>{achievement}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* CTA Section */}
      <section className="cta-section">
        <div className="container">
          <div className="cta-content">
            <h2>Ready to Start Your Project?</h2>
            <p>
              Let's collaborate and bring your ideas to life. I'm always excited 
              to work on new and challenging projects that push the boundaries of technology.
            </p>
            <div className="cta-buttons">
              <button className="btn-primary" onClick={() => window.location.href = '/contact'}>
                <i className="fas fa-rocket"></i>
                Start a Project
              </button>
              <button className="btn-secondary" onClick={() => window.location.href = '/resume'}>
                <i className="fas fa-file-alt"></i>
                View Resume
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Project
