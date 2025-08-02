import React, { useState, useEffect } from 'react';
import { 
  Star, 
  Users, 
  Clock, 
  BookOpen, 
  Play, 
  Lock, 
  CheckCircle, 
  User,
  Calendar,
  Award,
  ChevronRight
} from 'lucide-react';

// Mock data - replace with actual API calls
const mockCourseData = {
  id: '1',
  title: 'Complete React Developer Course',
  description: 'Master React from basics to advanced concepts including Hooks, Context, Redux, and more. Build real-world projects and become a confident React developer.',
  category: 'Web Development',
  instructor: {
    id: '1',
    name: 'Sarah Johnson',
    bio: 'Full-stack developer with 10+ years of experience. Former senior engineer at Google and Facebook.',
    avatar: null,
    rating: 4.9,
    students: 25000,
    courses: 12
  },
  rating: 4.8,
  students: 12450,
  duration: '40 hours',
  lessons: 120,
  level: 'Beginner to Advanced',
  language: 'English',
  lastUpdated: '2024-02-15',
  price: 'Free',
  enrolled: false,
  progress: 0,
  thumbnail: null,
  tags: ['React', 'JavaScript', 'Frontend', 'Web Development'],
  prerequisites: ['Basic HTML', 'Basic CSS', 'JavaScript Fundamentals'],
  whatYouWillLearn: [
    'Build modern React applications from scratch',
    'Master React Hooks and functional components',
    'Understand state management with Context and Redux',
    'Learn React Router for navigation',
    'Build responsive user interfaces',
    'Deploy React applications to production',
    'Test React applications',
    'Performance optimization techniques'
  ],
  lessons: [
    {
      id: '1',
      title: 'Introduction to React',
      duration: '15 min',
      type: 'video',
      preview: true,
      completed: false
    },
    {
      id: '2',
      title: 'Setting Up Development Environment',
      duration: '20 min',
      type: 'video',
      preview: false,
      completed: false
    },
    {
      id: '3',
      title: 'Your First React Component',
      duration: '25 min',
      type: 'video',
      preview: false,
      completed: false
    },
    {
      id: '4',
      title: 'Understanding JSX',
      duration: '18 min',
      type: 'video',
      preview: false,
      completed: false
    },
    {
      id: '5',
      title: 'Props and State',
      duration: '30 min',
      type: 'video',
      preview: false,
      completed: false
    }
  ],
  reviews: [
    {
      id: '1',
      user: 'John Doe',
      rating: 5,
      comment: 'Excellent course! Very well structured and easy to follow.',
      date: '2024-02-10',
      avatar: null
    },
    {
      id: '2',
      user: 'Jane Smith',
      rating: 5,
      comment: 'Sarah is an amazing instructor. Learned so much!',
      date: '2024-02-08',
      avatar: null
    },
    {
      id: '3',
      user: 'Mike Johnson',
      rating: 4,
      comment: 'Great content, but could use more practical examples.',
      date: '2024-02-05',
      avatar: null
    }
  ]
};

