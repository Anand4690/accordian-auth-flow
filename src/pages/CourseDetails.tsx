import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { 
  Accordion, 
  AccordionContent, 
  AccordionItem, 
  AccordionTrigger 
} from "@/components/ui/accordion";
import { 
  Card, 
  CardContent, 
  CardFooter
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Star, Clock, Users } from "lucide-react";
import { courses, CourseType } from "@/data/courses";
import { useToast } from "@/components/ui/use-toast";

const CourseDetails = () => {
  const { courseId } = useParams<{ courseId: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isEnrolled, setIsEnrolled] = useState(false);
  
  const course = courses.find(c => c.id === courseId);
  const otherCourses = courses.filter(c => c.id !== courseId).slice(0, 3);
  
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

  const handleCourseClick = (courseId: string) => {
    navigate(`/course/${courseId}`);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Banner */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-4xl font-bold mb-2">{course.name}</h1>
          <p className="text-lg mb-4 max-w-3xl">{course.description}</p>
          <div className="flex items-center space-x-4">
            <div className="flex items-center">
              <Star className="h-5 w-5 text-yellow-400 mr-1" />
              <span>{course.rating}/5 rating</span>
            </div>
            <div className="flex items-center">
              <Clock className="h-5 w-5 mr-1" />
              <span>{course.duration} weeks</span>
            </div>
            <div className="flex items-center">
              <Users className="h-5 w-5 mr-1" />
              <span>{course.enrolled.toLocaleString()} students</span>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Projects */}
          <div className="lg:col-span-2">
            <h2 className="text-2xl font-bold mb-6">Course Content</h2>
            <Accordion type="single" collapsible className="w-full">
              {course.projects.map((project, index) => (
                <AccordionItem key={index} value={`item-${index}`}>
                  <AccordionTrigger className="py-4 hover:no-underline">
                    <div className="flex flex-col items-start text-left">
                      <div className="font-semibold text-lg">{project.title}</div>
                      <div className="text-sm text-gray-500 flex items-center mt-1">
                        <Clock className="h-4 w-4 mr-1" />
                        <span>{project.duration} hours</span>
                        <span className="mx-2">•</span>
                        <span>{project.progress}% complete</span>
                      </div>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent>
                    <ul className="space-y-2 pl-6 pt-2">
                      {project.topics.map((topic, i) => (
                        <li key={i} className="text-gray-700">
                          {topic}
                        </li>
                      ))}
                    </ul>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>

          {/* Right Column - Enrollment Card */}
          <div>
            <Card className="sticky top-8">
              <CardContent className="pt-6">
                <div className="text-center">
                  <h3 className="text-2xl font-bold mb-4">{isEnrolled ? "You're Enrolled" : "Enroll Today"}</h3>
                  
                  {isEnrolled ? (
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button variant="destructive" className="w-full">Unenroll</Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                          <AlertDialogDescription>
                            This will unenroll you from the {course.name} course. Your progress will be lost.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancel</AlertDialogCancel>
                          <AlertDialogAction onClick={handleUnenroll}>Confirm</AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  ) : (
                    <Button className="w-full" onClick={handleEnroll}>Enroll Now</Button>
                  )}
                  
                  <div className="mt-6 space-y-3">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500">Rating</span>
                      <span className="font-medium flex items-center">
                        <Star className="h-4 w-4 text-yellow-400 mr-1" />
                        {course.rating}/5
                      </span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500">Duration</span>
                      <span className="font-medium">{course.duration} weeks</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500">Students</span>
                      <span className="font-medium">{course.enrolled.toLocaleString()}</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Other Courses */}
            <div className="mt-8">
              <h3 className="text-xl font-bold mb-4">Other Courses</h3>
              <div className="space-y-4">
                {otherCourses.map(otherCourse => (
                  <Card 
                    key={otherCourse.id} 
                    className="cursor-pointer hover:shadow-sm transition-shadow"
                    onClick={() => handleCourseClick(otherCourse.id)}
                  >
                    <CardContent className="p-4">
                      <div className="flex items-center">
                        <div className="w-10 h-10 flex items-center justify-center rounded-lg bg-primary/10 mr-4">
                          <img 
                            src={otherCourse.icon} 
                            alt={otherCourse.name} 
                            className="w-6 h-6"
                          />
                        </div>
                        <div>
                          <h4 className="font-semibold">{otherCourse.name}</h4>
                          <div className="text-xs text-gray-500">
                            {otherCourse.duration} weeks • {otherCourse.rating}/5
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseDetails;
