import React, { useState } from 'react';
import { experienceData } from '../data/experienceData';
import '../styling/Contact_Enhanced.css';

function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
    projectType: '',
    budget: '',
    timeline: ''
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);
  const [activeQuestion, setActiveQuestion] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitStatus('success');
      setFormData({ 
        name: '', 
        email: '', 
        subject: '', 
        message: '',
        projectType: '',
        budget: '',
        timeline: ''
      });
      
      // Clear success message after 5 seconds
      setTimeout(() => setSubmitStatus(null), 5000);
    }, 2000);
  };

  const toggleQuestion = (index) => {
    setActiveQuestion(activeQuestion === index ? null : index);
  };

  const faqData = [
    {
      question: "What's your typical project timeline?",
      answer: "Project timelines vary based on complexity, but most projects range from 2-12 weeks. I provide detailed timelines during our initial consultation."
    },
    {
      question: "Do you work with international clients?",
      answer: "Yes! I work with clients worldwide. I'm experienced in remote collaboration and can adapt to different time zones for meetings and communication."
    },
    {
      question: "What technologies do you specialize in?",
      answer: "I specialize in React, Node.js, TypeScript, and modern web technologies. I also work with cloud platforms like AWS and have experience with mobile development."
    },
    {
      question: "How do you handle project revisions?",
      answer: "I include a reasonable number of revisions in all projects. Major scope changes are discussed separately to ensure we stay aligned on goals and timelines."
    },
    {
      question: "What's your preferred communication method?",
      answer: "I'm flexible with communication preferences. Email for formal updates, Slack/Discord for quick questions, and video calls for detailed discussions work great."
    }
  ];

  return (
    <div className="contact-page">
      {/* Hero Section */}
      <section className="contact-hero">
        <div className="container">
          <h1 className="hero-title">Get In Touch</h1>
          <p className="hero-description">
            Ready to start your next project? Let's discuss how we can work together 
            to bring your ideas to life.
          </p>
        </div>
      </section>

      {/* Contact Section */}
      <section className="contact-section">
        <div className="container">
          <div className="contact-content">
            {/* Contact Info */}
            <div className="contact-info">
              <h2>Let's Start a Conversation</h2>
              <p>
                I'm always excited to work on new projects and meet new people. 
                Whether you have a question, a project idea, or just want to say hi, 
                feel free to reach out!
              </p>

              <div className="contact-methods">
                <div className="contact-method">
                  <div className="method-icon">
                    <i className="fas fa-envelope"></i>
                  </div>
                  <div className="method-content">
                    <h3>Email</h3>
                    <p>om.dhage@example.com</p>
                    <a href="mailto:om.dhage@example.com">Send Email</a>
                  </div>
                </div>

                <div className="contact-method">
                  <div className="method-icon">
                    <i className="fas fa-phone"></i>
                  </div>
                  <div className="method-content">
                    <h3>Phone</h3>
                    <p>+91 9876543210</p>
                    <a href="tel:+919876543210">Call Now</a>
                  </div>
                </div>

                <div className="contact-method">
                  <div className="method-icon">
                    <i className="fas fa-map-marker-alt"></i>
                  </div>
                  <div className="method-content">
                    <h3>Location</h3>
                    <p>Hinganghat, Maharashtra</p>
                    <p>India</p>
                  </div>
                </div>

                <div className="contact-method">
                  <div className="method-icon">
                    <i className="fas fa-clock"></i>
                  </div>
                  <div className="method-content">
                    <h3>Response Time</h3>
                    <p>Usually within 24 hours</p>
                    <p>Monday - Friday</p>
                  </div>
                </div>
              </div>

              <div className="social-links">
                <h3>Follow Me</h3>
                <div className="social-icons">
                  <a href="https://linkedin.com/in/om-dhage" target="_blank" rel="noopener noreferrer">
                    <i className="fab fa-linkedin"></i>
                  </a>
                  <a href="https://github.com/om-dhage" target="_blank" rel="noopener noreferrer">
                    <i className="fab fa-github"></i>
                  </a>
                  <a href="https://twitter.com/om-dhage" target="_blank" rel="noopener noreferrer">
                    <i className="fab fa-twitter"></i>
                  </a>
                  <a href="https://instagram.com/om-dhage" target="_blank" rel="noopener noreferrer">
                    <i className="fab fa-instagram"></i>
                  </a>
                  <a href="https://behance.net/om-dhage" target="_blank" rel="noopener noreferrer">
                    <i className="fab fa-behance"></i>
                  </a>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="contact-form-container">
              <div className="form-card">
                <h2>Send Message</h2>
                
                {submitStatus === 'success' && (
                  <div className="success-message">
                    <i className="fas fa-check-circle"></i>
                    <p>Thank you! Your message has been sent successfully. I'll get back to you soon.</p>
                  </div>
                )}

                <form onSubmit={handleSubmit} className="contact-form">
                  <div className="form-row">
                    <div className="form-group">
                      <label htmlFor="name">Full Name *</label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                        placeholder="Your full name"
                      />
                    </div>
                    
                    <div className="form-group">
                      <label htmlFor="email">Email Address *</label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                        placeholder="your.email@example.com"
                      />
                    </div>
                  </div>

                  <div className="form-group">
                    <label htmlFor="subject">Subject *</label>
                    <input
                      type="text"
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleInputChange}
                      required
                      placeholder="What's this about?"
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="message">Message *</label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      required
                      rows="6"
                      placeholder="Tell me about your project or just say hello..."
                    ></textarea>
                  </div>

                  <button 
                    type="submit" 
                    className={`submit-btn ${isSubmitting ? 'submitting' : ''}`}
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <>
                        <i className="fas fa-spinner fa-spin"></i>
                        Sending...
                      </>
                    ) : (
                      <>
                        <i className="fas fa-paper-plane"></i>
                        Send Message
                      </>
                    )}
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="faq-section">
        <div className="container">
          <h2 className="section-title">Frequently Asked Questions</h2>
          <div className="faq-grid">
            <div className="faq-item">
              <h3>What's your typical project timeline?</h3>
              <p>
                Project timelines vary based on complexity. Simple websites take 2-3 weeks, 
                while complex web applications can take 2-3 months. I'll provide a detailed 
                timeline after understanding your requirements.
              </p>
            </div>

            <div className="faq-item">
              <h3>Do you work with international clients?</h3>
              <p>
                Yes! I work with clients worldwide. I'm flexible with time zones and 
                use modern communication tools to ensure smooth collaboration regardless 
                of location.
              </p>
            </div>

            <div className="faq-item">
              <h3>What technologies do you specialize in?</h3>
              <p>
                I specialize in React.js, Node.js, MongoDB, and modern JavaScript. 
                I also work with TypeScript, PostgreSQL, AWS, and various other tools 
                based on project needs.
              </p>
            </div>

            <div className="faq-item">
              <h3>Do you provide post-launch support?</h3>
              <p>
                Absolutely! I offer ongoing maintenance, updates, and support packages. 
                I believe in long-term partnerships and ensuring your project continues 
                to perform optimally.
              </p>
            </div>

            <div className="faq-item">
              <h3>What's your payment structure?</h3>
              <p>
                I typically work with a 50% upfront payment and 50% upon completion 
                for smaller projects. For larger projects, we can discuss milestone-based 
                payments that work for both parties.
              </p>
            </div>

            <div className="faq-item">
              <h3>Can you help with existing projects?</h3>
              <p>
                Yes! I can help improve, debug, optimize, or add features to existing 
                projects. I'm experienced in working with legacy code and can adapt 
                to different coding styles and frameworks.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <div className="container">
          <div className="cta-content">
            <h2>Ready to Start Your Project?</h2>
            <p>
              Let's turn your ideas into reality. Get in touch today and let's discuss 
              how we can work together to create something amazing.
            </p>
            <div className="cta-buttons">
              <button className="btn-primary" onClick={() => document.getElementById('name').focus()}>
                Start Project
              </button>
              <a href="/resume" className="btn-secondary">
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
