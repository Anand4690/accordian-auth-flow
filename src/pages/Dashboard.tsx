
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight } from "lucide-react";

const Dashboard = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  
  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const handleDiscoverCourses = () => {
    navigate("/discover");
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Dashboard</h1>
          <Button variant="outline" onClick={handleLogout}>
            Sign Out
          </Button>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow mb-8">
          <h2 className="text-xl font-semibold mb-4">Welcome, {user?.name}!</h2>
          <p className="text-gray-600 mb-6">
            You have successfully logged in to the application. Start exploring our programming courses.
          </p>
          
          <Button onClick={handleDiscoverCourses} className="flex items-center">
            Discover Courses <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
        
        <Card>
          <CardContent className="p-6">
            <h2 className="text-xl font-semibold mb-4">Get Started</h2>
            <p className="text-gray-600 mb-4">
              Browse our catalog of programming courses and enhance your development skills.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
              <div className="p-4 bg-blue-50 rounded-lg">
                <h3 className="font-medium mb-2">Explore Courses</h3>
                <p className="text-sm text-gray-600">
                  Browse through our extensive collection of programming languages.
                </p>
              </div>
              <div className="p-4 bg-green-50 rounded-lg">
                <h3 className="font-medium mb-2">Track Progress</h3>
                <p className="text-sm text-gray-600">
                  Monitor your learning journey and track completion.
                </p>
              </div>
              <div className="p-4 bg-purple-50 rounded-lg">
                <h3 className="font-medium mb-2">Build Projects</h3>
                <p className="text-sm text-gray-600">
                  Apply your knowledge by working on real-world projects.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