const CourseDetails = () => {
  const [course, setCourse] = useState(mockCourseData);
  const [activeTab, setActiveTab] = useState('overview');
  const [loading, setLoading] = useState(false);
  const [enrolling, setEnrolling] = useState(false);

  useEffect(() => {
    // Simulate API call
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);

  const handleEnroll = async () => {
    setEnrolling(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      setCourse(prev => ({ ...prev, enrolled: true }));
      alert('Successfully enrolled in the course!');
    } catch (error) {
      alert('Failed to enroll. Please try again.');
    } finally {
      setEnrolling(false);
    }
  };

  const LessonItem = ({ lesson, index }: any) => (
    <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50">
      <div className="flex items-center space-x-4">
        <div className="flex-shrink-0">
          {lesson.completed ? (
            <CheckCircle className="h-6 w-6 text-green-500" />
          ) : lesson.preview ? (
            <Play className="h-6 w-6 text-blue-500" />
          ) : (
            <Lock className="h-6 w-6 text-gray-400" />
          )}
        </div>
        <div>
          <h4 className="text-sm font-medium text-gray-900">
            {index + 1}. {lesson.title}
          </h4>
          <p className="text-sm text-gray-500">{lesson.duration}</p>
        </div>
      </div>
      <div className="flex items-center space-x-2">
        {lesson.preview && (
          <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">
            Preview
          </span>
        )}
        <ChevronRight className="h-4 w-4 text-gray-400" />
      </div>
    </div>
  );

  const ReviewItem = ({ review }: any) => (
    <div className="border-b border-gray-200 pb-4">
      <div className="flex items-start space-x-3">
        <div className="h-8 w-8 bg-gray-300 rounded-full flex items-center justify-center">
          <User className="h-4 w-4 text-gray-600" />
        </div>
        <div className="flex-1">
          <div className="flex items-center space-x-2">
            <h4 className="text-sm font-medium text-gray-900">{review.user}</h4>
            <div className="flex items-center">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`h-4 w-4 ${
                    i < review.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
                  }`}
                />
              ))}
            </div>
            <span className="text-sm text-gray-500">{review.date}</span>
          </div>
          <p className="mt-2 text-sm text-gray-700">{review.comment}</p>
        </div>
      </div>
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
      {/* Hero Section */}
      <div className="bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <div className="mb-4">
                <span className="bg-blue-600 text-white text-sm px-3 py-1 rounded-full">
                  {course.category}
                </span>
              </div>
              <h1 className="text-3xl lg:text-4xl font-bold mb-4">
                {course.title}
              </h1>
              <p className="text-lg text-gray-300 mb-6">
                {course.description}
              </p>
              
              <div className="flex items-center space-x-6 text-sm">
                <div className="flex items-center">
                  <Star className="h-4 w-4 text-yellow-400 mr-1" />
                  <span className="font-medium">{course.rating}</span>
                  <span className="text-gray-300 ml-1">({course.students.toLocaleString()} students)</span>
                </div>
                <div className="flex items-center">
                  <Clock className="h-4 w-4 mr-1" />
                  <span>{course.duration}</span>
                </div>
                <div className="flex items-center">
                  <BookOpen className="h-4 w-4 mr-1" />
                  <span>{course.lessons} lessons</span>
                </div>
              </div>

              <div className="mt-6 flex items-center space-x-4">
                <div className="flex items-center">
                  <div className="h-10 w-10 bg-gray-600 rounded-full flex items-center justify-center mr-3">
                    <User className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="font-medium">{course.instructor.name}</p>
                    <p className="text-sm text-gray-300">Instructor</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Course Card */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-lg shadow-lg p-6 sticky top-6">
                <div className="text-center mb-6">
                  <div className="h-48 bg-gradient-to-br from-blue-400 to-purple-500 rounded-lg flex items-center justify-center mb-4">
                    <Play className="h-16 w-16 text-white" />
                  </div>
                  <div className="text-3xl font-bold text-gray-900 mb-2">
                    {course.price}
                  </div>
                </div>

                <button
                  onClick={handleEnroll}
                  disabled={enrolling || course.enrolled}
                  className={`w-full py-3 px-4 rounded-md font-medium text-white mb-4 ${
                    course.enrolled
                      ? 'bg-green-600 cursor-not-allowed'
                      : 'bg-blue-600 hover:bg-blue-700'
                  } disabled:opacity-50`}
                >
                  {enrolling ? (
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mx-auto"></div>
                  ) : course.enrolled ? (
                    'Enrolled - Start Learning'
                  ) : (
                    'Enroll Now'
                  )}
                </button>

                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Level:</span>
                    <span className="font-medium">{course.level}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Language:</span>
                    <span className="font-medium">{course.language}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Last Updated:</span>
                    <span className="font-medium">{course.lastUpdated}</span>
                  </div>
                </div>

                <div className="mt-6 pt-6 border-t border-gray-200">
                  <h4 className="font-medium text-gray-900 mb-3">This course includes:</h4>
                  <ul className="space-y-2 text-sm text-gray-600">
                    <li className="flex items-center">
                      <BookOpen className="h-4 w-4 mr-2" />
                      {course.lessons} lessons
                    </li>
                    <li className="flex items-center">
                      <Clock className="h-4 w-4 mr-2" />
                      {course.duration} of content
                    </li>
                    <li className="flex items-center">
                      <Award className="h-4 w-4 mr-2" />
                      Certificate of completion
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Content Tabs */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="lg:grid lg:grid-cols-3 lg:gap-8">
          <div className="lg:col-span-2">
            {/* Tab Navigation */}
            <div className="border-b border-gray-200 mb-8">
              <nav className="-mb-px flex space-x-8">
                {['overview', 'curriculum', 'reviews'].map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`py-2 px-1 border-b-2 font-medium text-sm capitalize ${
                      activeTab === tab
                        ? 'border-blue-500 text-blue-600'
                        : 'border-transparent text-gray-500 hover:text-gray-700'
                    }`}
                  >
                    {tab}
                  </button>
                ))}
              </nav>
            </div>

            {/* Tab Content */}
            {activeTab === 'overview' && (
              <div className="space-y-8">
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">
                    What you'll learn
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {course.whatYouWillLearn.map((item, index) => (
                      <div key={index} className="flex items-start">
                        <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-700">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">
                    Prerequisites
                  </h3>
                  <ul className="space-y-2">
                    {course.prerequisites.map((prereq, index) => (
                      <li key={index} className="flex items-center text-gray-700">
                        <div className="h-1.5 w-1.5 bg-gray-400 rounded-full mr-3"></div>
                        {prereq}
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">
                    About the Instructor
                  </h3>
                  <div className="bg-white rounded-lg border border-gray-200 p-6">
                    <div className="flex items-start space-x-4">
                      <div className="h-16 w-16 bg-gray-300 rounded-full flex items-center justify-center">
                        <User className="h-8 w-8 text-gray-600" />
                      </div>
                      <div className="flex-1">
                        <h4 className="text-lg font-semibold text-gray-900">
                          {course.instructor.name}
                        </h4>
                        <p className="text-gray-600 mb-3">{course.instructor.bio}</p>
                        <div className="flex items-center space-x-6 text-sm text-gray-500">
                          <div className="flex items-center">
                            <Star className="h-4 w-4 text-yellow-400 mr-1" />
                            <span>{course.instructor.rating} rating</span>
                          </div>
                          <div className="flex items-center">
                            <Users className="h-4 w-4 mr-1" />
                            <span>{course.instructor.students.toLocaleString()} students</span>
                          </div>
                          <div className="flex items-center">
                            <BookOpen className="h-4 w-4 mr-1" />
                            <span>{course.instructor.courses} courses</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'curriculum' && (
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-6">
                  Course Content
                </h3>
                <div className="space-y-4">
                  {course.lessons.map((lesson, index) => (
                    <LessonItem key={lesson.id} lesson={lesson} index={index} />
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'reviews' && (
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-6">
                  Student Reviews
                </h3>
                <div className="space-y-6">
                  {course.reviews.map((review) => (
                    <ReviewItem key={review.id} review={review} />
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-6">
              <div className="bg-white rounded-lg border border-gray-200 p-6 mb-6">
                <h4 className="font-semibold text-gray-900 mb-4">Course Tags</h4>
                <div className="flex flex-wrap gap-2">
                  {course.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="bg-blue-100 text-blue-800 text-sm px-3 py-1 rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
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