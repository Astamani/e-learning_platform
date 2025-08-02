import React, { useState, useEffect } from 'react';
import { BookOpen, Users, TrendingUp, DollarSign, Plus, Edit, Eye, MoreVertical, Calendar, Clock } from 'lucide-react';

// Mock data - replace with actual API calls
const mockData = {
  instructor: {
    name: 'Dr. Sarah Johnson',
    email: 'sarah@instructor.com',
    bio: 'Full-stack developer with 10+ years of experience',
    profilePicture: null
  },
  stats: {
    totalCourses: 8,
    totalStudents: 15670,
    totalRevenue: 125400,
    avgRating: 4.8
  },
  courses: [
    {
      id: '1',
      title: 'Complete React Developer Course',
      description: 'Master React from basics to advanced concepts',
      category: 'Web Development',
      status: 'published',
      students: 5420,
      rating: 4.9,
      revenue: 45200,
      lessons: 42,
      createdAt: '2024-01-15',
      lastUpdated: '2024-02-01'
    },
    {
      id: '2',
      title: 'Advanced JavaScript Patterns',
      description: 'Deep dive into JavaScript design patterns',
      category: 'Programming',
      status: 'published',
      students: 3210,
      rating: 4.7,
      revenue: 28100,
      lessons: 28,
      createdAt: '2024-02-10',
      lastUpdated: '2024-02-15'
    },
    {
      id: '3',
      title: 'Node.js Microservices',
      description: 'Build scalable microservices with Node.js',
      category: 'Backend',
      status: 'draft',
      students: 0,
      rating: 0,
      revenue: 0,
      lessons: 15,
      createdAt: '2024-03-01',
      lastUpdated: '2024-03-10'
    }
  ],
  recentEnrollments: [
    {
      id: '1',
      studentName: 'John Doe',
      courseName: 'Complete React Developer Course',
      enrolledAt: '2 hours ago'
    },
    {
      id: '2',
      studentName: 'Jane Smith',
      courseName: 'Advanced JavaScript Patterns',
      enrolledAt: '5 hours ago'
    },
    {
      id: '3',
      studentName: 'Mike Johnson',
      courseName: 'Complete React Developer Course',
      enrolledAt: '1 day ago'
    }
  ],
  monthlyStats: [
    { month: 'Jan', students: 120, revenue: 8400 },
    { month: 'Feb', students: 180, revenue: 12600 },
    { month: 'Mar', students: 240, revenue: 16800 },
    { month: 'Apr', students: 300, revenue: 21000 },
    { month: 'May', students: 280, revenue: 19600 },
    { month: 'Jun', students: 350, revenue: 24500 }
  ]
};

