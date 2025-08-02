import React, { useState, useEffect } from 'react';
import { BookOpen, Clock, Award, TrendingUp, Play, ChevronRight, Calendar, Users, Star } from 'lucide-react';

// Mock data - replace with actual API calls
const mockData = {
  user: {
    name: 'John Student',
    email: 'john@student.com',
    profilePicture: null
  },
  stats: {
    enrolledCourses: 5,
    completedCourses: 2,
    totalHours: 45,
    certificates: 2
  },
  enrolledCourses: [
    {
      id: '1',
      title: 'React Fundamentals',
      description: 'Learn the basics of React development',
      category: 'Web Development',
      progress: 75,
      instructor: { name: 'Jane Doe' },
      totalLessons: 12,
      completedLessons: 9,
      estimatedTime: '8 hours',
      thumbnail: null
    },
    {
      id: '2',
      title: 'TypeScript Mastery',
      description: 'Advanced TypeScript concepts and patterns',
      category: 'Programming',
      progress: 45,
      instructor: { name: 'Mike Johnson' },
      totalLessons: 15,
      completedLessons: 7,
      estimatedTime: '12 hours',
      thumbnail: null
    },
    {
      id: '3',
      title: 'Node.js Backend Development',
      description: 'Build scalable backend applications',
      category: 'Backend',
      progress: 20,
      instructor: { name: 'Sarah Wilson' },
      totalLessons: 20,
      completedLessons: 4,
      estimatedTime: '15 hours',
      thumbnail: null
    }
  ],
  recentActivity: [
    {
      id: '1',
      type: 'lesson_completed',
      title: 'React Hooks Deep Dive',
      course: 'React Fundamentals',
      timestamp: '2 hours ago'
    },
    {
      id: '2',
      type: 'course_enrolled',
      title: 'Node.js Backend Development',
      course: 'Node.js Backend Development',
      timestamp: '1 day ago'
    },
    {
      id: '3',
      type: 'certificate_earned',
      title: 'JavaScript Essentials',
      course: 'JavaScript Essentials',
      timestamp: '3 days ago'
    }
  ],
  recommendedCourses: [
    {
      id: '4',
      title: 'Advanced React Patterns',
      description: 'Master advanced React concepts',
      category: 'Web Development',
      instructor: { name: 'Alex Brown' },
      rating: 4.8,
      students: 1234,
      thumbnail: null
    },
    {
      id: '5',
      title: 'GraphQL with Node.js',
      description: 'Build APIs with GraphQL',
      category: 'Backend',
      instructor: { name: 'Emily Davis' },
      rating: 4.6,
      students: 892,
      thumbnail: null
    }
  ]
};

