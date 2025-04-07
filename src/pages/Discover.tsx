
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Input } from "@/components/ui/input";
import NavBar from "@/components/NavBar";
import Breadcrumbs from "@/components/Breadcrumbs";
import { courses } from "@/data/courses";
import { Search } from "lucide-react";

const Discover = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();
  
  // Categorize courses based on provided data
  const frontendCourses = courses.filter(course => 
    ["HTML", "CSS", "JavaScript", "React"].includes(course.name)
  );
  
  const backendCourses = courses.filter(course => 
    ["Node.js", "TypeScript", "JavaScript"].includes(course.name) &&
    // Avoid duplicates that are already in frontend
    !frontendCourses.some(fc => fc.id === course.id)
  );
  
  const codingLanguages = courses.filter(course => 
    ["C", "C++", "Python", "Ruby"].includes(course.name)
  );
  
  // Filter courses based on search term
  const filteredFrontendCourses = frontendCourses.filter(course => 
    course.name.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  const filteredBackendCourses = backendCourses.filter(course => 
    course.name.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  const filteredCodingLanguages = codingLanguages.filter(course => 
    course.name.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  const handleCourseClick = (courseId: string) => {
    navigate(`/course/${courseId}`);
  };

  const CourseCard = ({ course }: { course: any }) => (
    <div 
      className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 flex flex-col items-center cursor-pointer"
      onClick={() => handleCourseClick(course.id)}
    >
      <img src={course.icon} alt={`${course.name} logo`} className="h-20 w-20 mb-4" />
      <h3 className="text-lg font-medium text-gray-800">{course.name}</h3>
    </div>
  );

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      {/* NavBar at the top */}
      <NavBar />
      
      {/* Breadcrumbs */}
      <Breadcrumbs currentPageTitle="Discover Courses" />
      
      {/* Main content */}
      <div className="flex-grow max-w-6xl mx-auto px-4 py-8 w-full">
        <h1 className="text-4xl font-bold text-center text-gray-800 mb-2">Learn by Building</h1>
        <p className="text-xl text-center text-zinc-500 mb-8">Hands-on projects, no more huddles</p>
         
        <div className="mb-10 max-w-md mx-auto relative">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <Search className="h-5 w-5 text-gray-400" />
          </div>
          <Input
            type="text"
            placeholder="Search for a language..."
            className="pl-10 w-full"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="space-y-12">
          {/* Frontend Section */}
          {filteredFrontendCourses.length > 0 && (
            <div>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">Frontend</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
                {filteredFrontendCourses.map((course, index) => (
                  <CourseCard key={`frontend-${index}`} course={course} />
                ))}
              </div>
            </div>
          )}

          {/* Backend Section */}
          {filteredBackendCourses.length > 0 && (
            <div>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">Backend</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
                {filteredBackendCourses.map((course, index) => (
                  <CourseCard key={`backend-${index}`} course={course} />
                ))}
              </div>
            </div>
          )}

          {/* Coding Languages Section */}
          {filteredCodingLanguages.length > 0 && (
            <div>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">Coding Languages</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
                {filteredCodingLanguages.map((course, index) => (
                  <CourseCard key={`coding-${index}`} course={course} />
                ))}
              </div>
            </div>
          )}

          {/* Show message if no courses match search */}
          {filteredFrontendCourses.length === 0 && 
           filteredBackendCourses.length === 0 && 
           filteredCodingLanguages.length === 0 && (
            <div className="text-center py-10">
              <p className="text-lg text-gray-600">No courses match your search. Try another term.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Discover;
