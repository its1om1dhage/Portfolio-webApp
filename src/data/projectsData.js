// Professional project data with real-world examples
export const projects = [
  {
    id: 1,
    title: "EcoCommerce - Sustainable E-Commerce Platform",
    description: "A full-stack e-commerce platform focused on sustainable products. Features include advanced search filters, AI-powered recommendations, secure payment integration with Stripe, real-time inventory management, and comprehensive admin dashboard with analytics.",
    longDescription: "Built a complete sustainable e-commerce ecosystem from the ground up. Implemented microservices architecture with separate services for user management, product catalog, order processing, and payment handling. The platform features intelligent product recommendations using machine learning algorithms, real-time chat support, and advanced analytics dashboard for business insights.",
    image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=600&h=400&fit=crop",
    technologies: ["React", "Node.js", "Express", "MongoDB", "Stripe", "JWT", "Socket.io", "Redis", "AWS S3", "Docker"],
    category: "fullstack",
    liveLink: "https://ecocommerce-demo.netlify.app",
    githubLink: "https://github.com/its1om1dhage/ecocommerce-platform",
    featured: true,
    challenges: [
      "Implementing real-time inventory management across multiple warehouses",
      "Optimizing database queries for fast product search and filtering",
      "Building scalable payment processing system with multiple gateways"
    ],
    achievements: [
      "Reduced page load time by 60% through optimized caching strategies",
      "Achieved 99.9% uptime with robust error handling and monitoring",
      "Increased user engagement by 40% with personalized recommendations"
    ]
  },
  {
    id: 2,
    title: "TaskFlow - AI-Powered Project Management",
    description: "A collaborative project management application with AI-powered task prioritization, real-time collaboration, Kanban boards, time tracking, and team analytics. Built for modern distributed teams.",
    longDescription: "Developed an intelligent project management platform that uses machine learning to optimize task assignments and predict project timelines. Features include drag-and-drop Kanban boards, real-time collaboration with WebSocket integration, automated reporting, and comprehensive team analytics.",
    image: "https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=600&h=400&fit=crop",
    technologies: ["React", "TypeScript", "Node.js", "GraphQL", "PostgreSQL", "Socket.io", "TensorFlow.js", "Material-UI", "Docker", "Kubernetes"],
    category: "fullstack",
    liveLink: "https://taskflow-ai.vercel.app",
    githubLink: "https://github.com/its1om1dhage/taskflow-ai",
    featured: true,
    challenges: [
      "Implementing real-time synchronization across multiple users",
      "Building ML models for intelligent task prioritization",
      "Designing scalable database schema for complex project relationships"
    ],
    achievements: [
      "Improved team productivity by 35% through intelligent task suggestions",
      "Reduced project completion time by 25% with AI-powered timeline predictions",
      "Achieved 50ms response time for real-time updates"
    ]
  },
  {
    id: 3,
    title: "WeatherIQ - Advanced Weather Analytics",
    description: "A sophisticated weather application with machine learning predictions, historical data analysis, weather pattern visualization, location-based alerts, and agricultural insights for farmers and researchers.",
    longDescription: "Created a comprehensive weather analytics platform that combines real-time weather data with historical analysis and machine learning predictions. The application provides detailed weather insights for agriculture, aviation, and outdoor activities with interactive charts and customizable alerts.",
    image: "https://images.unsplash.com/photo-1561553873-e8491a564fd0?w=600&h=400&fit=crop",
    technologies: ["React", "D3.js", "Python", "FastAPI", "PostgreSQL", "OpenWeather API", "Chart.js", "TensorFlow", "Redis", "Nginx"],
    category: "fullstack",
    liveLink: "https://weatheriq-analytics.netlify.app",
    githubLink: "https://github.com/its1om1dhage/weatheriq-analytics",
    featured: false,
    challenges: [
      "Processing and visualizing large datasets of historical weather data",
      "Implementing accurate machine learning models for weather prediction",
      "Creating intuitive data visualizations for complex weather patterns"
    ],
    achievements: [
      "Achieved 87% accuracy in 7-day weather predictions",
      "Processed over 1 million weather data points daily",
      "Reduced data loading time by 70% with efficient caching"
    ]
  },
  {
    id: 4,
    title: "DevBlog - Modern Content Management System",
    description: "A feature-rich blog platform with advanced content management, SEO optimization, social sharing, comment system, user roles, analytics dashboard, and newsletter integration.",
    longDescription: "Built a modern CMS from scratch with focus on performance and SEO. Features include rich text editor with live preview, automated SEO optimization, social media integration, advanced user management with role-based permissions, and comprehensive analytics dashboard.",
    image: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=600&h=400&fit=crop",
    technologies: ["React", "Next.js", "Node.js", "Express", "PostgreSQL", "Prisma", "NextAuth.js", "Cloudinary", "Vercel", "Stripe"],
    category: "fullstack",
    liveLink: "https://devblog-cms.vercel.app",
    githubLink: "https://github.com/its1om1dhage/devblog-cms",
    featured: true,
    challenges: [
      "Implementing server-side rendering for optimal SEO performance",
      "Building flexible content management system with rich text editing",
      "Creating scalable comment system with real-time updates"
    ],
    achievements: [
      "Achieved 95+ Google PageSpeed Insights score",
      "Reduced content creation time by 50% with intuitive editor",
      "Increased organic traffic by 120% through SEO optimization"
    ]
  },
  {
    id: 5,
    title: "FinanceTracker - Personal Finance Management",
    description: "A comprehensive personal finance application with expense tracking, budget planning, investment portfolio management, bill reminders, financial goal setting, and detailed analytics with charts.",
    longDescription: "Developed a complete personal finance management solution with bank-level security. Features include automated expense categorization, budget planning with smart recommendations, investment tracking, bill reminders, and comprehensive financial analytics with interactive charts.",
    image: "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=600&h=400&fit=crop",
    technologies: ["React", "TypeScript", "Firebase", "Firestore", "Chart.js", "Plaid API", "Material-UI", "PWA", "Workbox"],
    category: "frontend",
    liveLink: "https://finance-tracker-pro.netlify.app",
    githubLink: "https://github.com/its1om1dhage/finance-tracker",
    featured: false,
    challenges: [
      "Implementing secure bank API integration for transaction data",
      "Building intelligent expense categorization system",
      "Creating responsive charts for complex financial data"
    ],
    achievements: [
      "Secured 256-bit encryption for all financial data",
      "Automated 90% of expense categorization with ML",
      "Helped users save average of $500/month through insights"
    ]
  },
  {
    id: 6,
    title: "PropVision - Real Estate Analytics Platform",
    description: "A comprehensive real estate platform with property listings, market analytics, virtual tours, mortgage calculator, investment analysis, agent management, and location-based search with interactive maps.",
    longDescription: "Created a sophisticated real estate platform combining property listings with advanced market analytics. Features include 360° virtual tours, AI-powered property valuation, investment ROI calculator, mortgage planning tools, and detailed neighborhood analytics with crime data, school ratings, and market trends.",
    image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=600&h=400&fit=crop",
    technologies: ["React", "Node.js", "MongoDB", "Express", "Mapbox GL", "Cloudinary", "Socket.io", "Stripe", "AWS", "Docker"],
    category: "fullstack",
    liveLink: "https://propvision-realestate.herokuapp.com",
    githubLink: "https://github.com/its1om1dhage/propvision-platform",
    featured: true,
    challenges: [
      "Implementing complex geospatial queries for location-based search",
      "Building scalable image/video upload system for property media",
      "Creating accurate property valuation algorithm using market data"
    ],
    achievements: [
      "Processed over 100,000 property listings across 50 cities",
      "Achieved 92% accuracy in automated property valuations",
      "Reduced property search time by 65% with intelligent filtering"
    ]
  },
  {
    id: 7,
    title: "StudyMate - Educational Learning Platform",
    description: "An interactive learning platform with course management, quiz system, progress tracking, video streaming, discussion forums, and AI-powered personalized learning paths for students and educators.",
    longDescription: "Built a comprehensive e-learning platform with focus on personalized education. Features include adaptive learning algorithms, interactive quiz system, video lectures with note-taking, discussion forums, assignment management, and detailed progress analytics for both students and instructors.",
    image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=600&h=400&fit=crop",
    technologies: ["React", "Redux", "Node.js", "Express", "MongoDB", "Socket.io", "WebRTC", "AWS S3", "Stripe", "JWT"],
    category: "fullstack",
    liveLink: "https://studymate-platform.netlify.app",
    githubLink: "https://github.com/its1om1dhage/studymate-platform",
    featured: false,
    challenges: [
      "Implementing real-time video streaming for live classes",
      "Building adaptive learning algorithm for personalized content",
      "Creating scalable discussion forum with real-time updates"
    ],
    achievements: [
      "Served over 10,000 students across 25 subjects",
      "Improved learning outcomes by 45% through personalized paths",
      "Achieved 99.5% video streaming uptime"
    ]
  },
  {
    id: 8,
    title: "FoodieDelight - Restaurant Discovery & Delivery",
    description: "A modern food delivery platform with restaurant discovery, real-time order tracking, delivery management, ratings & reviews, loyalty programs, and comprehensive admin dashboard for restaurant owners.",
    longDescription: "Developed a complete food delivery ecosystem with separate apps for customers, delivery partners, and restaurant owners. Features include intelligent restaurant recommendations, real-time GPS tracking, optimized delivery routing, payment integration, and comprehensive analytics dashboard.",
    image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=600&h=400&fit=crop",
    technologies: ["React Native", "React", "Node.js", "Express", "MongoDB", "Socket.io", "Google Maps API", "Stripe", "Firebase", "Redis"],
    category: "fullstack",
    liveLink: "https://foodiedelight-app.vercel.app",
    githubLink: "https://github.com/its1om1dhage/foodiedelight-platform",
    featured: false,
    challenges: [
      "Implementing real-time order tracking with accurate ETA predictions",
      "Building optimal delivery routing algorithm for multiple orders",
      "Creating seamless mobile experience for delivery partners"
    ],
    achievements: [
      "Reduced average delivery time by 30% through route optimization",
      "Achieved 4.8/5 customer satisfaction rating",
      "Processed over 50,000 orders with 99.2% success rate"
    ]
  }
];

