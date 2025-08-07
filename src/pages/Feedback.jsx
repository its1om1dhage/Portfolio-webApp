import React, { useState, useEffect, useRef } from 'react';
import { experienceData } from '../data/experienceData';
import '../styling/Feedback.css'; 

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
    rating: 5,
    projectGoal: '',
    inspiration: '',
    targetAudience: '',
    preferredContact: 'email',
    urgency: 'normal',
    hasExistingSite: false,
    existingSiteUrl: '',
    designPreference: '',
    features: [],
    additionalInfo: ''
  });
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [hoveredStar, setHoveredStar] = useState(0);
  const [formErrors, setFormErrors] = useState({});
  const [isVisible, setIsVisible] = useState(false);
  const formRef = useRef(null);

  // Enhanced project configurations
  const projectTypes = [
    { 
      id: 'website', 
      name: 'Business Website', 
      icon: '🌐', 
      description: 'Professional business presence online',
      features: ['Responsive Design', 'SEO Optimized', 'Contact Forms'],
      timeframe: '2-4 weeks',
      startingPrice: '$2,500'
    },
    { 
      id: 'ecommerce', 
      name: 'E-commerce Store', 
      icon: '🛒', 
      description: 'Complete online store solution',
      features: ['Payment Integration', 'Inventory Management', 'Admin Dashboard'],
      timeframe: '4-8 weeks',
      startingPrice: '$5,000'
    },
    { 
      id: 'webapp', 
      name: 'Web Application', 
      icon: '💻', 
      description: 'Custom web application development',
      features: ['User Authentication', 'Database Design', 'API Integration'],
      timeframe: '6-12 weeks',
      startingPrice: '$8,000'
    },
    { 
      id: 'portfolio', 
      name: 'Portfolio Site', 
      icon: '🎨', 
      description: 'Showcase your work beautifully',
      features: ['Gallery System', 'Blog Integration', 'Social Links'],
      timeframe: '1-3 weeks',
      startingPrice: '$1,500'
    },
    { 
      id: 'landing', 
      name: 'Landing Page', 
      icon: '🚀', 
      description: 'High-converting single page',
      features: ['A/B Testing Ready', 'Analytics Setup', 'Lead Capture'],
      timeframe: '1-2 weeks',
      startingPrice: '$1,000'
    },
    { 
      id: 'mobile', 
      name: 'Mobile App', 
      icon: '📱', 
      description: 'iOS & Android applications',
      features: ['Cross-platform', 'Push Notifications', 'App Store Ready'],
      timeframe: '8-16 weeks',
      startingPrice: '$12,000'
    }
  ];

  const budgetRanges = [
    { value: 'startup', label: '$1,000 - $3,000', icon: '🌱', description: 'Perfect for startups' },
    { value: 'small', label: '$3,000 - $7,000', icon: '🏢', description: 'Small business focus', popular: true },
    { value: 'medium', label: '$7,000 - $15,000', icon: '📈', description: 'Growing companies', popular: true },
    { value: 'large', label: '$15,000 - $30,000', icon: '🏆', description: 'Enterprise solutions' },
    { value: 'enterprise', label: '$30,000+', icon: '💎', description: 'Large scale projects' },
    { value: 'discuss', label: "Let's Discuss", icon: '💬', description: 'Custom pricing' }
  ];

  const timelineOptions = [
    { value: 'rush', label: 'Rush (1-2 weeks)', icon: '⚡', multiplier: 1.5 },
    { value: 'fast', label: 'Fast (2-4 weeks)', icon: '🏃', multiplier: 1.2 },
    { value: 'standard', label: 'Standard (1-2 months)', icon: '📅', multiplier: 1.0 },
    { value: 'flexible', label: 'Flexible (2-3 months)', icon: '🧘', multiplier: 0.9 },
    { value: 'extended', label: 'Extended (3+ months)', icon: '🐌', multiplier: 0.8 }
  ];

  const designPreferences = [
    { value: 'modern', label: 'Modern & Minimalist', icon: '✨' },
    { value: 'bold', label: 'Bold & Creative', icon: '🎨' },
    { value: 'corporate', label: 'Professional & Corporate', icon: '🏢' },
    { value: 'fun', label: 'Fun & Playful', icon: '🎉' },
    { value: 'elegant', label: 'Elegant & Sophisticated', icon: '💎' },
    { value: 'custom', label: 'Custom Style', icon: '🎭' }
  ];

  const availableFeatures = [
    { id: 'seo', name: 'SEO Optimization', category: 'Marketing' },
    { id: 'analytics', name: 'Analytics Setup', category: 'Marketing' },
    { id: 'cms', name: 'Content Management', category: 'Functionality' },
    { id: 'blog', name: 'Blog System', category: 'Content' },
    { id: 'ecommerce', name: 'E-commerce Integration', category: 'Sales' },
    { id: 'booking', name: 'Booking System', category: 'Functionality' },
    { id: 'multilingual', name: 'Multi-language', category: 'Accessibility' },
    { id: 'social', name: 'Social Media Integration', category: 'Marketing' },
    { id: 'newsletter', name: 'Newsletter Signup', category: 'Marketing' },
    { id: 'live-chat', name: 'Live Chat Support', category: 'Support' },
    { id: 'membership', name: 'User Membership', category: 'Functionality' },
    { id: 'api', name: 'Third-party APIs', category: 'Integration' }
  ];

  // Form validation
  const validateStep = (step) => {
    const errors = {};
    
    if (step === 1) {
      if (!formData.name.trim()) errors.name = 'Name is required';
      if (!formData.email.trim()) errors.email = 'Email is required';
      else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
        errors.email = 'Please enter a valid email address';
      }
      if (!formData.projectType) errors.projectType = 'Please select a project type';
    }
    
    if (step === 2) {
      if (!formData.message.trim()) errors.message = 'Project description is required';
      else if (formData.message.trim().length < 20) {
        errors.message = 'Please provide more details (minimum 20 characters)';
      }
    }
    
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  // Intersection Observer for animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0.1 }
    );

    if (formRef.current) {
      observer.observe(formRef.current);
    }

    return () => observer.disconnect();
  }, []);

  // Auto-save functionality
  useEffect(() => {
    const savedData = localStorage.getItem('portfolioFeedbackForm');
    if (savedData) {
      try {
        setFormData({ ...formData, ...JSON.parse(savedData) });
      } catch (e) {
        console.log('Error loading saved form data');
      }
    }
  }, []);

  useEffect(() => {
    if (formData.name || formData.email || formData.message) {
      localStorage.setItem('portfolioFeedbackForm', JSON.stringify(formData));
    }
  }, [formData]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleFeatureToggle = (featureId) => {
    setFormData(prev => ({
      ...prev,
      features: prev.features.includes(featureId)
        ? prev.features.filter(id => id !== featureId)
        : [...prev.features, featureId]
    }));
  };

  const nextStep = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(prev => Math.min(prev + 1, 3));
    }
  };

  const prevStep = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateStep(currentStep)) return;
    
    setIsSubmitting(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2500));
      
      // Clear saved form data
      localStorage.removeItem('portfolioFeedbackForm');
      
      console.log('Enhanced feedback submitted:', formData);
      setIsSubmitted(true);
      
      // Reset after 10 seconds
      setTimeout(() => {
        setIsSubmitted(false);
        setCurrentStep(1);
        setFormData({
          name: '',
          email: '',
          phone: '',
          company: '',
          projectType: '',
          budget: '',
          timeline: '',
          message: '',
          rating: 5,
          projectGoal: '',
          inspiration: '',
          targetAudience: '',
          preferredContact: 'email',
          urgency: 'normal',
          hasExistingSite: false,
          existingSiteUrl: '',
          designPreference: '',
          features: [],
          additionalInfo: ''
        });
      }, 10000);
      
    } catch (error) {
      console.error('Submission error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleRatingClick = (rating) => {
    setFormData(prev => ({ ...prev, rating }));
  };

  const getRatingLabel = (rating) => {
    const labels = {
      1: 'Needs Work',
      2: 'Fair', 
      3: 'Good',
      4: 'Great',
      5: 'Excellent'
    };
    return labels[rating] || 'Excellent';
  };

  const getSelectedProject = () => {
    return projectTypes.find(p => p.id === formData.projectType);
  };

  const calculateEstimatedCost = () => {
    const project = getSelectedProject();
    if (!project || !formData.timeline) return null;
    
    const timeline = timelineOptions.find(t => t.value === formData.timeline);
    if (!timeline) return null;
    
    const basePrice = parseInt(project.startingPrice.replace(/[$,]/g, ''));
    const finalPrice = Math.round(basePrice * timeline.multiplier);
    
    return {
      base: project.startingPrice,
      final: `$${finalPrice.toLocaleString()}`,
      timeline: timeline.label
    };
  };

  return (
    <div className="feedback-page">
      {/* Enhanced Hero Section */}
      <section className="feedback-hero">
        <div className="hero-background">
          <div className="hero-shapes">
            <div className="shape shape-1"></div>
            <div className="shape shape-2"></div>
            <div className="shape shape-3"></div>
          </div>
        </div>
        <div className="container">
          <div className="hero-content">
            <div className="hero-badge">
              <span className="badge-icon">✨</span>
              <span>Let's Create Something Amazing</span>
            </div>
            <h1 className="hero-title">
              Turn Your <span className="gradient-text">Vision</span> Into 
              <span className="gradient-text"> Digital Reality</span>
            </h1>
            <p className="hero-description">
              Ready to transform your ideas into a stunning digital experience? 
              Let's collaborate to build something extraordinary that drives real results.
            </p>
            <div className="hero-stats">
              <div className="stat-card">
                <div className="stat-number">150+</div>
                <div className="stat-label">Projects Delivered</div>
              </div>
              <div className="stat-card">
                <div className="stat-number">99%</div>
                <div className="stat-label">Client Satisfaction</div>
              </div>
              <div className="stat-card">
                <div className="stat-number">12h</div>
                <div className="stat-label">Avg Response Time</div>
              </div>
              <div className="stat-card">
                <div className="stat-number">5★</div>
                <div className="stat-label">Average Rating</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="feedback-main" ref={formRef}>
        <div className="container">
          <div className="main-grid">
            {/* Enhanced Info Sidebar */}
            <aside className={`info-sidebar ${isVisible ? 'animate-in' : ''}`}>
              <div className="sidebar-sticky">
                <div className="sidebar-section">
                  <h2 className="sidebar-title">Why Work With Me?</h2>
                  <p className="sidebar-description">
                    I bring 5+ years of experience creating digital solutions that not only look 
                    amazing but drive real business results. Here's what sets me apart:
                  </p>
                </div>

                <div className="features-list">
                  <div className="feature-card">
                    <div className="feature-icon">🚀</div>
                    <div className="feature-content">
                      <h3>Fast & Reliable</h3>
                      <p>Lightning-fast delivery without compromising quality</p>
                    </div>
                  </div>
                  <div className="feature-card">
                    <div className="feature-icon">💡</div>
                    <div className="feature-content">
                      <h3>Creative Solutions</h3>
                      <p>Innovative approaches to unique challenges</p>
                    </div>
                  </div>
                  <div className="feature-card">
                    <div className="feature-icon">🎯</div>
                    <div className="feature-content">
                      <h3>Results Focused</h3>
                      <p>Every project designed to achieve your goals</p>
                    </div>
                  </div>
                  <div className="feature-card">
                    <div className="feature-icon">🤝</div>
                    <div className="feature-content">
                      <h3>Collaborative</h3>
                      <p>Working together every step of the way</p>
                    </div>
                  </div>
                </div>

                <div className="contact-quick">
                  <h3>Quick Contact</h3>
                  <div className="contact-methods">
                    <a href={`mailto:${experienceData.personalInfo.email}`} className="contact-method">
                      <span className="method-icon">📧</span>
                      <span className="method-text">{experienceData.personalInfo.email}</span>
                    </a>
                    <a href={`tel:${experienceData.personalInfo.phone}`} className="contact-method">
                      <span className="method-icon">📞</span>
                      <span className="method-text">{experienceData.personalInfo.phone}</span>
                    </a>
                    <div className="contact-method">
                      <span className="method-icon">📍</span>
                      <span className="method-text">{experienceData.personalInfo.location}</span>
                    </div>
                  </div>
                </div>

                <div className="success-proof">
                  <h3>Recent Success</h3>
                  <div className="proof-items">
                    <div className="proof-item">
                      <span className="proof-icon">📈</span>
                      <span>40% avg. conversion increase</span>
                    </div>
                    <div className="proof-item">
                      <span className="proof-icon">⚡</span>
                      <span>95+ PageSpeed scores</span>
                    </div>
                    <div className="proof-item">
                      <span className="proof-icon">🏆</span>
                      <span>Award-winning designs</span>
                    </div>
                  </div>
                </div>
              </div>
            </aside>

            {/* Enhanced Form Section */}
            <main className={`form-main ${isVisible ? 'animate-in' : ''}`}>
              {isSubmitted ? (
                <div className="success-container">
                  <div className="success-animation">
                    <div className="success-checkmark">
                      <div className="check-icon">
                        <span className="icon-line line-tip"></span>
                        <span className="icon-line line-long"></span>
                        <div className="icon-circle"></div>
                        <div className="icon-fix"></div>
                      </div>
                    </div>
                  </div>
                  <div className="success-content">
                    <h2>🎉 Thank You!</h2>
                    <p>Your project inquiry has been received! I'm excited to work with you.</p>
                    <div className="success-details">
                      <div className="success-item">
                        <span className="success-icon">⏰</span>
                        <span>Response within 12 hours</span>
                      </div>
                      <div className="success-item">
                        <span className="success-icon">📋</span>
                        <span>Detailed proposal included</span>
                      </div>
                      <div className="success-item">
                        <span className="success-icon">💬</span>
                        <span>Free consultation call</span>
                      </div>
                    </div>
                    <div className="success-actions">
                      <a href={`mailto:${experienceData.personalInfo.email}`} className="btn btn-primary">
                        Email Me Directly
                      </a>
                      <a href={`tel:${experienceData.personalInfo.phone}`} className="btn btn-secondary">
                        Call Now
                      </a>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="form-container">
                  <div className="form-header">
                    <h2>Tell Me About Your Project</h2>
                    <p>Let's bring your vision to life. The more details you share, the better I can help you succeed.</p>
                    
                    {/* Progress Indicator */}
                    <div className="progress-indicator">
                      <div className="progress-steps">
                        {[1, 2, 3].map((step) => (
                          <div 
                            key={step}
                            className={`progress-step ${currentStep >= step ? 'active' : ''} ${currentStep > step ? 'completed' : ''}`}
                          >
                            <div className="step-circle">
                              {currentStep > step ? '✓' : step}
                            </div>
                            <span className="step-label">
                              {step === 1 ? 'Project Basics' : step === 2 ? 'Details & Goals' : 'Final Touches'}
                            </span>
                          </div>
                        ))}
                      </div>
                      <div className="progress-bar">
                        <div 
                          className="progress-fill"
                          style={{ width: `${(currentStep / 3) * 100}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>

                  <form onSubmit={handleSubmit} className="enhanced-form">
                    {/* Step 1: Project Basics */}
                    {currentStep === 1 && (
                      <div className="form-step step-1">
                        <div className="step-content">
                          <h3 className="step-title">
                            <span className="step-icon">👋</span>
                            Let's Get Started
                          </h3>
                          
                          <div className="form-grid">
                            <div className="form-group">
                              <label htmlFor="name">
                                Full Name *
                                {formErrors.name && <span className="error-message">{formErrors.name}</span>}
                              </label>
                              <input
                                type="text"
                                id="name"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                placeholder="Your full name"
                                className={formErrors.name ? 'error' : ''}
                                required
                              />
                            </div>

                            <div className="form-group">
                              <label htmlFor="email">
                                Email Address *
                                {formErrors.email && <span className="error-message">{formErrors.email}</span>}
                              </label>
                              <input
                                type="email"
                                id="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                placeholder="your@email.com"
                                className={formErrors.email ? 'error' : ''}
                                required
                              />
                            </div>

                            <div className="form-group">
                              <label htmlFor="phone">Phone Number (Optional)</label>
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
                                placeholder="Your company name"
                              />
                            </div>
                          </div>

                          <div className="form-group">
                            <label>
                              What type of project do you need? *
                              {formErrors.projectType && <span className="error-message">{formErrors.projectType}</span>}
                            </label>
                            <div className="project-types-grid">
                              {projectTypes.map((type) => (
                                <div 
                                  key={type.id} 
                                  className={`project-type-card ${formData.projectType === type.id ? 'selected' : ''}`}
                                  onClick={() => setFormData(prev => ({ ...prev, projectType: type.id }))}
                                >
                                  <div className="type-header">
                                    <span className="type-icon">{type.icon}</span>
                                    <h4>{type.name}</h4>
                                  </div>
                                  <p className="type-description">{type.description}</p>
                                  <div className="type-details">
                                    <span className="type-timeframe">⏱️ {type.timeframe}</span>
                                    <span className="type-price">💰 From {type.startingPrice}</span>
                                  </div>
                                  <div className="type-features">
                                    {type.features.slice(0, 2).map((feature, idx) => (
                                      <span key={idx} className="feature-tag">✓ {feature}</span>
                                    ))}
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>

                          <div className="form-actions">
                            <button type="button" onClick={nextStep} className="btn btn-primary btn-next">
                              Continue to Details
                              <span className="btn-arrow">→</span>
                            </button>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Step 2: Details & Goals */}
                    {currentStep === 2 && (
                      <div className="form-step step-2">
                        <div className="step-content">
                          <h3 className="step-title">
                            <span className="step-icon">📋</span>
                            Project Details & Goals
                          </h3>

                          <div className="form-grid">
                            <div className="form-group full-width">
                              <label htmlFor="message">
                                Describe Your Project *
                                {formErrors.message && <span className="error-message">{formErrors.message}</span>}
                              </label>
                              <textarea
                                id="message"
                                name="message"
                                value={formData.message}
                                onChange={handleChange}
                                placeholder="Tell me about your project goals, requirements, features you need, target audience, inspiration, etc. The more details, the better I can help you!"
                                rows="6"
                                className={formErrors.message ? 'error' : ''}
                                required
                              />
                              <div className="character-count">
                                {formData.message.length}/1000 characters
                              </div>
                            </div>

                            <div className="form-group">
                              <label htmlFor="budget">
                                Budget Range *
                                {formErrors.budget && <span className="error-message">{formErrors.budget}</span>}
                              </label>
                              <div className="budget-options">
                                {budgetRanges.map((range) => (
                                  <div 
                                    key={range.id}
                                    className={`budget-option ${formData.budget === range.id ? 'selected' : ''}`}
                                    onClick={() => setFormData(prev => ({ ...prev, budget: range.id }))}
                                  >
                                    <div className="budget-header">
                                      <span className="budget-range">{range.range}</span>
                                      <span className="budget-icon">{range.icon}</span>
                                    </div>
                                    <span className="budget-description">{range.description}</span>
                                  </div>
                                ))}
                              </div>
                            </div>

                            <div className="form-group">
                              <label htmlFor="timeline">
                                Project Timeline *
                                {formErrors.timeline && <span className="error-message">{formErrors.timeline}</span>}
                              </label>
                              <div className="timeline-options">
                                {timelineOptions.map((option) => (
                                  <div 
                                    key={option.id}
                                    className={`timeline-option ${formData.timeline === option.id ? 'selected' : ''}`}
                                    onClick={() => setFormData(prev => ({ ...prev, timeline: option.id }))}
                                  >
                                    <div className="timeline-header">
                                      <span className="timeline-duration">{option.duration}</span>
                                      <span className="timeline-icon">{option.icon}</span>
                                    </div>
                                    <span className="timeline-description">{option.description}</span>
                                  </div>
                                ))}
                              </div>
                            </div>

                            <div className="form-group full-width">
                              <label>Additional Services Needed</label>
                              <div className="services-grid">
                                {additionalServices.map((service) => (
                                  <label key={service.id} className="service-checkbox">
                                    <input
                                      type="checkbox"
                                      checked={formData.additionalServices.includes(service.id)}
                                      onChange={(e) => {
                                        const services = e.target.checked
                                          ? [...formData.additionalServices, service.id]
                                          : formData.additionalServices.filter(s => s !== service.id);
                                        setFormData(prev => ({ ...prev, additionalServices: services }));
                                      }}
                                    />
                                    <div className="service-content">
                                      <span className="service-icon">{service.icon}</span>
                                      <div className="service-info">
                                        <span className="service-name">{service.name}</span>
                                        <span className="service-description">{service.description}</span>
                                      </div>
                                    </div>
                                  </label>
                                ))}
                              </div>
                            </div>
                          </div>

                          <div className="form-actions">
                            <button type="button" onClick={prevStep} className="btn btn-secondary btn-prev">
                              <span className="btn-arrow">←</span>
                              Back
                            </button>
                            <button type="button" onClick={nextStep} className="btn btn-primary btn-next">
                              Continue to Review
                              <span className="btn-arrow">→</span>
                            </button>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Step 3: Final Touches */}
                    {currentStep === 3 && (
                      <div className="form-step step-3">
                        <div className="step-content">
                          <h3 className="step-title">
                            <span className="step-icon">✨</span>
                            Final Touches & Review
                          </h3>

                          <div className="form-grid">
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

                            <div className="form-group full-width">
                              <label htmlFor="additionalInfo">Anything Else You'd Like to Share?</label>
                              <textarea
                                id="additionalInfo"
                                name="additionalInfo"
                                value={formData.additionalInfo}
                                onChange={handleChange}
                                placeholder="Questions, special requirements, inspiration links, or anything else you think would be helpful..."
                                rows="4"
                              />
                            </div>

                            <div className="form-group full-width">
                              <label>Preferred Communication Method</label>
                              <div className="communication-options">
                                {communicationMethods.map((method) => (
                                  <div 
                                    key={method.id}
                                    className={`communication-option ${formData.communicationMethod === method.id ? 'selected' : ''}`}
                                    onClick={() => setFormData(prev => ({ ...prev, communicationMethod: method.id }))}
                                  >
                                    <span className="communication-icon">{method.icon}</span>
                                    <div className="communication-info">
                                      <span className="communication-name">{method.name}</span>
                                      <span className="communication-description">{method.description}</span>
                                    </div>
                                  </div>
                                ))}
                              </div>
                            </div>

                            {/* Project Summary */}
                            <div className="project-summary">
                              <h4>Project Summary</h4>
                              <div className="summary-grid">
                                <div className="summary-item">
                                  <span className="summary-label">Project Type:</span>
                                  <span className="summary-value">
                                    {projectTypes.find(t => t.id === formData.projectType)?.name || 'Not selected'}
                                  </span>
                                </div>
                                <div className="summary-item">
                                  <span className="summary-label">Budget:</span>
                                  <span className="summary-value">
                                    {budgetRanges.find(b => b.id === formData.budget)?.range || 'Not selected'}
                                  </span>
                                </div>
                                <div className="summary-item">
                                  <span className="summary-label">Timeline:</span>
                                  <span className="summary-value">
                                    {timelineOptions.find(t => t.id === formData.timeline)?.duration || 'Not selected'}
                                  </span>
                                </div>
                                <div className="summary-item">
                                  <span className="summary-label">Additional Services:</span>
                                  <span className="summary-value">
                                    {formData.additionalServices.length > 0 
                                      ? formData.additionalServices.map(id => 
                                          additionalServices.find(s => s.id === id)?.name
                                        ).join(', ')
                                      : 'None selected'
                                    }
                                  </span>
                                </div>
                              </div>
                            </div>
                          </div>

                          <div className="form-actions">
                            <button type="button" onClick={prevStep} className="btn btn-secondary btn-prev">
                              <span className="btn-arrow">←</span>
                              Back
                            </button>
                            <button
                              type="submit"
                              className={`btn btn-primary btn-submit ${isSubmitting ? 'submitting' : ''}`}
                              disabled={isSubmitting}
                            >
                              {isSubmitting ? (
                                <>
                                  <div className="spinner"></div>
                                  Submitting Project...
                                </>
                              ) : (
                                <>
                                  <span className="submit-icon">🚀</span>
                                  Send Project Details
                                </>
                              )}
                            </button>
                          </div>
                        </div>
                      </div>
                    )}
                  </form>
                </div>
              )}
            </main>
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