const InstructorDashboard = () => {
  const [data, setData] = useState(mockData);
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');

  useEffect(() => {
    // Simulate API call
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);

  const StatCard = ({ icon: Icon, title, value, subtitle, color }: any) => (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex items-center">
        <div className={`flex-shrink-0 p-3 rounded-lg ${color}`}>
          <Icon className="h-6 w-6 text-white" />
        </div>
        <div className="ml-4">
          <p className="text-sm font-medium text-gray-600">{title}</p>
          <p className="text-2xl font-semibold text-gray-900">{value}</p>
          {subtitle && <p className="text-sm text-gray-500">{subtitle}</p>}
        </div>
      </div>
    </div>
  );

  const CourseCard = ({ course }: any) => (
    <div className="bg-white rounded-lg shadow hover:shadow-md transition-shadow p-6">
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <div className="flex items-center mb-2">
            <h3 className="text-lg font-semibold text-gray-900">{course.title}</h3>
            <span className={`ml-2 inline-block px-2 py-1 text-xs rounded-full ${
              course.status === 'published' 
                ? 'bg-green-100 text-green-800' 
                : 'bg-yellow-100 text-yellow-800'
            }`}>
              {course.status}
            </span>
          </div>
          <p className="text-sm text-gray-600 mb-2">{course.description}</p>
          <p className="text-xs text-blue-600 font-medium">{course.category}</p>
        </div>
        <div className="relative">
          <button className="p-2 text-gray-400 hover:text-gray-600">
            <MoreVertical className="h-5 w-5" />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-4">
        <div className="text-center p-3 bg-gray-50 rounded-lg">
          <p className="text-2xl font-semibold text-gray-900">{course.students}</p>
          <p className="text-sm text-gray-600">Students</p>
        </div>
        <div className="text-center p-3 bg-gray-50 rounded-lg">
          <p className="text-2xl font-semibold text-gray-900">{course.lessons}</p>
          <p className="text-sm text-gray-600">Lessons</p>
        </div>
      </div>

      {course.status === 'published' && (
        <div className="flex items-center justify-between mb-4 text-sm">
          <div className="flex items-center text-yellow-600">
            <span className="mr-1">⭐</span>
            <span>{course.rating}</span>
          </div>
          <div className="text-green-600 font-medium">
            ${course.revenue.toLocaleString()}
          </div>
        </div>
      )}

      <div className="flex space-x-2">
        <button className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors text-sm">
          <Edit className="h-4 w-4 inline mr-2" />
          Edit
        </button>
        <button className="flex-1 bg-gray-100 text-gray-700 py-2 px-4 rounded-md hover:bg-gray-200 transition-colors text-sm">
          <Eye className="h-4 w-4 inline mr-2" />
          View
        </button>
      </div>
    </div>
  );

  const EnrollmentItem = ({ enrollment }: any) => (
    <div className="flex items-center space-x-3 py-3 border-b border-gray-100 last:border-b-0">
      <div className="h-10 w-10 bg-blue-100 rounded-full flex items-center justify-center">
        <span className="text-sm font-medium text-blue-600">
          {enrollment.studentName.split(' ').map((n: string) => n[0]).join('')}
        </span>
      </div>
      <div className="flex-1">
        <p className="text-sm font-medium text-gray-900">{enrollment.studentName}</p>
        <p className="text-sm text-gray-600">{enrollment.courseName}</p>
      </div>
      <div className="text-sm text-gray-400">{enrollment.enrolledAt}</div>
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
                Instructor Dashboard
              </h1>
              <p className="text-gray-600">Welcome back, {data.instructor.name}!</p>
            </div>
            <div className="flex items-center space-x-4">
              <button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors">
                <Plus className="h-4 w-4 inline mr-2" />
                Create Course
              </button>
            </div>
          </div>

          {/* Navigation Tabs */}
          <div className="border-b border-gray-200">
            <nav className="-mb-px flex space-x-8">
              {['overview', 'courses', 'analytics'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`py-2 px-1 border-b-2 font-medium text-sm capitalize ${
                    activeTab === tab
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  {tab}
                </button>
              ))}
            </nav>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeTab === 'overview' && (
          <>
            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <StatCard
                icon={BookOpen}
                title="Total Courses"
                value={data.stats.totalCourses}
                color="bg-blue-600"
              />
              <StatCard
                icon={Users}
                title="Total Students"
                value={data.stats.totalStudents.toLocaleString()}
                color="bg-green-600"
              />
              <StatCard
                icon={DollarSign}
                title="Total Revenue"
                value={`$${data.stats.totalRevenue.toLocaleString()}`}
                color="bg-purple-600"
              />
              <StatCard
                icon={TrendingUp}
                title="Average Rating"
                value={data.stats.avgRating}
                subtitle="⭐⭐⭐⭐⭐"
                color="bg-yellow-600"
              />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Recent Courses */}
              <div className="lg:col-span-2">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-semibold text-gray-900">My Courses</h2>
                  <button 
                    onClick={() => setActiveTab('courses')}
                    className="text-blue-600 hover:text-blue-700 text-sm font-medium"
                  >
                    View All
                  </button>
                </div>
                <div className="space-y-6">
                  {data.courses.slice(0, 3).map((course) => (
                    <CourseCard key={course.id} course={course} />
                  ))}
                </div>
              </div>

              {/* Recent Enrollments */}
              <div>
                <div className="bg-white rounded-lg shadow p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Enrollments</h3>
                  <div className="space-y-1">
                    {data.recentEnrollments.map((enrollment) => (
                      <EnrollmentItem key={enrollment.id} enrollment={enrollment} />
                    ))}
                  </div>
                  <button className="w-full mt-4 text-center text-blue-600 hover:text-blue-700 text-sm font-medium">
                    View All Enrollments
                  </button>
                </div>
              </div>
            </div>
          </>
        )}

        {activeTab === 'courses' && (
          <div>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-gray-900">All Courses</h2>
              <button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors">
                <Plus className="h-4 w-4 inline mr-2" />
                Create New Course
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {data.courses.map((course) => (
                <CourseCard key={course.id} course={course} />
              ))}
            </div>
          </div>
        )}

        {activeTab === 'analytics' && (
          <div>
            <h2 className="text-xl font-semibold text-gray-900 mb-6">Analytics</h2>
            
            {/* Monthly Stats */}
            <div className="bg-white rounded-lg shadow p-6 mb-8">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Monthly Performance</h3>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Students Chart */}
                <div>
                  <h4 className="text-sm font-medium text-gray-700 mb-4">New Students per Month</h4>
                  <div className="space-y-2">
                    {data.monthlyStats.map((stat, index) => (
                      <div key={index} className="flex items-center justify-between">
                        <span className="text-sm text-gray-600">{stat.month}</span>
                        <div className="flex items-center space-x-2">
                          <div className="w-32 bg-gray-200 rounded-full h-2">
                            <div 
                              className="bg-blue-600 h-2 rounded-full"
                              style={{ width: `${(stat.students / 350) * 100}%` }}
                            ></div>
                          </div>
                          <span className="text-sm font-medium text-gray-900">{stat.students}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Revenue Chart */}
                <div>
                  <h4 className="text-sm font-medium text-gray-700 mb-4">Revenue per Month</h4>
                  <div className="space-y-2">
                    {data.monthlyStats.map((stat, index) => (
                      <div key={index} className="flex items-center justify-between">
                        <span className="text-sm text-gray-600">{stat.month}</span>
                        <div className="flex items-center space-x-2">
                          <div className="w-32 bg-gray-200 rounded-full h-2">
                            <div 
                              className="bg-green-600 h-2 rounded-full"
                              style={{ width: `${(stat.revenue / 25000) * 100}%` }}
                            ></div>
                          </div>
                          <span className="text-sm font-medium text-gray-900">${stat.revenue}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Course Performance */}
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Course Performance</h3>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="text-left py-3 px-4">Course</th>
                      <th className="text-left py-3 px-4">Students</th>
                      <th className="text-left py-3 px-4">Rating</th>
                      <th className="text-left py-3 px-4">Revenue</th>
                      <th className="text-left py-3 px-4">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data.courses.map((course) => (
                      <tr key={course.id} className="border-b border-gray-100">
                        <td className="py-3 px-4">{course.title}</td>
                        <td className="py-3 px-4">{course.students}</td>
                        <td className="py-3 px-4">
                          {course.status === 'published' ? course.rating : 'N/A'}
                        </td>
                        <td className="py-3 px-4">${course.revenue.toLocaleString()}</td>
                        <td className="py-3 px-4">
                          <span className={`inline-block px-2 py-1 text-xs rounded-full ${
                            course.status === 'published' 
                              ? 'bg-green-100 text-green-800' 
                              : 'bg-yellow-100 text-yellow-800'
                          }`}>
                            {course.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default InstructorDashboard;