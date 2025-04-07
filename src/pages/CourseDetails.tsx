
import { useState, useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ChevronDown, ChevronUp, Github, Twitter, Linkedin, Clock, Star, Users } from "lucide-react";
import { courses } from "@/data/courses";
import NavBar from "@/components/NavBar";
import Breadcrumbs from "@/components/Breadcrumbs";
import { Button } from "@/components/ui/button";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { useToast } from "@/components/ui/use-toast";

// Reusable CourseCard Component
const CourseCard = ({ course }: { course: any }) => (
  <a href={course.link || "#"} className="block">
    <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 flex flex-col items-center">
      <img src={course.logo} alt={`${course.name} logo`} className="h-16 w-16 mb-4" />
      <h3 className="text-lg font-medium text-gray-800">{course.name}</h3>
    </div>
  </a>
);

// Reusable SubProject Component
const SubProject = ({ title, duration, completed = false, link = "#" }: any) => (
  <a href={link} className="block">
    <div className="flex items-center justify-between p-4 mb-2 rounded hover:bg-gray-100 hover:text-blue-600 transition-colors">
      <h4 className="text-sm font-medium">{title}</h4>
      <span className="text-xs text-gray-600">{duration}</span>
    </div>
  </a>
);

// Reusable Project Component with Dropdown functionality
const Project = ({ title, duration, progress = 0, subProjects = [], link = "#" }: any) => {
  const [isOpen, setIsOpen] = useState(false);
  
  return (
    <div className="mb-4 rounded-lg bg-white border border-gray-200 hover:border-gray-300 transition-all">
      <a href={link} className="block">
        <div className="p-4 flex items-center justify-between">
          <div className="flex-1">
            <h3 className="font-medium hover:text-blue-600 transition-colors">{title}</h3>
          </div>
          
          {/* Progress Ring */}
          <div className="relative w-10 h-10 mr-4">
            <svg className="w-10 h-10" viewBox="0 0 36 36">
              <circle cx="18" cy="18" r="16" fill="none" stroke="#e6e6e6" strokeWidth="2"></circle>
              <circle 
                cx="18" cy="18" r="16" 
                fill="none" 
                stroke="#4299e1" 
                strokeWidth="2"
                strokeDasharray={`${2 * Math.PI * 16 * progress / 100} ${2 * Math.PI * 16}`}
                strokeDashoffset="0"
                transform="rotate(-90 18 18)"
              />
              <text 
                x="18" 
                y="18" 
                dominantBaseline="middle" 
                textAnchor="middle" 
                fontSize="10"
                fontWeight="bold"
              >
                {progress}%
              </text>
            </svg>
          </div>
          
          <span className="text-sm text-gray-600">{duration}</span>
          <button 
            onClick={(e) => {
              e.preventDefault();
              setIsOpen(!isOpen);
            }}
            className="ml-2 p-1 rounded-full hover:bg-gray-100"
          >
            {isOpen ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
          </button>
        </div>
      </a>
      
      {isOpen && (
        <div className="px-4 pb-4 border-t border-gray-100">
          {subProjects.map((subProject: any, index: number) => (
            <SubProject 
              key={index} 
              title={subProject.title} 
              duration={subProject.duration}
              completed={subProject.completed}
              link={subProject.link}
            />
          ))}
        </div>
      )}
    </div>
  );
};

// Small Progress Bar Component for hero section
const SmallProgressBar = ({ progress = 0 }: { progress: number }) => (
  <div className="w-full max-w-xs bg-gray-200 rounded-full h-2">
    <div 
      className="bg-blue-800 h-2 rounded-full" 
      style={{ width: `${progress}%` }}
    ></div>
  </div>
);

// Sticky Navigation Component
const StickyNav = ({ title, visible }: { title: string, visible: boolean }) => (
  <div 
    className={`fixed top-0 left-0 right-0 bg-white shadow-md z-40 transition-transform duration-300 ${
      visible ? 'transform translate-y-0' : 'transform -translate-y-full'
    }`}
  >
    <div className="container mx-auto px-4 py-4">
      <h1 className="text-xl font-bold">{title}</h1>
    </div>
  </div>
);

const CourseDetails = () => {
  const { courseId } = useParams<{ courseId: string }>();
  const { toast } = useToast();
  const navigate = useNavigate();
  const [isEnrolled, setIsEnrolled] = useState(false);
  const [showFullDescription, setShowFullDescription] = useState(false);
  const [showStickyNav, setShowStickyNav] = useState(false);
  const heroRef = useRef<HTMLDivElement>(null);
  
  const course = courses.find(c => c.id === courseId);
  if (!course) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-semibold">Course not found</h2>
          <Button 
            onClick={() => navigate("/discover")}
            className="mt-4"
          >
            Back to Discover
          </Button>
        </div>
      </div>
    );
  }

  const otherCourses = courses.filter(c => c.id !== courseId).slice(0, 5);
  
  const handleEnroll = () => {
    setIsEnrolled(true);
    toast({
      title: "Enrolled Successfully",
      description: `You've been enrolled in the ${course.name} course.`,
    });
  };

  const handleUnenroll = () => {
    setIsEnrolled(false);
    toast({
      title: "Unenrolled Successfully",
      description: `You've been unenrolled from the ${course.name} course.`,
      variant: "destructive",
    });
  };

  // Course data mapping from API data to template data
  const courseData = {
    courseTitle: course.name,
    courseDescription: course.description || "Master programming with hands-on projects and real-world examples",
    courseFullDescription: course.description || "This comprehensive course will take you from basics to advanced concepts through hands-on projects. You'll learn modern programming techniques and how to build interactive applications. Perfect for beginners and those looking to refresh their skills.",
    courseImage: course.icon,
    totalProgress: course.progress || 35,
    totalDuration: `${course.duration} weeks`,
    rating: course.rating,
    socialLinks: {
      github: "https://github.com/your-repo",
      twitter: "https://twitter.com/your-handle",
      linkedin: "https://linkedin.com/in/your-profile"
    },
    projects: course.projects.map((project: any) => ({
      title: project.title,
      duration: `${project.duration} hours`,
      progress: project.progress,
      link: "#project",
      subProjects: project.topics.map((topic: string) => ({
        title: topic,
        duration: "1-2h",
        completed: false,
        link: "#sub"
      }))
    })),
    suggestedCourses: otherCourses.map(c => ({
      name: c.name,
      logo: c.icon,
      link: `/course/${c.id}`
    }))
  };

  useEffect(() => {
    const handleScroll = () => {
      if (heroRef.current) {
        const heroBottom = heroRef.current.getBoundingClientRect().bottom;
        setShowStickyNav(heroBottom <= 0);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* NavBar */}
      <div className="z-50 w-full">
        <NavBar />
      </div>

      {/* Breadcrumbs */}
      <Breadcrumbs currentPageTitle={courseData.courseTitle} />
      
      {/* Sticky Navigation */}
      <StickyNav title={courseData.courseTitle} visible={showStickyNav} />
      
      {/* Hero Banner */}
      <div ref={heroRef} className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white">
        <div className="container mx-auto px-4 py-12">
          <div className="flex flex-col items-center md:flex-row md:items-start md:justify-between">
            {/* Logo on top for mobile */}
            <div className="flex justify-center w-full md:hidden mb-6">
              <img 
                src={courseData.courseImage} 
                alt={`${courseData.courseTitle} logo`} 
                className="w-32 h-32"
              />
            </div>
            
            <div className="md:w-7/12 mb-8 md:mb-0">
              <h1 className="text-4xl font-bold mb-4">{courseData.courseTitle}</h1>
              <p className="text-xl mb-4">{courseData.courseDescription}</p>
              
              {/* Small progress bar for hero section */}
              <SmallProgressBar progress={courseData.totalProgress} />
              
              {/* Mobile/Tablet Info - Visible only on small screens */}
              <div className="flex flex-wrap items-center text-sm md:hidden mt-4">
                <span className="mr-6 mb-2">
                  <span className="font-medium">{courseData.totalDuration}</span> to complete
                </span>
                <span className="mr-6 mb-2">
                  <span className="font-medium">{courseData.rating}</span> rating
                </span>
                <div className="flex space-x-2 mb-2">
                  <a href={courseData.socialLinks.github} className="hover:text-blue-200" aria-label="GitHub">
                    <Github size={18} />
                  </a>
                  <a href={courseData.socialLinks.twitter} className="hover:text-blue-200" aria-label="Twitter">
                    <Twitter size={18} />
                  </a>
                  <a href={courseData.socialLinks.linkedin} className="hover:text-blue-200" aria-label="LinkedIn">
                    <Linkedin size={18} />
                  </a>
                </div>
              </div>
            </div>
            
            {/* Hidden on mobile, visible on larger screens */}
            <div className="hidden md:block md:w-4/12 justify-center">
              <img 
                src={courseData.courseImage} 
                alt={`${courseData.courseTitle} logo`} 
                className="w-48 h-48"
              />
            </div>
          </div>
        </div>
      </div>
      
      {/* Mobile Enrollment Section */}
      <div className="md:hidden bg-white border-b border-gray-200">
        <div className="container mx-auto px-4 py-4">
          <h2 className="text-lg font-bold mb-3">Enrollment</h2>
          {isEnrolled ? (
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button variant="destructive" className="w-full">Unenroll from Course</Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                  <AlertDialogDescription>
                    This will unenroll you from the {courseData.courseTitle} course. Your progress will be lost.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction onClick={handleUnenroll}>Confirm</AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          ) : (
            <Button className="w-full" onClick={handleEnroll}>Enroll in Course</Button>
          )}
        </div>
      </div>
      
      {/* Course Content with sticky right panel */}
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row">
          {/* Left Side (Scrollable) */}
          <div className="w-full md:w-3/5 md:pr-6">
            {showStickyNav && <div className="h-16"></div>} {/* Spacer when sticky nav is visible */}
            
            {/* Course Description Section */}
            <div className="bg-white p-6 rounded-lg border border-gray-200 mb-8">
              <h2 className="text-xl font-bold mb-3">Course Description</h2>
              <p className="text-gray-700">
                {showFullDescription 
                  ? courseData.courseFullDescription 
                  : `${courseData.courseFullDescription.substring(0, 150)}...`}
              </p>
              <button 
                onClick={() => setShowFullDescription(!showFullDescription)}
                className="text-blue-600 hover:text-blue-800 font-medium text-sm mt-2"
              >
                {showFullDescription ? 'Show Less' : 'Show More'}
              </button>
            </div>
            
            {/* Projects List */}
            <h2 className="text-2xl font-bold mb-6">Course Content</h2>
            {courseData.projects.map((project: any, index: number) => (
              <Project 
                key={index}
                title={project.title}
                duration={project.duration}
                progress={project.progress}
                subProjects={project.subProjects}
                link={project.link}
              />
            ))}
            
            {/* Suggested Courses */}
            <div className="mt-12 mb-12">
              <h2 className="text-2xl font-bold mb-6">Suggested Courses</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
                {courseData.suggestedCourses.map((course: any, index: number) => (
                  <CourseCard key={index} course={course} />
                ))}
              </div>
            </div>
          </div>
          
          {/* Right Side (Fixed on desktop) */}
          <div className="hidden md:block md:w-2/5 md:pl-6">
            <div className="sticky top-20" style={{ maxHeight: 'calc(100vh - 80px)', overflowY: 'auto' }}>
              {/* Enrollment Box */}
              <div className="bg-white p-6 rounded-lg border border-gray-200 mb-6">
                <h2 className="text-xl font-bold mb-4">Enrollment</h2>
                {isEnrolled ? (
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button variant="destructive" className="w-full">Unenroll from Course</Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                        <AlertDialogDescription>
                          This will unenroll you from the {courseData.courseTitle} course. Your progress will be lost.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction onClick={handleUnenroll}>Confirm</AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                ) : (
                  <Button className="w-full" onClick={handleEnroll}>Enroll in Course</Button>
                )}
              </div>
              
              {/* Course Info */}
              <div className="bg-white p-6 rounded-lg border border-gray-200">
                <h2 className="text-xl font-bold mb-4">About This Course</h2>
                <p className="text-gray-700 mb-4">
                  {courseData.courseDescription}
                </p>
                
                <div className="mb-4">
                  <span className="block text-sm text-gray-500 mb-1">Course Rating</span>
                  <div className="flex items-center">
                    <span className="text-2xl font-bold mr-2">{courseData.rating}</span>
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <svg 
                          key={i}
                          className={`w-5 h-5 ${i < Math.floor(courseData.rating) ? 'text-yellow-400' : 'text-gray-300'}`} 
                          fill="currentColor" 
                          viewBox="0 0 20 20"
                        >
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ))}
                    </div>
                  </div>
                </div>
                
                <div className="mb-4">
                  <span className="block text-sm text-gray-500 mb-1">Duration</span>
                  <span className="text-xl font-medium">{courseData.totalDuration}</span>
                </div>
                
                <div>
                  <span className="block text-sm text-gray-500 mb-1">Connect With Us</span>
                  <div className="flex space-x-4">
                    <a href={courseData.socialLinks.github} className="text-gray-600 hover:text-gray-800" aria-label="GitHub">
                      <Github size={24} />
                    </a>
                    <a href={courseData.socialLinks.twitter} className="text-gray-600 hover:text-gray-800" aria-label="Twitter">
                      <Twitter size={24} />
                    </a>
                    <a href={courseData.socialLinks.linkedin} className="text-gray-600 hover:text-gray-800" aria-label="LinkedIn">
                      <Linkedin size={24} />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseDetails;