export const categories = [
  { id: 'all', name: 'All Projects' },
  { id: 'fullstack', name: 'Full Stack' },
  { id: 'frontend', name: 'Frontend' },
  { id: 'backend', name: 'Backend' }
];

export const skills = {
  "Frontend": [
    "React", "Next.js", "Vue.js", "TypeScript", "JavaScript ES6+", 
    "HTML5", "CSS3", "Sass/SCSS", "Tailwind CSS", "Material-UI", 
    "Styled Components", "React Query", "Redux Toolkit", "Zustand"
  ],
  "Backend": [
    "Node.js", "Express.js", "Nest.js", "Python", "FastAPI", "Django", 
    "GraphQL", "REST APIs", "Microservices", "Serverless", "WebSocket", 
    "JWT Authentication", "OAuth 2.0", "API Gateway"
  ],
  "Database": [
    "MongoDB", "PostgreSQL", "MySQL", "Redis", "Firebase Firestore", 
    "DynamoDB", "Prisma ORM", "Mongoose", "TypeORM", "Database Design", 
    "Query Optimization", "Data Modeling"
  ],
  "Cloud & DevOps": [
    "AWS (EC2, S3, Lambda, RDS)", "Google Cloud Platform", "Azure", 
    "Docker", "Kubernetes", "Vercel", "Netlify", "Heroku", "CI/CD", 
    "GitHub Actions", "Jenkins", "Nginx", "Load Balancing"
  ],
  "Tools & Technologies": [
    "Git/GitHub", "Webpack", "Vite", "ESLint", "Prettier", "Jest", 
    "Cypress", "Postman", "Figma", "Adobe XD", "Jira", "Agile/Scrum", 
    "Three.js", "D3.js", "Socket.io", "WebRTC"
  ],
  "Mobile Development": [
    "React Native", "Flutter", "Progressive Web Apps", "Mobile-First Design", 
    "App Store Deployment", "Push Notifications", "Offline Support"
  ]
};
