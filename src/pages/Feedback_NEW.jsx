import React, { useState } from 'react';
import { experienceData } from '../data/experienceData';
import '../styling/Feedback_Enhanced.css'; 

function Feedback() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    projectType: '',
    budget: '',
    timeline: '',
    message: '',
    rating: 5
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [hoveredStar, setHoveredStar] = useState(0);

  // Project type options
  const projectTypes = [
    "Website Development",
    "E-commerce Platform",
    "Web Application",
    "Mobile App",
    "UI/UX Design",
    "API Development",
    "Database Design",
    "Custom Solution",
    "Other"
  ];

  // Budget ranges
  const budgetRanges = [
    "Under $1,000",
    "$1,000 - $5,000",
    "$5,000 - $10,000",
    "$10,000 - $25,000",
    "$25,000+",
    "Let's Discuss"
  ];

  // Timeline options
  const timelineOptions = [
    "ASAP",
    "1-2 weeks",
    "1 month",
    "2-3 months",
    "3+ months",
    "Flexible"
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    console.log('Submitted feedback:', formData);
    setIsSubmitted(true);
    setIsSubmitting(false);
    
    // Reset form after 5 seconds
    setTimeout(() => {
      setIsSubmitted(false);
      setFormData({
        name: '',
        email: '',
        phone: '',
        company: '',
        projectType: '',
        budget: '',
        timeline: '',
        message: '',
        rating: 5
      });
    }, 5000);
  };

  const handleRatingClick = (rating) => {
    setFormData(prev => ({ ...prev, rating }));
  };

  const getRatingLabel = (rating) => {
    const labels = {
      1: 'Poor',
      2: 'Fair', 
      3: 'Good',
      4: 'Very Good',
      5: 'Excellent'
    };
    return labels[rating] || 'Excellent';
  };

  return (
    <div className="feedback-page">
      {/* Hero Section */}
      <section className="feedback-hero">
        <div className="container">
          <div className="hero-content">
            <h1 className="hero-title">Let's Work Together</h1>
            <p className="hero-description">
              Ready to bring your vision to life? Share your project details and let's create something amazing together.
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="feedback-main">
        <div className="container">
          <div className="feedback-content">
            {/* Info Section */}
            <div className="feedback-info">
              <h2>Let's Create Something Amazing</h2>
              <p>
                I'm passionate about turning ideas into reality. Whether you need a stunning portfolio, 
                a robust e-commerce platform, or a custom web application, I'm here to help you succeed.
              </p>
              
              <div className="feedback-features">
                <div className="feature-item">
                  <div className="feature-icon">
                    <i className="fas fa-lightbulb"></i>
                  </div>
                  <div className="feature-content">
                    <h3>Innovative Solutions</h3>
                    <p>Creative approaches to solve complex problems</p>
                  </div>
                </div>
                <div className="feature-item">
                  <div className="feature-icon">
                    <i className="fas fa-rocket"></i>
                  </div>
                  <div className="feature-content">
                    <h3>Fast Delivery</h3>
                    <p>Quick turnaround without compromising quality</p>
                  </div>
                </div>
                <div className="feature-item">
                  <div className="feature-icon">
                    <i className="fas fa-handshake"></i>
                  </div>
                  <div className="feature-content">
                    <h3>Collaborative Process</h3>
                    <p>Working closely with you at every step</p>
                  </div>
                </div>
              </div>

              <div className="contact-info">
                <h3>Get in Touch</h3>
                <div className="contact-methods">
                  <div className="contact-item">
                    <i className="fas fa-envelope"></i>
                    <span>{experienceData.personalInfo.email}</span>
                  </div>
                  <div className="contact-item">
                    <i className="fas fa-phone"></i>
                    <span>{experienceData.personalInfo.phone}</span>
                  </div>
                  <div className="contact-item">
                    <i className="fas fa-map-marker-alt"></i>
                    <span>{experienceData.personalInfo.location}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Project Form */}
            <div className="form-section">
              <div className="form-card">
                <h2>Tell Me About Your Project</h2>
                
                {isSubmitted && (
                  <div className="success-message">
                    <i className="fas fa-check-circle"></i>
                    <h3>Thank you for your inquiry!</h3>
                    <p>I'll get back to you within 24 hours to discuss your project in detail.</p>
                  </div>
                )}

                <form onSubmit={handleSubmit} className="feedback-form">
                  <div className="form-row">
                    <div className="form-group">
                      <label htmlFor="name">Full Name *</label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        placeholder="Enter your full name"
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="email">Email Address *</label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        placeholder="your@email.com"
                      />
                    </div>
                  </div>

                  <div className="form-row">
                    <div className="form-group">
                      <label htmlFor="phone">Phone Number</label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="+1 (555) 123-4567"
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="company">Company/Organization</label>
                      <input
                        type="text"
                        id="company"
                        name="company"
                        value={formData.company}
                        onChange={handleChange}
                        placeholder="Company name (optional)"
                      />
                    </div>
                  </div>

                  <div className="form-row">
                    <div className="form-group">
                      <label htmlFor="projectType">Project Type *</label>
                      <select
                        id="projectType"
                        name="projectType"
                        value={formData.projectType}
                        onChange={handleChange}
                        required
                      >
                        <option value="">Select project type</option>
                        {projectTypes.map((type, index) => (
                          <option key={index} value={type}>{type}</option>
                        ))}
                      </select>
                    </div>
                    <div className="form-group">
                      <label htmlFor="budget">Budget Range</label>
                      <select
                        id="budget"
                        name="budget"
                        value={formData.budget}
                        onChange={handleChange}
                      >
                        <option value="">Select budget range</option>
                        {budgetRanges.map((range, index) => (
                          <option key={index} value={range}>{range}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className="form-group">
                    <label htmlFor="timeline">Timeline</label>
                    <select
                      id="timeline"
                      name="timeline"
                      value={formData.timeline}
                      onChange={handleChange}
                    >
                      <option value="">Select timeline</option>
                      {timelineOptions.map((option, index) => (
                        <option key={index} value={option}>{option}</option>
                      ))}
                    </select>
                  </div>

                  <div className="form-group">
                    <label htmlFor="message">Project Details *</label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows="6"
                      placeholder="Tell me about your project goals, requirements, features you need, target audience, etc."
                    ></textarea>
                  </div>

                  <div className="form-group">
                    <label>How would you rate your experience so far?</label>
                    <div className="rating-section">
                      <div className="stars">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <button
                            key={star}
                            type="button"
                            className={`star ${star <= (hoveredStar || formData.rating) ? 'active' : ''}`}
                            onClick={() => handleRatingClick(star)}
                            onMouseEnter={() => setHoveredStar(star)}
                            onMouseLeave={() => setHoveredStar(0)}
                          >
                            <i className="fas fa-star"></i>
                          </button>
                        ))}
                      </div>
                      <span className="rating-label">{getRatingLabel(hoveredStar || formData.rating)}</span>
                    </div>
                  </div>

                  <button
                    type="submit"
                    className={`submit-btn ${isSubmitting ? 'submitting' : ''}`}
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <>
                        <div className="spinner"></div>
                        Submitting...
                      </>
                    ) : (
                      <>
                        <i className="fas fa-paper-plane"></i>
                        Send Project Details
                      </>
                    )}
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="testimonials-section">
        <div className="container">
          <h2 className="section-title">What Clients Say</h2>
          <div className="testimonials-grid">
            {experienceData.testimonials.slice(0, 3).map((testimonial, index) => (
              <div key={index} className="testimonial-card">
                <div className="testimonial-content">
                  <p>"{testimonial.text}"</p>
                </div>
                <div className="testimonial-author">
                  <div className="author-avatar">
                    {testimonial.name.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div className="author-info">
                    <h4>{testimonial.name}</h4>
                    <p>{testimonial.position}</p>
                    <div className="rating-stars">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <i key={i} className="fas fa-star"></i>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="feedback-cta">
        <div className="container">
          <div className="cta-content">
            <h2>Ready to Start Your Project?</h2>
            <p>
              Don't wait - let's turn your ideas into reality. Get started today and 
              see how we can create something extraordinary together.
            </p>
            <div className="cta-stats">
              <div className="stat-item">
                <span className="stat-number">50+</span>
                <span className="stat-label">Projects Completed</span>
              </div>
              <div className="stat-item">
                <span className="stat-number">100%</span>
                <span className="stat-label">Client Satisfaction</span>
              </div>
              <div className="stat-item">
                <span className="stat-number">24h</span>
                <span className="stat-label">Response Time</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Feedback;
