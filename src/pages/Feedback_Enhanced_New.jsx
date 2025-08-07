import React, { useState, useEffect, useRef } from 'react';
import { experienceData } from '../data/experienceData';
import '../styling/Feedback_Enhanced_Best.css'; 

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
    urgency: 'normal',
    communicationPreference: 'email',
    hasExistingWebsite: false,
    websiteUrl: '',
    projectFeatures: [],
    referralSource: '',
    additionalFiles: null
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [hoveredStar, setHoveredStar] = useState(0);
  const [formErrors, setFormErrors] = useState({});
  const [currentStep, setCurrentStep] = useState(1);
  const [isFormValid, setIsFormValid] = useState(false);
  const formRef = useRef(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  // Enhanced project type options with icons and descriptions
  const projectTypes = [
    { 
      id: "website", 
      name: "Website Development", 
      icon: "fas fa-globe", 
      description: "Custom websites and portfolios",
      estimatedTime: "2-4 weeks"
    },
    { 
      id: "ecommerce", 
      name: "E-commerce Platform", 
      icon: "fas fa-shopping-cart", 
      description: "Online stores and marketplaces",
      estimatedTime: "4-8 weeks"
    },
    { 
      id: "webapp", 
      name: "Web Application", 
      icon: "fas fa-laptop-code", 
      description: "Complex web applications",
      estimatedTime: "6-12 weeks"
    },
    { 
      id: "mobile", 
      name: "Mobile App", 
      icon: "fas fa-mobile-alt", 
      description: "iOS and Android applications",
      estimatedTime: "8-16 weeks"
    },
    { 
      id: "uiux", 
      name: "UI/UX Design", 
      icon: "fas fa-palette", 
      description: "User interface and experience design",
      estimatedTime: "1-3 weeks"
    },
    { 
      id: "api", 
      name: "API Development", 
      icon: "fas fa-code", 
      description: "Backend APIs and integrations",
      estimatedTime: "2-6 weeks"
    },
    { 
      id: "database", 
      name: "Database Design", 
      icon: "fas fa-database", 
      description: "Database architecture and optimization",
      estimatedTime: "1-2 weeks"
    },
    { 
      id: "custom", 
      name: "Custom Solution", 
      icon: "fas fa-cogs", 
      description: "Tailored technical solutions",
      estimatedTime: "Varies"
    },
    { 
      id: "other", 
      name: "Other", 
      icon: "fas fa-question-circle", 
      description: "Tell us about your unique project",
      estimatedTime: "TBD"
    }
  ];

  // Enhanced budget ranges with value indicators
  const budgetRanges = [
    { value: "under-1k", label: "Under $1,000", description: "Small projects & MVPs", popular: false },
    { value: "1k-5k", label: "$1,000 - $5,000", description: "Medium complexity", popular: true },
    { value: "5k-10k", label: "$5,000 - $10,000", description: "Advanced features", popular: true },
    { value: "10k-25k", label: "$10,000 - $25,000", description: "Enterprise solutions", popular: false },
    { value: "25k-plus", label: "$25,000+", description: "Large scale projects", popular: false },
    { value: "discuss", label: "Let's Discuss", description: "Custom pricing", popular: false }
  ];

  // Timeline options with urgency indicators
  const timelineOptions = [
    { value: "asap", label: "ASAP", urgency: "high", icon: "fas fa-bolt" },
    { value: "1-2weeks", label: "1-2 weeks", urgency: "high", icon: "fas fa-clock" },
    { value: "1month", label: "1 month", urgency: "medium", icon: "fas fa-calendar-alt" },
    { value: "2-3months", label: "2-3 months", urgency: "medium", icon: "fas fa-calendar" },
    { value: "3plus", label: "3+ months", urgency: "low", icon: "fas fa-calendar-plus" },
    { value: "flexible", label: "Flexible", urgency: "low", icon: "fas fa-hand-paper" }
  ];

  // Project features checklist
  const projectFeatures = [
    { id: "responsive", label: "Responsive Design", category: "design" },
    { id: "cms", label: "Content Management", category: "functionality" },
    { id: "ecommerce", label: "E-commerce Integration", category: "functionality" },
    { id: "auth", label: "User Authentication", category: "functionality" },
    { id: "analytics", label: "Analytics Integration", category: "marketing" },
    { id: "seo", label: "SEO Optimization", category: "marketing" },
    { id: "multilingual", label: "Multi-language Support", category: "functionality" },
    { id: "api", label: "Third-party Integrations", category: "functionality" },
    { id: "hosting", label: "Hosting & Deployment", category: "technical" },
    { id: "maintenance", label: "Ongoing Maintenance", category: "technical" }
  ];

  // Communication preferences
  const communicationOptions = [
    { value: "email", label: "Email", icon: "fas fa-envelope" },
    { value: "phone", label: "Phone", icon: "fas fa-phone" },
    { value: "video", label: "Video Call", icon: "fas fa-video" },
    { value: "slack", label: "Slack", icon: "fab fa-slack" },
    { value: "whatsapp", label: "WhatsApp", icon: "fab fa-whatsapp" }
  ];

  // Referral sources
  const referralSources = [
    "Google Search", "Social Media", "LinkedIn", "GitHub", "Portfolio Website", 
    "Word of Mouth", "Previous Client", "Job Board", "Conference/Event", "Other"
  ];

  // Enhanced form validation
  const validateForm = () => {
    const errors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;

    if (!formData.name.trim()) errors.name = "Name is required";
    if (!formData.email.trim()) {
      errors.email = "Email is required";
    } else if (!emailRegex.test(formData.email)) {
      errors.email = "Please enter a valid email address";
    }
    if (formData.phone && !phoneRegex.test(formData.phone.replace(/\s/g, ''))) {
      errors.phone = "Please enter a valid phone number";
    }
    if (!formData.projectType) errors.projectType = "Please select a project type";
    if (!formData.message.trim()) {
      errors.message = "Project details are required";
    } else if (formData.message.trim().length < 50) {
      errors.message = "Please provide more details (at least 50 characters)";
    }

    setFormErrors(errors);
    setIsFormValid(Object.keys(errors).length === 0);
    return Object.keys(errors).length === 0;
  };

  // Real-time validation
  useEffect(() => {
    validateForm();
  }, [formData]);

  // Scroll progress tracking
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.pageYOffset;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollPercent = (scrollTop / docHeight) * 100;
      setScrollProgress(scrollPercent);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Auto-save to localStorage
  useEffect(() => {
    const savedData = localStorage.getItem('feedbackFormData');
    if (savedData) {
      setFormData({ ...formData, ...JSON.parse(savedData) });
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('feedbackFormData', JSON.stringify(formData));
  }, [formData]);

  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : type === 'file' ? files[0] : value
    }));
  };

  const handleFeatureToggle = (featureId) => {
    setFormData(prev => ({
      ...prev,
      projectFeatures: prev.projectFeatures.includes(featureId)
        ? prev.projectFeatures.filter(id => id !== featureId)
        : [...prev.projectFeatures, featureId]
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      // Scroll to first error
      const firstError = Object.keys(formErrors)[0];
      const errorElement = document.querySelector(`[name="${firstError}"]`);
      if (errorElement) {
        errorElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
        errorElement.focus();
      }
      return;
    }

    setIsSubmitting(true);
    
    try {
      // Enhanced submission with better error handling
      await new Promise(resolve => setTimeout(resolve, 3000));
      
      // Send to analytics
      if (typeof gtag !== 'undefined') {
        gtag('event', 'form_submit', {
          event_category: 'engagement',
          event_label: 'feedback_form',
          value: 1
        });
      }
      
      console.log('Submitted feedback:', formData);
      setIsSubmitted(true);
      
      // Clear localStorage
      localStorage.removeItem('feedbackFormData');
      
      // Reset form after success message
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
          rating: 5,
          urgency: 'normal',
          communicationPreference: 'email',
          hasExistingWebsite: false,
          websiteUrl: '',
          projectFeatures: [],
          referralSource: '',
          additionalFiles: null
        });
        setCurrentStep(1);
      }, 8000);
    } catch (error) {
      console.error('Submission error:', error);
      // Handle error state here
    } finally {
      setIsSubmitting(false);
    }
  };

  const nextStep = () => {
    if (currentStep < 3) setCurrentStep(currentStep + 1);
  };

  const prevStep = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1);
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
      {/* Progress Bar */}
      <div className="progress-bar">
        <div 
          className="progress-fill" 
          style={{ width: `${scrollProgress}%` }}
        ></div>
      </div>

      {/* Hero Section */}
      <section className="feedback-hero">
        <div className="container">
          <div className="hero-content">
            <div className="hero-badge">
              <i className="fas fa-rocket"></i>
              <span>Let's Build Something Amazing</span>
            </div>
            <h1 className="hero-title">
              Transform Your <span className="highlight-text">Vision</span> Into Reality
            </h1>
            <p className="hero-description">
              Ready to bring your ideas to life? I specialize in creating exceptional digital experiences 
              that drive results. Let's discuss your project and make it happen together.
            </p>
            <div className="hero-stats">
              <div className="stat-item">
                <span className="stat-number">50+</span>
                <span className="stat-label">Projects Delivered</span>
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

      {/* Main Content */}
      <section className="feedback-content">
        <div className="container">
          <div className="content-grid">
            {/* Info Section */}
            <div className="feedback-info">
              <div className="info-sticky">
                <h2>Why Choose Me?</h2>
                <p>
                  With over 5 years of experience and 50+ successful projects, I bring expertise, 
                  creativity, and dedication to every collaboration. Here's what sets me apart:
                </p>
                
                <div className="feedback-features">
                  <div className="feature-item">
                    <div className="feature-icon">
                      <i className="fas fa-lightbulb"></i>
                    </div>
                    <div className="feature-content">
                      <h3>Innovative Solutions</h3>
                      <p>Creative approaches using cutting-edge technologies to solve complex problems</p>
                    </div>
                  </div>
                  <div className="feature-item">
                    <div className="feature-icon">
                      <i className="fas fa-rocket"></i>
                    </div>
                    <div className="feature-content">
                      <h3>Fast & Reliable</h3>
                      <p>Quick turnaround times without compromising on quality or attention to detail</p>
                    </div>
                  </div>
                  <div className="feature-item">
                    <div className="feature-icon">
                      <i className="fas fa-handshake"></i>
                    </div>
                    <div className="feature-content">
                      <h3>Collaborative Process</h3>
                      <p>Working closely with you at every step to ensure your vision comes to life</p>
                    </div>
                  </div>
                  <div className="feature-item">
                    <div className="feature-icon">
                      <i className="fas fa-shield-alt"></i>
                    </div>
                    <div className="feature-content">
                      <h3>Quality Assurance</h3>
                      <p>Rigorous testing and optimization for performance, security, and scalability</p>
                    </div>
                  </div>
                </div>

                <div className="contact-info">
                  <h3>Let's Connect</h3>
                  <div className="contact-methods">
                    <div className="contact-item">
                      <i className="fas fa-envelope"></i>
                      <div>
                        <span className="contact-label">Email</span>
                        <span className="contact-value">{experienceData.personalInfo.email}</span>
                      </div>
                    </div>
                    <div className="contact-item">
                      <i className="fas fa-phone"></i>
                      <div>
                        <span className="contact-label">Phone</span>
                        <span className="contact-value">{experienceData.personalInfo.phone}</span>
                      </div>
                    </div>
                    <div className="contact-item">
                      <i className="fas fa-map-marker-alt"></i>
                      <div>
                        <span className="contact-label">Location</span>
                        <span className="contact-value">{experienceData.personalInfo.location}</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="social-proof">
                  <h3>Recent Success</h3>
                  <div className="success-metrics">
                    <div className="metric">
                      <i className="fas fa-chart-line"></i>
                      <span>40% avg. performance improvement</span>
                    </div>
                    <div className="metric">
                      <i className="fas fa-users"></i>
                      <span>100K+ users impacted</span>
                    </div>
                    <div className="metric">
                      <i className="fas fa-award"></i>
                      <span>5-star average rating</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Enhanced Project Form */}
            <div className="feedback-form-section">
              {isSubmitted && (
                <div className="success-message">
                  <div className="success-icon">
                    <i className="fas fa-check-circle"></i>
                  </div>
                  <div className="success-content">
                    <h3>Thank You for Your Inquiry!</h3>
                    <p>I've received your project details and I'm excited to work with you. You'll hear back from me within 24 hours with:</p>
                    <ul>
                      <li>Initial project assessment</li>
                      <li>Timeline and milestone breakdown</li>
                      <li>Next steps for collaboration</li>
                    </ul>
                    <div className="success-actions">
                      <a href={`mailto:${experienceData.personalInfo.email}`} className="btn-secondary">
                        <i className="fas fa-envelope"></i>
                        Email Me Directly
                      </a>
                    </div>
                  </div>
                </div>
              )}

              {!isSubmitted && (
                <div className="form-container">
                  <div className="form-header">
                    <h2>Tell Me About Your Project</h2>
                    <p>The more details you provide, the better I can tailor my proposal to your needs.</p>
                    
                    {/* Multi-step Progress */}
                    <div className="form-progress">
                      <div className="progress-steps">
                        {[1, 2, 3].map((step) => (
                          <div 
                            key={step}
                            className={`progress-step ${currentStep >= step ? 'active' : ''} ${currentStep > step ? 'completed' : ''}`}
                          >
                            <span className="step-number">{step}</span>
                            <span className="step-label">
                              {step === 1 ? 'Basic Info' : step === 2 ? 'Project Details' : 'Preferences'}
                            </span>
                          </div>
                        ))}
                      </div>
                      <div className="progress-bar-container">
                        <div 
                          className="form-progress-bar"
                          style={{ width: `${(currentStep / 3) * 100}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>

                  <form onSubmit={handleSubmit} className="feedback-form" ref={formRef}>
                    {/* Step 1: Basic Information */}
                    {currentStep === 1 && (
                      <div className="form-step active">
                        <div className="form-section">
                          <div className="section-header">
                            <h3><i className="fas fa-user"></i> Contact Information</h3>
                            <p>Let's start with the basics so I can reach out to you</p>
                          </div>
                          
                          <div className="form-row">
                            <div className="form-group">
                              <label htmlFor="name">
                                Full Name *
                                {formErrors.name && <span className="error-text">{formErrors.name}</span>}
                              </label>
                              <input
                                type="text"
                                id="name"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                required
                                placeholder="Enter your full name"
                                className={formErrors.name ? 'error' : ''}
                                aria-describedby={formErrors.name ? 'name-error' : undefined}
                              />
                            </div>
                            <div className="form-group">
                              <label htmlFor="email">
                                Email Address *
                                {formErrors.email && <span className="error-text">{formErrors.email}</span>}
                              </label>
                              <input
                                type="email"
                                id="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                required
                                placeholder="your@email.com"
                                className={formErrors.email ? 'error' : ''}
                                aria-describedby={formErrors.email ? 'email-error' : undefined}
                              />
                            </div>
                          </div>

                          <div className="form-row">
                            <div className="form-group">
                              <label htmlFor="phone">
                                Phone Number
                                {formErrors.phone && <span className="error-text">{formErrors.phone}</span>}
                              </label>
                              <input
                                type="tel"
                                id="phone"
                                name="phone"
                                value={formData.phone}
                                onChange={handleChange}
                                placeholder="+1 (555) 123-4567"
                                className={formErrors.phone ? 'error' : ''}
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

                          <div className="form-group">
                            <label htmlFor="referralSource">How did you find me?</label>
                            <select
                              id="referralSource"
                              name="referralSource"
                              value={formData.referralSource}
                              onChange={handleChange}
                            >
                              <option value="">Select source</option>
                              {referralSources.map((source, index) => (
                                <option key={index} value={source}>{source}</option>
                              ))}
                            </select>
                          </div>
                        </div>

                        <div className="form-actions">
                          <button type="button" onClick={nextStep} className="btn-primary next-btn">
                            Continue <i className="fas fa-arrow-right"></i>
                          </button>
                        </div>
                      </div>
                    )}

                    {/* Step 2: Project Details */}
                    {currentStep === 2 && (
                      <div className="form-step active">
                        <div className="form-section">
                          <div className="section-header">
                            <h3><i className="fas fa-project-diagram"></i> Project Details</h3>
                            <p>Help me understand what you're looking to build</p>
                          </div>

                          <div className="form-group">
                            <label>
                              Project Type *
                              {formErrors.projectType && <span className="error-text">{formErrors.projectType}</span>}
                            </label>
                            <div className="project-type-grid">
                              {projectTypes.map((type) => (
                                <div key={type.id} className="project-type-option">
                                  <input
                                    type="radio"
                                    id={type.id}
                                    name="projectType"
                                    value={type.id}
                                    checked={formData.projectType === type.id}
                                    onChange={handleChange}
                                  />
                                  <label htmlFor={type.id}>
                                    <i className={type.icon}></i>
                                    <span className="type-name">{type.name}</span>
                                    <span className="type-description">{type.description}</span>
                                    <span className="type-time">{type.estimatedTime}</span>
                                  </label>
                                </div>
                              ))}
                            </div>
                          </div>

                          <div className="form-row">
                            <div className="form-group">
                              <label>Budget Range</label>
                              <div className="budget-options">
                                {budgetRanges.map((budget) => (
                                  <div key={budget.value} className="budget-option">
                                    <input
                                      type="radio"
                                      id={budget.value}
                                      name="budget"
                                      value={budget.value}
                                      checked={formData.budget === budget.value}
                                      onChange={handleChange}
                                    />
                                    <label htmlFor={budget.value}>
                                      <span className="budget-label">{budget.label}</span>
                                      <span className="budget-description">{budget.description}</span>
                                      {budget.popular && <span className="popular-badge">Popular</span>}
                                    </label>
                                  </div>
                                ))}
                              </div>
                            </div>
                            <div className="form-group">
                              <label>Timeline</label>
                              <div className="timeline-options">
                                {timelineOptions.map((option) => (
                                  <div key={option.value} className="timeline-option">
                                    <input
                                      type="radio"
                                      id={option.value}
                                      name="timeline"
                                      value={option.value}
                                      checked={formData.timeline === option.value}
                                      onChange={handleChange}
                                    />
                                    <label htmlFor={option.value}>
                                      <i className={option.icon}></i>
                                      <span>{option.label}</span>
                                      <span className={`urgency ${option.urgency}`}>{option.urgency}</span>
                                    </label>
                                  </div>
                                ))}
                              </div>
                            </div>
                          </div>

                          <div className="form-group">
                            <label>
                              Project Description *
                              {formErrors.message && <span className="error-text">{formErrors.message}</span>}
                            </label>
                            <div className="textarea-container">
                              <textarea
                                id="message"
                                name="message"
                                value={formData.message}
                                onChange={handleChange}
                                required
                                rows="6"
                                placeholder="Describe your project goals, key features, target audience, and any specific requirements. The more details, the better I can help!"
                                className={formErrors.message ? 'error' : ''}
                              ></textarea>
                              <div className="character-count">
                                <span className={formData.message.length < 50 ? 'warning' : 'good'}>
                                  {formData.message.length}/50 minimum
                                </span>
                              </div>
                            </div>
                          </div>

                          <div className="form-group">
                            <label>Desired Features (Select all that apply)</label>
                            <div className="features-grid">
                              {projectFeatures.map((feature) => (
                                <div key={feature.id} className="feature-checkbox">
                                  <input
                                    type="checkbox"
                                    id={feature.id}
                                    checked={formData.projectFeatures.includes(feature.id)}
                                    onChange={() => handleFeatureToggle(feature.id)}
                                  />
                                  <label htmlFor={feature.id}>
                                    <span className="checkbox-custom"></span>
                                    <span className="feature-label">{feature.label}</span>
                                    <span className="feature-category">{feature.category}</span>
                                  </label>
                                </div>
                              ))}
                            </div>
                          </div>

                          <div className="existing-website-section">
                            <label className="checkbox-label">
                              <input
                                type="checkbox"
                                name="hasExistingWebsite"
                                checked={formData.hasExistingWebsite}
                                onChange={handleChange}
                              />
                              <span className="checkbox-custom"></span>
                              I have an existing website
                            </label>
                            {formData.hasExistingWebsite && (
                              <div className="form-group">
                                <label htmlFor="websiteUrl">Current Website URL</label>
                                <input
                                  type="url"
                                  id="websiteUrl"
                                  name="websiteUrl"
                                  value={formData.websiteUrl}
                                  onChange={handleChange}
                                  placeholder="https://yourwebsite.com"
                                />
                              </div>
                            )}
                          </div>
                        </div>

                        <div className="form-actions">
                          <button type="button" onClick={prevStep} className="btn-secondary">
                            <i className="fas fa-arrow-left"></i> Back
                          </button>
                          <button type="button" onClick={nextStep} className="btn-primary">
                            Continue <i className="fas fa-arrow-right"></i>
                          </button>
                        </div>
                      </div>
                    )}

                    {/* Step 3: Preferences & Submit */}
                    {currentStep === 3 && (
                      <div className="form-step active">
                        <div className="form-section">
                          <div className="section-header">
                            <h3><i className="fas fa-cog"></i> Preferences & Rating</h3>
                            <p>Final details to help me serve you better</p>
                          </div>

                          <div className="form-group">
                            <label>Preferred Communication Method</label>
                            <div className="communication-options">
                              {communicationOptions.map((option) => (
                                <div key={option.value} className="communication-option">
                                  <input
                                    type="radio"
                                    id={option.value}
                                    name="communicationPreference"
                                    value={option.value}
                                    checked={formData.communicationPreference === option.value}
                                    onChange={handleChange}
                                  />
                                  <label htmlFor={option.value}>
                                    <i className={option.icon}></i>
                                    <span>{option.label}</span>
                                  </label>
                                </div>
                              ))}
                            </div>
                          </div>

                          <div className="form-group">
                            <label>Project Urgency</label>
                            <div className="urgency-options">
                              <div className="urgency-option">
                                <input
                                  type="radio"
                                  id="low-urgency"
                                  name="urgency"
                                  value="low"
                                  checked={formData.urgency === 'low'}
                                  onChange={handleChange}
                                />
                                <label htmlFor="low-urgency">
                                  <i className="fas fa-leaf"></i>
                                  <span>Low Priority</span>
                                  <small>No rush, quality first</small>
                                </label>
                              </div>
                              <div className="urgency-option">
                                <input
                                  type="radio"
                                  id="normal-urgency"
                                  name="urgency"
                                  value="normal"
                                  checked={formData.urgency === 'normal'}
                                  onChange={handleChange}
                                />
                                <label htmlFor="normal-urgency">
                                  <i className="fas fa-clock"></i>
                                  <span>Normal</span>
                                  <small>Standard timeline</small>
                                </label>
                              </div>
                              <div className="urgency-option">
                                <input
                                  type="radio"
                                  id="high-urgency"
                                  name="urgency"
                                  value="high"
                                  checked={formData.urgency === 'high'}
                                  onChange={handleChange}
                                />
                                <label htmlFor="high-urgency">
                                  <i className="fas fa-bolt"></i>
                                  <span>High Priority</span>
                                  <small>Expedited delivery</small>
                                </label>
                              </div>
                            </div>
                          </div>

                          <div className="form-group">
                            <label>Additional Files (Optional)</label>
                            <div className="file-upload">
                              <input
                                type="file"
                                id="additionalFiles"
                                name="additionalFiles"
                                onChange={handleChange}
                                accept=".pdf,.doc,.docx,.jpg,.jpeg,.png,.zip"
                                multiple
                              />
                              <label htmlFor="additionalFiles" className="file-upload-label">
                                <i className="fas fa-cloud-upload-alt"></i>
                                <span>Upload project files, wireframes, or references</span>
                                <small>PDF, DOC, Images, ZIP files (Max 10MB each)</small>
                              </label>
                            </div>
                          </div>

                          <div className="form-group">
                            <label>How would you rate your experience so far?</label>
                            <div className="rating-container">
                              <div className="star-rating">
                                {[1, 2, 3, 4, 5].map((star) => (
                                  <button
                                    key={star}
                                    type="button"
                                    className={`star ${star <= (hoveredStar || formData.rating) ? 'active' : ''}`}
                                    onClick={() => handleRatingClick(star)}
                                    onMouseEnter={() => setHoveredStar(star)}
                                    onMouseLeave={() => setHoveredStar(0)}
                                    aria-label={`Rate ${star} star${star > 1 ? 's' : ''}`}
                                  >
                                    <i className="fas fa-star"></i>
                                  </button>
                                ))}
                              </div>
                              <span className="rating-label">
                                {getRatingLabel(hoveredStar || formData.rating)}
                              </span>
                            </div>
                          </div>
                        </div>

                        <div className="form-actions">
                          <button type="button" onClick={prevStep} className="btn-secondary">
                            <i className="fas fa-arrow-left"></i> Back
                          </button>
                          <button
                            type="submit"
                            className={`btn-primary submit-btn ${isSubmitting ? 'submitting' : ''} ${!isFormValid ? 'disabled' : ''}`}
                            disabled={isSubmitting || !isFormValid}
                          >
                            {isSubmitting ? (
                              <>
                                <div className="spinner"></div>
                                Sending Project Details...
                              </>
                            ) : (
                              <>
                                <i className="fas fa-paper-plane"></i>
                                Send Project Details
                              </>
                            )}
                          </button>
                        </div>
                      </div>
                    )}
                  </form>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced Testimonials Section */}
      <section className="testimonials-section">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">What Clients Say</h2>
            <p className="section-subtitle">
              Don't just take my word for it. Here's what clients say about working with me.
            </p>
          </div>
          
          <div className="testimonials-carousel">
            <div className="testimonials-grid">
              {experienceData.testimonials.slice(0, 6).map((testimonial, index) => (
                <div key={index} className="testimonial-card">
                  <div className="testimonial-header">
                    <div className="testimonial-rating">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <i key={i} className="fas fa-star"></i>
                      ))}
                    </div>
                    <div className="testimonial-context">
                      <span>{testimonial.projectContext}</span>
                    </div>
                  </div>
                  <div className="testimonial-content">
                    <p>"{testimonial.text}"</p>
                  </div>
                  <div className="testimonial-author">
                    <div className="author-avatar">
                      <img src={testimonial.image} alt={testimonial.name} loading="lazy" />
                    </div>
                    <div className="author-info">
                      <h4>{testimonial.name}</h4>
                      <p>{testimonial.position}</p>
                      <span className="author-company">{testimonial.company}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced CTA Section */}
      <section className="feedback-cta">
        <div className="container">
          <div className="cta-content">
            <div className="cta-badge">
              <i className="fas fa-sparkles"></i>
              <span>Ready to Get Started?</span>
            </div>
            <h2>Let's Build Something Extraordinary</h2>
            <p>
              Join 50+ satisfied clients who transformed their ideas into reality. 
              Your project deserves the best – let's make it happen together.
            </p>
            
            <div className="cta-features">
              <div className="cta-feature">
                <i className="fas fa-check"></i>
                <span>Free consultation & project assessment</span>
              </div>
              <div className="cta-feature">
                <i className="fas fa-check"></i>
                <span>Detailed proposal within 24 hours</span>
              </div>
              <div className="cta-feature">
                <i className="fas fa-check"></i>
                <span>Transparent pricing & timeline</span>
              </div>
            </div>

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
              <div className="stat-item">
                <span className="stat-number">5+</span>
                <span className="stat-label">Years Experience</span>
              </div>
            </div>

            <div className="cta-actions">
              <a href="#form" className="btn-primary cta-btn">
                <i className="fas fa-rocket"></i>
                Start Your Project
              </a>
              <a href={`mailto:${experienceData.personalInfo.email}`} className="btn-secondary">
                <i className="fas fa-envelope"></i>
                Email Directly
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="faq-section">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Frequently Asked Questions</h2>
            <p className="section-subtitle">
              Common questions about working together and the development process.
            </p>
          </div>
          
          <div className="faq-grid">
            <div className="faq-item">
              <h3>How long does a typical project take?</h3>
              <p>Project timelines vary based on complexity. Simple websites take 2-4 weeks, while complex applications can take 2-6 months. I'll provide a detailed timeline in my proposal.</p>
            </div>
            <div className="faq-item">
              <h3>What's included in your service?</h3>
              <p>Full development cycle: planning, design, development, testing, deployment, and 30 days of post-launch support. I also provide documentation and training.</p>
            </div>
            <div className="faq-item">
              <h3>Do you work with startups?</h3>
              <p>Absolutely! I love helping startups bring their ideas to life. I offer flexible pricing options and can work within startup budgets.</p>
            </div>
            <div className="faq-item">
              <h3>What technologies do you use?</h3>
              <p>I specialize in modern web technologies: React, Node.js, Next.js, TypeScript, Python, and cloud platforms like AWS. I choose the best tech stack for your needs.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Feedback;
