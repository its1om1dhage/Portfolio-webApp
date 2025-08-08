import React, { useState, useEffect, useRef } from 'react';
import { personalInfo } from '../data/experienceData';
import '../styling/Contact_Enhanced.css';

function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
    projectType: '',
    budget: ''
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);
  const [activeQuestion, setActiveQuestion] = useState(null);
  const [formErrors, setFormErrors] = useState({});
  const [isVisible, setIsVisible] = useState({});
  const contactRef = useRef(null);

  // Animation on scroll
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(prev => ({ ...prev, [entry.target.id]: true }));
          }
        });
      },
      { threshold: 0.1 }
    );

    const sections = contactRef.current?.querySelectorAll('[id]');
    sections?.forEach((section) => observer.observe(section));

    return () => {
      sections?.forEach((section) => observer.unobserve(section));
    };
  }, []);

  // Enhanced form validation
  const validateForm = () => {
    const errors = {};
    
    if (!formData.name.trim()) errors.name = 'Name is required';
    if (!formData.email.trim()) {
      errors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errors.email = 'Please enter a valid email address';
    }
    if (!formData.subject.trim()) errors.subject = 'Subject is required';
    if (!formData.message.trim()) {
      errors.message = 'Message is required';
    } else if (formData.message.length < 10) {
      errors.message = 'Message must be at least 10 characters long';
    }
    
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when user starts typing
    if (formErrors[name]) {
      setFormErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setIsSubmitting(true);
    
    // Simulate form submission with better feedback
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      setIsSubmitting(false);
      setSubmitStatus('success');
      setFormData({ 
        name: '', 
        email: '', 
        subject: '', 
        message: '',
        projectType: '',
        budget: '',
        timeline: '',
        phone: '',
        company: '',
        urgency: 'normal',
        preferredContact: 'email'
      });
      
      // Clear success message after 8 seconds
      setTimeout(() => setSubmitStatus(null), 8000);
    } catch (error) {
      setIsSubmitting(false);
      setSubmitStatus('error');
      setTimeout(() => setSubmitStatus(null), 5000);
    }
  };

  const toggleQuestion = (index) => {
    setActiveQuestion(activeQuestion === index ? null : index);
  };

  // Enhanced project types with icons
  const projectTypes = [
    { value: 'website', label: 'Website Development', icon: 'fas fa-globe' },
    { value: 'webapp', label: 'Web Application', icon: 'fas fa-laptop-code' },
    { value: 'ecommerce', label: 'E-commerce Platform', icon: 'fas fa-shopping-cart' },
    { value: 'mobile', label: 'Mobile App', icon: 'fas fa-mobile-alt' },
    { value: 'api', label: 'API Development', icon: 'fas fa-code' },
    { value: 'uiux', label: 'UI/UX Design', icon: 'fas fa-palette' },
    { value: 'other', label: 'Other', icon: 'fas fa-cogs' }
  ];

  const budgetRanges = [
    { value: 'small', label: '$1,000 - $5,000', popular: false },
    { value: 'medium', label: '$5,000 - $15,000', popular: true },
    { value: 'large', label: '$15,000 - $50,000', popular: false },
    { value: 'enterprise', label: '$50,000+', popular: false },
    { value: 'discuss', label: 'Let\'s Discuss', popular: false }
  ];

  const timelineOptions = [
    { value: 'rush', label: 'ASAP (Rush)', icon: 'fas fa-bolt', urgency: 'high' },
    { value: 'fast', label: '2-4 weeks', icon: 'fas fa-forward', urgency: 'medium' },
    { value: 'standard', label: '1-3 months', icon: 'fas fa-calendar-alt', urgency: 'normal' },
    { value: 'flexible', label: '3+ months', icon: 'fas fa-clock', urgency: 'low' }
  ];

  const urgencyLevels = [
    { value: 'low', label: 'Low Priority', color: '#10b981' },
    { value: 'normal', label: 'Normal', color: '#6366f1' },
    { value: 'high', label: 'High Priority', color: '#f59e0b' },
    { value: 'urgent', label: 'Urgent', color: '#ef4444' }
  ];

  const faqData = [
    {
      question: "What's your typical project timeline?",
      answer: "Project timelines vary based on complexity and scope. Simple websites typically take 2-4 weeks, while complex web applications can take 2-6 months. I provide detailed timelines with milestones during our initial consultation to ensure clear expectations."
    },
    {
      question: "Do you work with international clients?",
      answer: "Absolutely! I work with clients worldwide and have experience collaborating across different time zones. I use modern communication tools and establish regular check-ins to ensure smooth project delivery regardless of location."
    },
    {
      question: "What technologies do you specialize in?",
      answer: "I specialize in modern JavaScript technologies including React.js, Node.js, TypeScript, and Next.js. I also work with cloud platforms (AWS, Azure, GCP), databases (MongoDB, PostgreSQL), and various other tools based on project requirements."
    },
    {
      question: "How do you handle project revisions and changes?",
      answer: "I include reasonable revisions in all project quotes and maintain open communication throughout development. For major scope changes, I provide transparent pricing and timeline adjustments to keep projects on track."
    },
    {
      question: "What's included in your project pricing?",
      answer: "My pricing includes development, testing, deployment, documentation, and post-launch support. I provide detailed proposals breaking down all costs upfront with no hidden fees."
    },
    {
      question: "Do you provide ongoing maintenance and support?",
      answer: "Yes! I offer various maintenance packages including bug fixes, security updates, performance monitoring, and feature enhancements. I believe in long-term partnerships with my clients."
    }
  ];

  // Quick response stats
  const responseStats = [
    { icon: 'fas fa-clock', value: '< 2 hours', label: 'Response Time' },
    { icon: 'fas fa-calendar-check', value: '100%', label: 'On-Time Delivery' },
    { icon: 'fas fa-users', value: '50+', label: 'Happy Clients' },
    { icon: 'fas fa-star', value: '4.9/5', label: 'Client Rating' }
  ];

  return (
    <div className="contact-page" ref={contactRef}>
      {/* Hero Section with Animation */}
      <section id="hero" className={`contact-hero ${isVisible.hero ? 'animate-in' : ''}`}>
        <div className="container">
          <div className="hero-content">
            <h1 className="hero-title">Let's Work Together</h1>
            <p className="hero-description">
              Ready to transform your ideas into powerful digital solutions? Whether you need a quick consultation 
              or want to start a full project, I'm here to help you create applications that drive real business results.
            </p>
            <div className="hero-stats">
              {responseStats.map((stat, index) => (
                <div key={index} className="stat-card">
                  <div className="stat-icon">
                    <i className={stat.icon}></i>
                  </div>
                  <div className="stat-content">
                    <span className="stat-value">{stat.value}</span>
                    <span className="stat-label">{stat.label}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact-main" className={`contact-section ${isVisible['contact-main'] ? 'animate-in' : ''}`}>
        <div className="container">
          <div className="contact-content">
            {/* Contact Info */}
            <div className="contact-info">
              <h2>Let's Start a Conversation</h2>
              <p>
                I'm passionate about creating digital solutions that make a real impact. 
                Whether you have a detailed project plan or just an idea you'd like to explore, 
                I'm here to help bring it to life.
              </p>

              <div className="contact-methods">
                <div className="contact-method">
                  <div className="method-icon">
                    <i className="fas fa-envelope"></i>
                  </div>
                  <div className="method-content">
                    <h3>Email</h3>
                    <p>{personalInfo.email}</p>
                    <a href={`mailto:${personalInfo.email}`} className="method-link">
                      <i className="fas fa-external-link-alt"></i>
                      Send Email
                    </a>
                  </div>
                </div>

                <div className="contact-method">
                  <div className="method-icon">
                    <i className="fas fa-phone"></i>
                  </div>
                  <div className="method-content">
                    <h3>Phone</h3>
                    <p>{personalInfo.phone}</p>
                    <a href={`tel:${personalInfo.phone}`} className="method-link">
                      <i className="fas fa-external-link-alt"></i>
                      Call Now
                    </a>
                  </div>
                </div>

                <div className="contact-method">
                  <div className="method-icon">
                    <i className="fas fa-map-marker-alt"></i>
                  </div>
                  <div className="method-content">
                    <h3>Location</h3>
                    <p>{personalInfo.location}</p>
                    <span className="location-note">Available for remote work worldwide</span>
                  </div>
                </div>

                <div className="contact-method">
                  <div className="method-icon">
                    <i className="fas fa-clock"></i>
                  </div>
                  <div className="method-content">
                    <h3>Response Time</h3>
                    <p>Usually within 2 hours</p>
                    <span className="time-note">Monday - Friday, 9 AM - 6 PM IST</span>
                  </div>
                </div>
              </div>

              <div className="social-links">
                <h3>Connect With Me</h3>
                <div className="social-icons">
                  <a href={personalInfo.socialLinks.linkedin} target="_blank" rel="noopener noreferrer" className="social-icon linkedin">
                    <i className="fab fa-linkedin"></i>
                    <span>LinkedIn</span>
                  </a>
                  <a href={personalInfo.socialLinks.github} target="_blank" rel="noopener noreferrer" className="social-icon github">
                    <i className="fab fa-github"></i>
                    <span>GitHub</span>
                  </a>
                  <a href={personalInfo.socialLinks.whatsapp} target="_blank" rel="noopener noreferrer" className="social-icon whatsapp">
                    <i className="fab fa-whatsapp"></i>
                    <span>WhatsApp</span>
                  </a>
                  <a href={personalInfo.socialLinks.instagram} target="_blank" rel="noopener noreferrer" className="social-icon instagram">
                    <i className="fab fa-instagram"></i>
                    <span>Instagram</span>
                  </a>
                </div>
              </div>
            </div>

            {/* Simplified Contact Form */}
            <div className="contact-form-container">
              <div className="form-card">
                <div className="form-header">
                  <div className="form-icon">
                    <i className="fas fa-comments"></i>
                  </div>
                  <h2>Let's Start a Conversation</h2>
                  <p>Ready to bring your ideas to life? Tell me about your project and let's create something amazing together!</p>
                </div>
                
                {submitStatus === 'success' && (
                  <div className="status-message success">
                    <i className="fas fa-check-circle"></i>
                    <div>
                      <h4>Message Sent Successfully!</h4>
                      <p>Thank you for reaching out! I'll get back to you within 2 hours.</p>
                    </div>
                  </div>
                )}

                {submitStatus === 'error' && (
                  <div className="status-message error">
                    <i className="fas fa-exclamation-circle"></i>
                    <div>
                      <h4>Oops! Something went wrong</h4>
                      <p>Please try again or reach out via email directly.</p>
                    </div>
                  </div>
                )}

                <form onSubmit={handleSubmit} className="contact-form simple-form">
                  <div className="form-grid">
                    <div className="form-group">
                      <div className="input-container">
                        <i className="fas fa-user input-icon"></i>
                        <input
                          type="text"
                          id="name"
                          name="name"
                          value={formData.name}
                          onChange={handleInputChange}
                          required
                          placeholder="Your Full Name"
                          className={formErrors.name ? 'error' : ''}
                        />
                      </div>
                      {formErrors.name && <span className="error-text">{formErrors.name}</span>}
                    </div>
                    
                    <div className="form-group">
                      <div className="input-container">
                        <i className="fas fa-envelope input-icon"></i>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          required
                          placeholder="your.email@example.com"
                          className={formErrors.email ? 'error' : ''}
                        />
                      </div>
                      {formErrors.email && <span className="error-text">{formErrors.email}</span>}
                    </div>
                  </div>

                  <div className="form-group">
                    <div className="input-container">
                      <i className="fas fa-lightbulb input-icon"></i>
                      <input
                        type="text"
                        id="subject"
                        name="subject"
                        value={formData.subject}
                        onChange={handleInputChange}
                        required
                        placeholder="What's your project idea? (Brief description)"
                        className={formErrors.subject ? 'error' : ''}
                      />
                    </div>
                    {formErrors.subject && <span className="error-text">{formErrors.subject}</span>}
                  </div>

                  <div className="form-grid">
                    <div className="form-group">
                      <div className="select-container">
                        <i className="fas fa-laptop-code input-icon"></i>
                        <select
                          id="projectType"
                          name="projectType"
                          value={formData.projectType}
                          onChange={handleInputChange}
                        >
                          <option value="">Choose project type</option>
                          <option value="website">Website Development</option>
                          <option value="webapp">Web Application</option>
                          <option value="ecommerce">E-commerce Platform</option>
                          <option value="mobile">Mobile App</option>
                          <option value="api">API Development</option>
                          <option value="uiux">UI/UX Design</option>
                          <option value="other">Other</option>
                        </select>
                      </div>
                    </div>
                    
                    <div className="form-group">
                      <div className="select-container">
                        <i className="fas fa-dollar-sign input-icon"></i>
                        <select
                          id="budget"
                          name="budget"
                          value={formData.budget}
                          onChange={handleInputChange}
                        >
                          <option value="">Select budget range</option>
                          <option value="small">$1,000 - $5,000</option>
                          <option value="medium">$5,000 - $15,000 (Popular)</option>
                          <option value="large">$15,000 - $50,000</option>
                          <option value="enterprise">$50,000+</option>
                          <option value="discuss">Let's Discuss</option>
                        </select>
                      </div>
                    </div>
                  </div>

                  <div className="form-group">
                    <div className="textarea-container">
                      <i className="fas fa-comment-dots input-icon"></i>
                      <textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleInputChange}
                        required
                        rows="5"
                        placeholder="Tell me more about your project goals, requirements, and any specific features you have in mind..."
                        className={formErrors.message ? 'error' : ''}
                      ></textarea>
                    </div>
                    {formErrors.message && <span className="error-text">{formErrors.message}</span>}
                    <div className="character-count">
                      <span className={formData.message.length < 10 ? 'warning' : 'good'}>
                        {formData.message.length} characters (minimum 10)
                      </span>
                    </div>
                  </div>

                  <div className="form-actions">
                    <button 
                      type="submit" 
                      className={`btn-primary gradient-btn ${isSubmitting ? 'submitting' : ''}`}
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? (
                        <>
                          <div className="loading-spinner"></div>
                          Sending...
                        </>
                      ) : (
                        <>
                          <i className="fas fa-paper-plane"></i>
                          Send Message
                          <span className="btn-shine"></span>
                        </>
                      )}
                    </button>
                  </div>
                </form>

                <div className="form-footer">
                  <div className="quick-contact">
                    <span>Prefer to reach out directly?</span>
                    <div className="contact-links">
                      <a href={`mailto:${personalInfo.email}`} className="contact-link email">
                        <i className="fas fa-envelope"></i>
                        Email me
                      </a>
                      <a href={`tel:${personalInfo.phone}`} className="contact-link phone">
                        <i className="fas fa-phone"></i>
                        Call me
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Availability Section */}
      <section id="availability" className={`availability-section ${isVisible.availability ? 'animate-in' : ''}`}>
        <div className="container">
          <div className="availability-content">
            <h2>Current Availability & Process</h2>
            <p>I'm currently accepting new projects and here's how we can work together</p>
            
            <div className="availability-grid">
              <div className="availability-item">
                <div className="availability-icon">
                  <i className="fas fa-calendar-check"></i>
                </div>
                <h3>Available Now</h3>
                <p>Currently accepting new projects with start dates in the next 2-4 weeks</p>
                <div className="availability-status available">
                  <i className="fas fa-circle"></i>
                  Open for New Projects
                </div>
              </div>
              
              <div className="availability-item">
                <div className="availability-icon">
                  <i className="fas fa-handshake"></i>
                </div>
                <h3>Free Consultation</h3>
                <p>30-minute discovery call to discuss your project requirements and goals</p>
                <div className="availability-action">
                  <a href={`mailto:${personalInfo.email}?subject=Free Consultation Request`} className="action-link">
                    <i className="fas fa-calendar-plus"></i>
                    Schedule Call
                  </a>
                </div>
              </div>
              
              <div className="availability-item">
                <div className="availability-icon">
                  <i className="fas fa-rocket"></i>
                </div>
                <h3>Quick Turnaround</h3>
                <p>Fast-track projects available for urgent requirements with premium rates</p>
                <div className="availability-note">
                  <i className="fas fa-bolt"></i>
                  Rush projects: +50% rate
                </div>
              </div>
              
              <div className="availability-item">
                <div className="availability-icon">
                  <i className="fas fa-headset"></i>
                </div>
                <h3>Ongoing Support</h3>
                <p>Post-launch maintenance and support packages available for all projects</p>
                <div className="availability-features">
                  <span className="feature">24/7 Monitoring</span>
                  <span className="feature">Monthly Updates</span>
                  <span className="feature">Performance Reports</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced FAQ Section */}
      <section id="faq" className={`faq-section ${isVisible.faq ? 'animate-in' : ''}`}>
        <div className="container">
          <div className="faq-header">
            <h2>Frequently Asked Questions</h2>
            <p>Everything you need to know about working with me</p>
          </div>
          
          <div className="faq-list">
            {faqData.map((item, index) => (
              <div key={index} className={`faq-item ${activeQuestion === index ? 'active' : ''}`}>
                <button 
                  className="faq-question"
                  onClick={() => toggleQuestion(index)}
                  aria-expanded={activeQuestion === index}
                >
                  <span>{item.question}</span>
                  <i className="fas fa-chevron-down"></i>
                </button>
                <div className="faq-answer">
                  <div className="faq-answer-content">
                    <p>{item.answer}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Enhanced CTA Section */}
      <section id="cta" className={`cta-section ${isVisible.cta ? 'animate-in' : ''}`}>
        <div className="container">
          <div className="cta-content">
            <div className="cta-text">
              <h2>Ready to Start Your Project?</h2>
              <p>
                Let's transform your ideas into powerful digital solutions that drive real results. 
                Get in touch today and let's discuss how we can work together.
              </p>
              <div className="cta-highlights">
                <div className="highlight">
                  <i className="fas fa-check"></i>
                  <span>Free consultation call</span>
                </div>
                <div className="highlight">
                  <i className="fas fa-check"></i>
                  <span>Detailed project proposal</span>
                </div>
                <div className="highlight">
                  <i className="fas fa-check"></i>
                  <span>No obligation quote</span>
                </div>
              </div>
            </div>
            <div className="cta-actions">
              <button 
                className="btn-primary" 
                onClick={() => document.getElementById('name').focus()}
              >
                <i className="fas fa-rocket"></i>
                Start Your Project
              </button>
              <a 
                href={`mailto:${personalInfo.email}?subject=Quick Question`} 
                className="btn-secondary"
              >
                <i className="fas fa-envelope"></i>
                Quick Question
              </a>
              <a href="/resume" className="btn-outline">
                <i className="fas fa-file-alt"></i>
                View My Work
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Contact
