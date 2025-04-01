
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Search } from "lucide-react";
import { courses } from "@/data/courses";

const Discover = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();
  
  const filteredCourses = courses.filter(course => 
    course.name.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  const handleCourseClick = (courseId: string) => {
    navigate(`/course/${courseId}`);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Discover Courses</h1>
        </div>
        
        <div className="relative mb-8">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <Search className="h-5 w-5 text-gray-400" />
          </div>
          <Input
            type="text"
            placeholder="Search for a programming language..."
            className="pl-10 w-full md:w-1/2 lg:w-1/3"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredCourses.map((course) => (
            <Card 
              key={course.id} 
              className="cursor-pointer hover:shadow-lg transition-shadow duration-200"
              onClick={() => handleCourseClick(course.id)}
            >
              <CardContent className="p-6">
                <div className="w-16 h-16 flex items-center justify-center rounded-lg bg-primary/10 mb-4">
                  <img 
                    src={course.icon} 
                    alt={course.name} 
                    className="w-10 h-10"
                  />
                </div>
                <h3 className="text-xl font-semibold mb-2">{course.name}</h3>
                <div className="flex items-center text-sm text-gray-500">
                  <span>{course.duration} weeks</span>
                  <span className="mx-2">•</span>
                  <span>{course.rating}/5 rating</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
        
        {filteredCourses.length === 0 && (
          <div className="text-center py-12">
            <h3 className="text-lg font-medium text-gray-900">No courses found</h3>
            <p className="mt-2 text-gray-500">
              Try adjusting your search term
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Discover;
