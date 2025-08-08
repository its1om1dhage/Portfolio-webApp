import React from 'react';
import { Link } from 'react-router-dom';
import { experienceData } from '../data/experienceData';
import '../styling/Resume_Enhanced.css';

function Resume() {
  const downloadResume = () => {
    // Create a link to download the resume
    const link = document.createElement('a');
    link.href = experienceData.personalInfo.resumeUrl;
    link.download = `${experienceData.personalInfo.name}_Resume.pdf`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="resume-page">
      {/* Hero Section */}
      <section className="resume-hero">
        <div className="container">
          <div className="hero-content">
            <div className="hero-text">
              <h1 className="hero-title">Professional Resume</h1>
              <p className="hero-description">
                A comprehensive overview of my professional journey, technical expertise, 
                and key achievements in full-stack development
              </p>
              <div className="hero-actions">
                <button onClick={downloadResume} className="btn-primary">
                  <i className="fas fa-download"></i>
                  Download PDF Resume
                </button>
                <Link to="/contact" className="btn-secondary">
                  <i className="fas fa-envelope"></i>
                  Get In Touch
                </Link>
              </div>
            </div>
            <div className="hero-image">
              <img src={experienceData.personalInfo.profileImage} alt={experienceData.personalInfo.name} className="profile-image" />
              <div className="hero-stats">
                <div className="stat-card">
                  <span className="stat-number">{experienceData.stats.experience}</span>
                  <span className="stat-label">Years Experience</span>
                </div>
                <div className="stat-card">
                  <span className="stat-number">{experienceData.stats.projects}</span>
                  <span className="stat-label">Projects</span>
                </div>
                <div className="stat-card">
                  <span className="stat-number">{experienceData.stats.clients}</span>
                  <span className="stat-label">Clients</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Professional Summary */}
      <section className="summary-section">
        <div className="container">
          <h2 className="section-title">Professional Summary</h2>
          <div className="summary-content">
            <div className="summary-text">
              <p>
                Passionate Senior Full Stack Developer with {experienceData.stats.experience} years of experience building 
                scalable web applications and leading development teams. Expertise in modern JavaScript 
                frameworks, cloud technologies, and agile methodologies. Proven track record of delivering 
                high-quality solutions that drive business growth and enhance user experience.
              </p>
              <p>
                Specialized in React.js, Node.js, and cloud platforms (AWS, Azure, GCP) with extensive 
                experience in microservices architecture, DevOps practices, and team leadership. 
                Committed to writing clean, maintainable code and fostering collaborative development environments.
              </p>
            </div>
            <div className="summary-highlights">
              <div className="highlight-grid">
                <div className="highlight-item">
                  <i className="fas fa-code"></i>
                  <div>
                    <h4>Full Stack Expertise</h4>
                    <p>End-to-end development with modern technologies</p>
                  </div>
                </div>
                <div className="highlight-item">
                  <i className="fas fa-users"></i>
                  <div>
                    <h4>Team Leadership</h4>
                    <p>Led and mentored teams of 5+ developers</p>
                  </div>
                </div>
                <div className="highlight-item">
                  <i className="fas fa-cloud"></i>
                  <div>
                    <h4>Cloud Architecture</h4>
                    <p>Designed scalable cloud solutions</p>
                  </div>
                </div>
                <div className="highlight-item">
                  <i className="fas fa-trophy"></i>
                  <div>
                    <h4>Innovation Focus</h4>
                    <p>Multiple awards for technical innovation</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section className="experience-section">
        <div className="container">
          <h2 className="section-title">Professional Experience</h2>
          <div className="timeline">
            {experienceData.experiences.map((exp, index) => (
              <div key={index} className="timeline-item">
                <div className="timeline-marker">
                  <i className="fas fa-briefcase"></i>
                </div>
                <div className="timeline-content">
                  <div className="experience-header">
                    <div className="experience-title-section">
                      <h3 className="experience-title">{exp.title}</h3>
                      <div className="experience-meta">
                        <div className="company-info">
                          <span className="company">{exp.company}</span>
                          <span className="location">{exp.location}</span>
                        </div>
                        <div className="duration-info">
                          <span className="duration">{exp.duration}</span>
                          <span className="type">{exp.type}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <ul className="experience-description">
                    {exp.description.map((item, i) => (
                      <li key={i}>{item}</li>
                    ))}
                  </ul>
                  {exp.achievements && (
                    <div className="experience-achievements">
                      <h4>Key Achievements:</h4>
                      <ul>
                        {exp.achievements.map((achievement, i) => (
                          <li key={i}>{achievement}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                  <div className="experience-technologies">
                    <h4>Technologies Used:</h4>
                    <div className="tech-tags">
                      {exp.technologies.map((tech, i) => (
                        <span key={i} className="tech-tag">{tech}</span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Education Section */}
      <section className="education-section">
        <div className="container">
          <h2 className="section-title">Education</h2>
          <div className="education-grid">
            {experienceData.education.map((edu, index) => (
              <div key={index} className="education-item">
                <div className="education-icon">
                  <i className="fas fa-graduation-cap"></i>
                </div>
                <h3 className="education-degree">{edu.degree}</h3>
                <div className="education-meta">
                  <span className="institution">{edu.institution}</span>
                  <span className="duration">{edu.duration}</span>
                  <span className="location">{edu.location}</span>
                  {edu.cgpa && <span className="gpa">CGPA: {edu.cgpa}</span>}
                  {edu.percentage && <span className="percentage">Percentage: {edu.percentage}</span>}
                </div>
                {edu.achievements && (
                  <ul className="education-achievements">
                    {edu.achievements.map((achievement, i) => (
                      <li key={i}>{achievement}</li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Achievements Section */}
      <section className="achievements-section">
        <div className="container">
          <h2 className="section-title">Achievements & Recognition</h2>
          <div className="achievements-grid">
            {experienceData.achievements.map((achievement, index) => (
              <div key={index} className="achievement-item">
                <div className="achievement-icon">
                  <i className="fas fa-trophy"></i>
                </div>
                <div className="achievement-content">
                  <h3 className="achievement-title">{achievement.title}</h3>
                  <div className="achievement-meta">
                    <span className="organization">{achievement.organization}</span>
                    <span className="year">{achievement.year}</span>
                  </div>
                  <p className="achievement-description">{achievement.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="resume-cta">
        <div className="container">
          <div className="cta-content">
            <h2>Ready to Work Together?</h2>
            <p>Let's discuss how my skills and experience can contribute to your team's success.</p>
            <div className="cta-actions">
              <button onClick={downloadResume} className="btn-primary">
                <i className="fas fa-download"></i>
                Download Full Resume
              </button>
              <Link to="/contact" className="btn-secondary">
                <i className="fas fa-comments"></i>
                Let's Talk
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Resume;