const StudentDashboard = () => {
  const [data, setData] = useState(mockData);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Simulate API call
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);

  const StatCard = ({ icon: Icon, title, value, color }: any) => (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex items-center">
        <div className={`flex-shrink-0 p-3 rounded-lg ${color}`}>
          <Icon className="h-6 w-6 text-white" />
        </div>
        <div className="ml-4">
          <p className="text-sm font-medium text-gray-600">{title}</p>
          <p className="text-2xl font-semibold text-gray-900">{value}</p>
        </div>
      </div>
    </div>
  );

  const CourseCard = ({ course }: any) => (
    <div className="bg-white rounded-lg shadow hover:shadow-md transition-shadow p-6">
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-gray-900 mb-1">{course.title}</h3>
          <p className="text-sm text-gray-600 mb-2">{course.description}</p>
          <p className="text-xs text-blue-600 font-medium">{course.category}</p>
        </div>
        <button className="ml-4 p-2 text-gray-400 hover:text-gray-600">
          <ChevronRight className="h-5 w-5" />
        </button>
      </div>
      
      <div className="mb-4">
        <div className="flex items-center justify-between text-sm text-gray-600 mb-2">
          <span>Progress</span>
          <span>{course.progress}%</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div 
            className="bg-blue-600 h-2 rounded-full transition-all duration-300"
            style={{ width: `${course.progress}%` }}
          ></div>
        </div>
      </div>

      <div className="flex items-center justify-between text-sm text-gray-600">
        <span className="flex items-center">
          <BookOpen className="h-4 w-4 mr-1" />
          {course.completedLessons}/{course.totalLessons} lessons
        </span>
        <span className="flex items-center">
          <Clock className="h-4 w-4 mr-1" />
          {course.estimatedTime}
        </span>
      </div>

      <div className="mt-4 pt-4 border-t border-gray-100">
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-600">by {course.instructor.name}</span>
          <button className="bg-blue-600 text-white px-4 py-2 rounded-md text-sm hover:bg-blue-700 transition-colors">
            Continue
          </button>
        </div>
      </div>
    </div>
  );

  const ActivityItem = ({ activity }: any) => (
    <div className="flex items-center space-x-3 py-3">
      <div className="flex-shrink-0">
        {activity.type === 'lesson_completed' && (
          <div className="h-8 w-8 bg-green-100 rounded-full flex items-center justify-center">
            <Play className="h-4 w-4 text-green-600" />
          </div>
        )}
        {activity.type === 'course_enrolled' && (
          <div className="h-8 w-8 bg-blue-100 rounded-full flex items-center justify-center">
            <BookOpen className="h-4 w-4 text-blue-600" />
          </div>
        )}
        {activity.type === 'certificate_earned' && (
          <div className="h-8 w-8 bg-yellow-100 rounded-full flex items-center justify-center">
            <Award className="h-4 w-4 text-yellow-600" />
          </div>
        )}
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium text-gray-900">{activity.title}</p>
        <p className="text-sm text-gray-500">{activity.course}</p>
      </div>
      <div className="text-sm text-gray-400">{activity.timestamp}</div>
    </div>
  );

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                Welcome back, {data.user.name}!
              </h1>
              <p className="text-gray-600">Continue your learning journey</p>
            </div>
            <div className="flex items-center space-x-4">
              <button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors">
                Browse Courses
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard
            icon={BookOpen}
            title="Enrolled Courses"
            value={data.stats.enrolledCourses}
            color="bg-blue-600"
          />
          <StatCard
            icon={Award}
            title="Completed Courses"
            value={data.stats.completedCourses}
            color="bg-green-600"
          />
          <StatCard
            icon={Clock}
            title="Learning Hours"
            value={data.stats.totalHours}
            color="bg-purple-600"
          />
          <StatCard
            icon={TrendingUp}
            title="Certificates"
            value={data.stats.certificates}
            color="bg-yellow-600"
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* My Courses */}
          <div className="lg:col-span-2">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-gray-900">My Courses</h2>
              <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
                View All
              </button>
            </div>
            <div className="space-y-6">
              {data.enrolledCourses.map((course) => (
                <CourseCard key={course.id} course={course} />
              ))}
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            {/* Recent Activity */}
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h3>
              <div className="space-y-1">
                {data.recentActivity.map((activity) => (
                  <ActivityItem key={activity.id} activity={activity} />
                ))}
              </div>
            </div>

            {/* Recommended Courses */}
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Recommended for You</h3>
              <div className="space-y-4">
                {data.recommendedCourses.map((course) => (
                  <div key={course.id} className="border border-gray-200 rounded-lg p-4">
                    <h4 className="font-medium text-gray-900 mb-1">{course.title}</h4>
                    <p className="text-sm text-gray-600 mb-3">{course.description}</p>
                    <div className="flex items-center justify-between text-sm text-gray-500 mb-3">
                      <span className="flex items-center">
                        <Star className="h-4 w-4 text-yellow-400 mr-1" />
                        {course.rating}
                      </span>
                      <span className="flex items-center">
                        <Users className="h-4 w-4 mr-1" />
                        {course.students}
                      </span>
                    </div>
                    <button className="w-full bg-gray-100 text-gray-700 py-2 rounded-md hover:bg-gray-200 transition-colors text-sm">
                      View Course
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentDashboard;