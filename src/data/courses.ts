
export interface ProjectType {
  title: string;
  duration: number;
  progress: number;
  topics: string[];
}

export interface CourseType {
  id: string;
  name: string;
  icon: string;
  description: string;
  rating: number;
  duration: number;
  enrolled: number;
  projects: ProjectType[];
}

export const courses: CourseType[] = [
  {
    id: "html",
    name: "HTML",
    icon: "/icons/html.svg",
    description: "Learn the fundamentals of web development with HTML, the standard markup language for creating web pages and applications.",
    rating: 4.7,
    duration: 4,
    enrolled: 15420,
    projects: [
      {
        title: "Basic Website Structure",
        duration: 3,
        progress: 0,
        topics: [
          "HTML Document Structure",
          "Headers and Paragraphs",
          "Links and Images",
          "Lists and Tables",
          "Forms and Input Elements"
        ]
      },
      {
        title: "Semantic HTML",
        duration: 4,
        progress: 0,
        topics: [
          "Semantic Tags Overview",
          "Navigation and Sections",
          "Article and Aside Elements",
          "Figure and Figcaption",
          "Accessibility Best Practices"
        ]
      },
      {
        title: "Portfolio Project",
        duration: 8,
        progress: 0,
        topics: [
          "Planning Your Portfolio",
          "Creating the Structure",
          "Adding Content",
          "Styling with Basic CSS",
          "Deploying Your Website"
        ]
      }
    ]
  },
  {
    id: "javascript",
    name: "JavaScript",
    icon: "/icons/javascript.svg",
    description: "Master JavaScript, the programming language of the web that allows you to create dynamically updating content and interactive features.",
    rating: 4.8,
    duration: 8,
    enrolled: 24680,
    projects: [
      {
        title: "JavaScript Fundamentals",
        duration: 5,
        progress: 0,
        topics: [
          "Variables and Data Types",
          "Functions and Scope",
          "Arrays and Objects",
          "Control Flow",
          "Error Handling"
        ]
      },
      {
        title: "DOM Manipulation",
        duration: 6,
        progress: 0,
        topics: [
          "Selecting Elements",
          "Modifying Content",
          "Event Listeners",
          "Creating Elements",
          "Browser Storage"
        ]
      },
      {
        title: "Interactive Web App",
        duration: 10,
        progress: 0,
        topics: [
          "Project Planning",
          "Building the UI",
          "Implementing Logic",
          "Handling User Input",
          "Debugging and Testing"
        ]
      },
      {
        title: "Asynchronous JavaScript",
        duration: 7,
        progress: 0,
        topics: [
          "Callbacks",
          "Promises",
          "Async/Await",
          "Fetch API",
          "Working with APIs"
        ]
      }
    ]
  },
  {
    id: "typescript",
    name: "TypeScript",
    icon: "/icons/typescript.svg",
    description: "Enhance your JavaScript with TypeScript, a strongly typed programming language that builds on JavaScript and provides better tooling.",
    rating: 4.9,
    duration: 6,
    enrolled: 18340,
    projects: [
      {
        title: "TypeScript Basics",
        duration: 4,
        progress: 0,
        topics: [
          "Basic Types",
          "Interfaces",
          "Functions",
          "Classes",
          "Generics"
        ]
      },
      {
        title: "Advanced Types",
        duration: 5,
        progress: 0,
        topics: [
          "Union and Intersection Types",
          "Type Guards",
          "Type Inference",
          "Mapped Types",
          "Utility Types"
        ]
      },
      {
        title: "TypeScript with React",
        duration: 8,
        progress: 0,
        topics: [
          "Setup and Configuration",
          "Components with TypeScript",
          "Props and State Typing",
          "Hooks with TypeScript",
          "Building a Typed Application"
        ]
      }
    ]
  },
  {
    id: "python",
    name: "Python",
    icon: "/icons/python.svg",
    description: "Learn Python, a versatile and readable programming language used for web development, data analysis, artificial intelligence, and more.",
    rating: 4.9,
    duration: 10,
    enrolled: 32560,
    projects: [
      {
        title: "Python Fundamentals",
        duration: 4,
        progress: 0,
        topics: [
          "Syntax and Variables",
          "Data Structures",
          "Control Flow",
          "Functions",
          "Modules and Packages"
        ]
      },
      {
        title: "Data Analysis with Python",
        duration: 6,
        progress: 0,
        topics: [
          "NumPy Basics",
          "Pandas for Data Analysis",
          "Data Visualization",
          "Statistical Analysis",
          "Data Cleaning"
        ]
      },
      {
        title: "Web Development with Django",
        duration: 8,
        progress: 0,
        topics: [
          "Django Setup",
          "Models and Databases",
          "Views and Templates",
          "Forms and User Input",
          "Deploying a Django App"
        ]
      },
      {
        title: "Machine Learning Basics",
        duration: 10,
        progress: 0,
        topics: [
          "Introduction to ML",
          "Supervised Learning",
          "Unsupervised Learning",
          "Model Evaluation",
          "Practical ML Project"
        ]
      }
    ]
  },
  {
    id: "cpp",
    name: "C++",
    icon: "/icons/cpp.svg",
    description: "Master C++, a powerful general-purpose programming language that offers high performance, efficiency, and flexibility for game development and system programming.",
    rating: 4.6,
    duration: 12,
    enrolled: 14780,
    projects: [
      {
        title: "C++ Fundamentals",
        duration: 5,
        progress: 0,
        topics: [
          "Basic Syntax",
          "Data Types and Variables",
          "Control Structures",
          "Functions",
          "Memory Management"
        ]
      },
      {
        title: "Object-Oriented Programming",
        duration: 7,
        progress: 0,
        topics: [
          "Classes and Objects",
          "Inheritance",
          "Polymorphism",
          "Encapsulation",
          "Templates"
        ]
      },
      {
        title: "Data Structures Implementation",
        duration: 8,
        progress: 0,
        topics: [
          "Arrays and Vectors",
          "Linked Lists",
          "Stacks and Queues",
          "Trees and Graphs",
          "Hash Tables"
        ]
      },
      {
        title: "Game Development Basics",
        duration: 12,
        progress: 0,
        topics: [
          "Setting Up Game Framework",
          "Game Loop and Timing",
          "Sprite Rendering",
          "Input Handling",
          "Collision Detection"
        ]
      }
    ]
  },
  {
    id: "c",
    name: "C",
    icon: "/icons/c.svg",
    description: "Learn C, the foundational programming language that influenced numerous other languages and is essential for system programming and embedded systems.",
    rating: 4.5,
    duration: 10,
    enrolled: 12450,
    projects: [
      {
        title: "C Language Basics",
        duration: 4,
        progress: 0,
        topics: [
          "Introduction to C",
          "Variables and Data Types",
          "Control Flow",
          "Functions",
          "Arrays and Pointers"
        ]
      },
      {
        title: "Memory Management",
        duration: 5,
        progress: 0,
        topics: [
          "Dynamic Memory Allocation",
          "Memory Leaks",
          "Pointer Arithmetic",
          "Memory Layout",
          "Debugging Memory Issues"
        ]
      },
      {
        title: "Data Structures in C",
        duration: 7,
        progress: 0,
        topics: [
          "Implementing Linked Lists",
          "Stacks and Queues",
          "Binary Trees",
          "Hash Tables",
          "Graphs"
        ]
      },
      {
        title: "System Programming",
        duration: 8,
        progress: 0,
        topics: [
          "File I/O Operations",
          "Process Management",
          "Signal Handling",
          "Interprocess Communication",
          "Building a Shell"
        ]
      }
    ]
  },
  {
    id: "ruby",
    name: "Ruby",
    icon: "/icons/ruby.svg",
    description: "Explore Ruby, a dynamic, open-source programming language with a focus on simplicity and productivity, popular for web development with Ruby on Rails.",
    rating: 4.7,
    duration: 8,
    enrolled: 9840,
    projects: [
      {
        title: "Ruby Fundamentals",
        duration: 4,
        progress: 0,
        topics: [
          "Ruby Syntax",
          "Variables and Data Types",
          "Control Structures",
          "Methods and Blocks",
          "Classes and Objects"
        ]
      },
      {
        title: "Ruby Advanced Features",
        duration: 5,
        progress: 0,
        topics: [
          "Modules and Mixins",
          "Metaprogramming",
          "Procs and Lambdas",
          "Error Handling",
          "Testing with RSpec"
        ]
      },
      {
        title: "Ruby on Rails Basics",
        duration: 7,
        progress: 0,
        topics: [
          "Rails Setup",
          "MVC Architecture",
          "Active Record",
          "Routing",
          "Views and Templates"
        ]
      },
      {
        title: "Building a Rails Application",
        duration: 10,
        progress: 0,
        topics: [
          "Project Planning",
          "Authentication and Authorization",
          "API Development",
          "Testing",
          "Deployment"
        ]
      }
    ]
  }
];
