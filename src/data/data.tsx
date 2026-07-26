import { IconHome, IconBrandGithub, IconBrush, IconBriefcase2, IconBrandLinkedin, IconMail, IconAward, IconPhone } from "@tabler/icons-react"

export interface ProjectItem {
  title: string;
  href: string;
  dates: string;
  active: boolean;
  type: string;
  technologies: string[];
  description: string;
  thumbnail: string;
  video?: string;
}

export interface CertificateItem {
  title: string;
  issuer: string;
  date: string;
  skills: string[];
  image: string;
  credentialUrl?: string;
}

export interface AchievementItem {
  title: string;
  description: string;
  category: string;
  date: string;
  metrics?: string;
  image?: string;
  link?: string;
}

export const data = {
  summary: "Aspiring AI & Machine Learning Engineer pursuing a B.E. in Information Technology at SAL College of Engineering (CGPA 8.35/10). Skilled in Python, Machine Learning, Data Science, NumPy, Pandas, Scikit-learn, and Generative AI with hands-on experience building AI-powered applications and intelligent systems.",

  experience: [
    {
      image: "/experience/foundr_ai.svg",
      company: "SAL College of Engineering",
      role: "B.E. in Information Technology (CGPA: 8.35 / 10)",
      date: "July 2023 – June 2027",
      description: "Pursuing Bachelor of Engineering in IT. Core Coursework: Machine Learning, Artificial Intelligence, Data Science, Probability & Statistics, Linear Algebra, Data Structures & Algorithms, DBMS, Python Programming.",
      location: "Ahmedabad, Gujarat, India",
      skills: ["Python", "Machine Learning", "Data Science", "AI", "DSA", "DBMS", "Linear Algebra"],
      href: "https://github.com/thatvivekhingu",
    },
  ],

  projects: [
    {
      title: "BharatBhasha AI | Multilingual Voice & Text AI OS",
      href: "https://github.com/thatvivekhingu/Bharat-Bhasha-Ai-2.0",
      dates: "2024 - Present",
      active: true,
      type: "AI Platform & Web System",
      technologies: ["Grok API", "HTML", "CSS", "JavaScript", "NLP", "Node.js", "Express.js"],
      description: "Developed an AI-powered multilingual communication platform supporting text and voice interactions across multiple Indian languages. Integrated Grok API to generate context-aware multilingual responses and built a scalable backend using Node.js and Express.js for real-time AI conversations.",
      thumbnail: "/projects/bharat-bhasha.jpg",
      video: "",
    },
    {
      title: "Reverse Recipe Engine with Local Flavor",
      href: "https://github.com/thatvivekhingu/Recipe-Recommender-system-",
      dates: "2024",
      active: true,
      type: "Generative AI Web Application",
      technologies: ["Python", "Flask", "Gemini API", "HTML", "CSS", "JavaScript", "Unsplash API"],
      description: "Developed an AI-powered application that generates regional recipes from user-provided ingredients. Integrated Gemini API to provide personalized recipe recommendations and cooking instructions, paired with Unsplash API for visual dish presentation.",
      thumbnail: "/projects/reverse-recipe.jpg",
      video: "",
    },
    {
      title: "Book Recommender System | Machine Learning Engine",
      href: "https://github.com/thatvivekhingu/Machine_learning",
      dates: "2024",
      active: false,
      type: "Machine Learning Application",
      technologies: ["Python", "Pandas", "Scikit-learn", "Cosine Similarity", "NumPy"],
      description: "Built a machine learning-based recommendation system using Cosine Similarity algorithms. Performed data cleaning, preprocessing, and exploratory data analysis on large datasets using Pandas to deliver personalized book recommendations based on user reading patterns.",
      thumbnail: "/projects/book-recommender.svg",
      video: "",
    },
    {
      title: "AI Startup Success Predictor | Machine Learning Engine",
      href: "https://github.com/thatvivekhingu/Ai_Startup_Success_Predictor",
      dates: "2024",
      active: true,
      type: "Machine Learning & Predictive Analytics",
      technologies: ["Python", "Scikit-learn", "Pandas", "NumPy", "Predictive Analytics", "Machine Learning"],
      description: "Developed a machine learning prediction system designed to evaluate startup growth potential, funding success indicators, and market trends using data-driven classification algorithms.",
      thumbnail: "/projects/startup-predictor.svg",
      video: "",
    },
    {
      title: "Portfolio Version 1.0 | Classic Developer Showcase",
      href: "https://github.com/thatvivekhingu/Portfolio-Version-1.0",
      dates: "2024",
      active: true,
      type: "Web Application & Portfolio Showcase",
      technologies: ["React", "HTML5", "CSS3", "JavaScript", "Responsive UI"],
      description: "Original personal portfolio v1.0 showcase. Tagline: 'If my work inspires a conversation, collaboration, or opportunity, then this portfolio has already done its job.'",
      thumbnail: "/projects/portfolio-v1.svg",
      video: "",
    },
  ] as ProjectItem[],

  certificates: [
    {
      title: "Machine Learning",
      issuer: "NPTEL",
      date: "2026",
      skills: ["Supervised Learning", "Regression", "Classification", "Model Evaluation"],
      image: "/certificates/nptel-ml.jpg",
      credentialUrl: "https://linkedin.com/in/vivekhingu",
    },
    {
      title: "Build RAG Chatbot with Python",
      issuer: "LetsUpgrade",
      date: "2025",
      skills: ["Retrieval-Augmented Generation", "LLMs", "Vector DBs", "Prompt Engineering"],
      image: "/certificates/letsupgrade-rag.jpg",
      credentialUrl: "https://linkedin.com/in/vivekhingu",
    },
    {
      title: "Data Analysis with Python",
      issuer: "freeCodeCamp",
      date: "2025",
      skills: ["Python", "Pandas", "NumPy", "Data Preprocessing", "EDA"],
      image: "/certificates/freecodecamp-data.jpg",
      credentialUrl: "https://linkedin.com/in/vivekhingu",
    },
    {
      title: "Python for Data Science",
      issuer: "IBM",
      date: "2025",
      skills: ["Python", "Data Science", "Data Cleaning", "Data Visualization"],
      image: "/certificates/ibm-python.jpg",
      credentialUrl: "https://linkedin.com/in/vivekhingu",
    },
  ] as CertificateItem[],

  achievements: [
    {
      title: "Flinders University AI Hackathon",
      description: "Secured 2nd Place in the prestigious International AI Hackathon hosted by Flinders University.",
      category: "Hackathon Award",
      date: "2025",
      metrics: "🥈 2nd Place | AUD 300 Cash Prize",
      image: "/achievements/flinders-ai.jpg",
      link: "https://github.com/thatvivekhingu",
    },
    {
      title: "Google Cloud Arcade Champion 2025",
      description: "Achieved Champion status in Google Cloud Arcade 2025 for hands-on cloud AI, infrastructure, and DevOps milestones.",
      category: "Cloud & AI Milestone",
      date: "2025",
      metrics: "🏆 Google Cloud Arcade Champion",
      image: "/achievements/google-cloud-arcade.jpg",
      link: "https://github.com/thatvivekhingu",
    },
    {
      title: "Top 10 Finalist – AIT Hackathon 2K25",
      description: "Ranked among the Top 10 finalists out of hundreds of competing teams in AIT Hackathon 2K25.",
      category: "Hackathon Finalist",
      date: "2025",
      metrics: "🏅 Top 10 Finalist",
      image: "/achievements/ait-hackathon.jpg",
      link: "https://github.com/thatvivekhingu",
    },
    {
      title: "Robo Soccer Competition",
      description: "Won 1st Prize in the high-stakes Robo Soccer engineering & robotics competition.",
      category: "Engineering Competition",
      date: "2024",
      metrics: "🥇 1st Prize Winner",
      image: "/achievements/robo-soccer.jpg",
      link: "https://github.com/thatvivekhingu",
    },
  ] as AchievementItem[],

  contact: [
    {
      href: "tel:+918866688575",
      label: "+91 88666 88575",
      icon: <IconPhone className="h-5 w-5" />,
      aria: "Phone",
    },
    {
      href: "mailto:hinguvivek05@gmail.com",
      label: "Email",
      icon: <IconMail className="h-5 w-5" />,
      aria: "Email",
    },
    {
      href: "https://linkedin.com/in/vivekhingu",
      label: "LinkedIn",
      icon: <IconBrandLinkedin className="h-5 w-5" />,
      aria: "LinkedIn",
    },
    {
      href: "https://github.com/thatvivekhingu",
      label: "GitHub",
      icon: <IconBrandGithub className="h-5 w-5" />,
      aria: "GitHub",
    },
  ],

  nav: [
    {
      name: "Home",
      link: "hero",
      icon: <IconHome className="subpixel-antialiased h-5 w-5 text-zinc-500 hover:text-zinc-950 dark:text-zinc-300 hover:dark:text-zinc-50 hover:animate-wiggle animate-wiggle transition-colors duration-100" />,
    },
    {
      name: "Projects",
      link: "projects",
      icon: <IconBrush className="subpixel-antialiased h-5 w-5 text-zinc-500 hover:text-zinc-950 dark:text-zinc-300 hover:dark:text-zinc-50 hover:animate-wiggle animate-wiggle transition-colors duration-100" />
    },
    {
      name: "Achievements",
      link: "achievements",
      icon: <IconAward className="subpixel-antialiased h-5 w-5 text-zinc-500 hover:text-zinc-950 dark:text-zinc-300 hover:dark:text-zinc-50 hover:animate-wiggle animate-wiggle transition-colors duration-100" />
    },
    {
      name: "Education",
      link: "experience",
      icon: <IconBriefcase2 className="subpixel-antialiased h-5 w-5 text-zinc-500 hover:text-zinc-950 dark:text-zinc-300 hover:dark:text-zinc-50 hover:animate-wiggle animate-wiggle transition-colors duration-100" />,
    },
  ],

  favoriteLanguage: [
    {
      name: "Python",
      icon: "python",
      themeDependent: false,
    }
  ],

  scratchGifs: [
    "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExM2F3NmQxMTc3MWdremlyNnkwMDlhNHZ0bzV4dW54eWNvNmpnbWlhMCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/13Hgw8T855C20M/giphy.gif",
    "https://media.giphy.com/media/3oKIPnAiaMCws8nOsE/giphy.gif",
    "https://media.giphy.com/media/LmN8OYiY4m0X4UrzUI/giphy.gif",
    "https://media.giphy.com/media/u01ioCe6G8URG/giphy.gif",
    "https://media.giphy.com/media/eOjuCYIGqXSqfBy0MX/giphy.gif",
    "https://media.giphy.com/media/AEDD6xjlOxNMgFsUmA/giphy.gif",
    "https://media.giphy.com/media/LqgrTA39s77U8JKhJd/giphy.gif",
    "https://media.giphy.com/media/xYPdnwsRPZDhCxXvOi/giphy.gif",
    "https://media.giphy.com/media/26n6Wywq480SmNRY4/giphy.gif",
    "https://media.giphy.com/media/l41lFw05B8JZ3xaW4/giphy.gif",
    "https://media.giphy.com/media/3o7TKSjRrfIPjeiVyM/giphy.gif",
    "https://media.giphy.com/media/d31w24psGYeekCXY/giphy.gif",
    "https://media.giphy.com/media/3oKIPzc1ZJjP2Yp6n6/giphy.gif",
  ],

  tools: [
    {
      name: "Python",
      icon: "python",
      themeDependent: false,
    },
    {
      name: "LLMs",
      icon: "llm",
      themeDependent: false,
    },
    {
      name: "Agentic AI",
      icon: "agentic-ai",
      themeDependent: false,
    },
    {
      name: "LangChain",
      icon: "langchain",
      themeDependent: false,
    },
    {
      name: "LangGraph",
      icon: "langgraph",
      themeDependent: false,
    },
    {
      name: "RAG",
      icon: "rag",
      themeDependent: false,
    },
    {
      name: "NLP",
      icon: "nlp",
      themeDependent: false,
    },
    {
      name: "Computer Vision",
      icon: "cv",
      themeDependent: false,
    },
    {
      name: "Scikit-learn",
      icon: "scikitlearn",
      themeDependent: false,
    },
    {
      name: "NumPy",
      icon: "numpy",
      themeDependent: false,
    },
    {
      name: "Pandas",
      icon: "pandas",
      themeDependent: false,
    },
    {
      name: "Flask",
      icon: "flask",
      themeDependent: true,
    },
    {
      name: "JavaScript",
      icon: "javascript",
      themeDependent: false,
    },
    {
      name: "NodeJS",
      icon: "nodejs",
      themeDependent: false,
    },
    {
      name: "React",
      icon: "react",
      themeDependent: false,
    },
    {
      name: "NextJS",
      icon: "nextjs",
      themeDependent: true,
    },
    {
      name: "HTML",
      icon: "html",
      themeDependent: false,
    },
    {
      name: "CSS",
      icon: "css",
      themeDependent: false,
    },
    {
      name: "Git",
      icon: "git",
      themeDependent: false,
    },
    {
      name: "GitHub",
      icon: "github",
      themeDependent: true,
    },
    {
      name: "VSCode",
      icon: "vscode",
      themeDependent: false,
    },
  ],
  sunsets: [
    {
      src: "/sunsets/earth-01.jpg",
      alt: "Illuminated Night Art & Lotus Lamp Festival",
    },
    {
      src: "/sunsets/earth-02.jpg",
      alt: "Ancient Carved Stone Temple Architecture",
    },
    {
      src: "/sunsets/earth-03.jpg",
      alt: "Monsoon Lake Palace & Boat Ride in Udaipur",
    },
    {
      src: "/sunsets/earth-04.jpg",
      alt: "Historic Royal Palace Archway & Balcony Architecture",
    },
    {
      src: "/sunsets/earth-05.jpg",
      alt: "Welcome to Night Flower Park Neon Archway",
    },
  ]
};