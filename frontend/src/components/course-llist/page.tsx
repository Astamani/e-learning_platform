import React, { useState, useEffect } from 'react';
import { Search, Filter, Star, Users, Clock, BookOpen, ChevronDown } from 'lucide-react';

// Mock data - replace with actual API calls
const mockCourses = [
  {
    id: '1',
    title: 'Complete React Developer Course',
    description: 'Master React from basics to advanced concepts including Hooks, Context, and Redux',
    category: 'Web Development',
    instructor: { name: 'Sarah Johnson', avatar: null },
    rating: 4.8,
    students: 12450,
    duration: '40 hours',
    lessons: 120,
    price: 'Free',
    level: 'Beginner',
    thumbnail: null,
    tags: ['React', 'JavaScript', 'Frontend']
  },
  {
    id: '2',
    title: 'Node.js Backend Masterclass',
    description: 'Build scalable backend applications with Node.js, Express, and MongoDB',
    category: 'Backend Development',
    instructor: { name: 'Mike Chen', avatar: null },
    rating: 4.7,
    students: 8920,
    duration: '35 hours',
    lessons: 95,
    price: 'Free',
    level: 'Intermediate',
    thumbnail: null,
    tags: ['Node.js', 'Express', 'MongoDB']
  },
  {
    id: '3',
    title: 'Python for Data Science',
    description: 'Learn Python programming for data analysis, visualization, and machine learning',
    category: 'Data Science',
    instructor: { name: 'Dr. Emily Rodriguez', avatar: null },
    rating: 4.9,
    students: 15670,
    duration: '50 hours',
    lessons: 140,
    price: 'Free',
    level: 'Beginner',
    thumbnail: null,
    tags: ['Python', 'Data Science', 'Machine Learning']
  },
  {
    id: '4',
    title: 'UI/UX Design Fundamentals',
    description: 'Master the principles of user interface and user experience design',
    category: 'Design',
    instructor: { name: 'Alex Thompson', avatar: null },
    rating: 4.6,
    students: 6340,
    duration: '25 hours',
    lessons: 80,
    price: 'Free',
    level: 'Beginner',
    thumbnail: null,
    tags: ['UI/UX', 'Design', 'Figma']
  },
  {
    id: '5',
    title: 'Advanced TypeScript',
    description: 'Deep dive into TypeScript advanced features and best practices',
    category: 'Programming',
    instructor: { name: 'David Wilson', avatar: null },
    rating: 4.8,
    students: 4210,
    duration: '30 hours',
    lessons: 75,
    price: 'Free',
    level: 'Advanced',
    thumbnail: null,
    tags: ['TypeScript', 'JavaScript', 'Programming']
  },
  {
    id: '6',
    title: 'DevOps with Docker & Kubernetes',
    description: 'Learn containerization and orchestration for modern applications',
    category: 'DevOps',
    instructor: { name: 'Lisa Chang', avatar: null },
    rating: 4.7,
    students: 7890,
    duration: '45 hours',
    lessons: 110,
    price: 'Free',
    level: 'Intermediate',
    thumbnail: null,
    tags: ['Docker', 'Kubernetes', 'DevOps']
  }
];

const categories = ['All', 'Web Development', 'Backend Development', 'Data Science', 'Design', 'Programming', 'DevOps'];
const levels = ['All Levels', 'Beginner', 'Intermediate', 'Advanced'];
const sortOptions = ['Most Popular', 'Highest Rated', 'Newest', 'Duration'];

const CourseList = () => {
  const [courses, setCourses] = useState(mockCourses);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedLevel, setSelectedLevel] = useState('All Levels');
  const [selectedSort, setSelectedSort] = useState('Most Popular');
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    // Simulate API call
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);

  const filteredCourses = courses.filter(course => {
    const matchesSearch = course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         course.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         course.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesCategory = selectedCategory === 'All' || course.category === selectedCategory;
    const matchesLevel = selectedLevel === 'All Levels' || course.level === selectedLevel;
    
    return matchesSearch && matchesCategory && matchesLevel;
  });

  const sortedCourses = [...filteredCourses].sort((a, b) => {
    switch (selectedSort) {
      case 'Most Popular':
        return b.students - a.students;
      case 'Highest Rated':
        return b.rating - a.rating;
      case 'Newest':
        return new Date(b.id).getTime() - new Date(a.id).getTime();
      case 'Duration':
        return parseInt(a.duration) - parseInt(b.duration);
      default:
        return 0;
    }
  });

  const CourseCard = ({ course }: any) => (
    <div className="bg-white rounded-lg shadow hover:shadow-lg transition-shadow duration-300 overflow-hidden">
      {/* Course Thumbnail */}
      <div className="h-48 bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center">
        <BookOpen className="h-16 w-16 text-white opacity-80" />
      </div>
      
      <div className="p-6">
        {/* Course Title & Description */}
        <div className="mb-4">
          <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">
            {course.title}
          </h3>
          <p className="text-sm text-gray-600 line-clamp-2">
            {course.description}
          </p>
        </div>

        {/* Course Meta */}
        <div className="flex items-center justify-between mb-4">
          <span className="inline-block bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded-full">
            {course.category}
          </span>
          <span className={`inline-block text-xs px-2 py-1 rounded-full ${
            course.level === 'Beginner' ? 'bg-green-100 text-green-800' :
            course.level === 'Intermediate' ? 'bg-yellow-100 text-yellow-800' :
            'bg-red-100 text-red-800'
          }`}>
            {course.level}
          </span>
        </div>

        {/* Rating & Students */}
        <div className="flex items-center justify-between mb-4 text-sm text-gray-600">
          <div className="flex items-center">
            <Star className="h-4 w-4 text-yellow-400 mr-1" />
            <span className="font-medium">{course.rating}</span>
            <span className="ml-1">({course.students.toLocaleString()})</span>
          </div>
          <div className="flex items-center">
            <Users className="h-4 w-4 mr-1" />
            <span>{course.students.toLocaleString()}</span>
          </div>
        </div>

        {/* Duration & Lessons */}
        <div className="flex items-center justify-between mb-4 text-sm text-gray-600">
          <div className="flex items-center">
            <Clock className="h-4 w-4 mr-1" />
            <span>{course.duration}</span>
          </div>
          <div className="flex items-center">
            <BookOpen className="h-4 w-4 mr-1" />
            <span>{course.lessons} lessons</span>
          </div>
        </div>

        {/* Instructor */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center">
            <div className="h-8 w-8 bg-gray-300 rounded-full flex items-center justify-center mr-2">
              <span className="text-xs font-medium text-gray-600">
                {course.instructor.name.split(' ').map(n => n[0]).join('')}
              </span>
            </div>
            <span className="text-sm text-gray-700">{course.instructor.name}</span>
          </div>
          <span className="text-lg font-bold text-green-600">{course.price}</span>
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-1 mb-4">
          {course.tags.map((tag, index) => (
            <span key={index} className="bg-blue-50 text-blue-700 text-xs px-2 py-1 rounded">
              {tag}
            </span>
          ))}
        </div>

        {/* Action Button */}
        <button className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors font-medium">
          Enroll Now
        </button>
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
      {/* Header */}
      <div className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Explore Courses
            </h1>
            <p className="text-gray-600 mb-8">
              Discover thousands of courses and start learning today
            </p>

            {/* Search Bar */}
            <div className="max-w-2xl mx-auto relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search courses, topics, or skills..."
                className="block w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="absolute inset-y-0 right-0 pr-3 flex items-center"
              >
                <Filter className="h-5 w-5 text-gray-400 hover:text-gray-600" />
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Filters */}
        {showFilters && (
          <div className="bg-white rounded-lg shadow p-6 mb-8">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              {/* Category Filter */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Category
                </label>
                <div className="relative">
                  <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="block w-full pl-3 pr-10 py-2 text-base border border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 rounded-md"
                  >
                    {categories.map((category) => (
                      <option key={category} value={category}>
                        {category}
                      </option>
                    ))}
                  </select>
                  <ChevronDown className="absolute right-3 top-2.5 h-4 w-4 text-gray-400 pointer-events-none" />
                </div>
              </div>

              {/* Level Filter */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Level
                </label>
                <div className="relative">
                  <select
                    value={selectedLevel}
                    onChange={(e) => setSelectedLevel(e.target.value)}
                    className="block w-full pl-3 pr-10 py-2 text-base border border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 rounded-md"
                  >
                    {levels.map((level) => (
                      <option key={level} value={level}>
                        {level}
                      </option>
                    ))}
                  </select>
                  <ChevronDown className="absolute right-3 top-2.5 h-4 w-4 text-gray-400 pointer-events-none" />
                </div>
              </div>

              {/* Sort Filter */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Sort By
                </label>
                <div className="relative">
                  <select
                    value={selectedSort}
                    onChange={(e) => setSelectedSort(e.target.value)}
                    className="block w-full pl-3 pr-10 py-2 text-base border border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 rounded-md"
                  >
                    {sortOptions.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                  <ChevronDown className="absolute right-3 top-2.5 h-4 w-4 text-gray-400 pointer-events-none" />
                </div>
              </div>

              {/* Clear Filters */}
              <div className="flex items-end">
                <button
                  onClick={() => {
                    setSelectedCategory('All');
                    setSelectedLevel('All Levels');
                    setSelectedSort('Most Popular');
                    setSearchTerm('');
                  }}
                  className="w-full bg-gray-100 text-gray-700 py-2 px-4 rounded-md hover:bg-gray-200 transition-colors"
                >
                  Clear Filters
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Results Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-xl font-semibold text-gray-900">
              {sortedCourses.length} Courses Found
            </h2>
            {searchTerm && (
              <p className="text-gray-600 mt-1">
                Results for "{searchTerm}"
              </p>
            )}
          </div>
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="md:hidden bg-white border border-gray-300 rounded-md px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
          >
            <Filter className="h-4 w-4 inline mr-2" />
            Filters
          </button>
        </div>

        {/* Course Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sortedCourses.map((course) => (
            <CourseCard key={course.id} course={course} />
          ))}
        </div>

        {/* Empty State */}
        {sortedCourses.length === 0 && (
          <div className="text-center py-12">
            <BookOpen className="mx-auto h-12 w-12 text-gray-400 mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No courses found</h3>
            <p className="text-gray-600">
              Try adjusting your search criteria or browse all courses
            </p>
            <button
              onClick={() => {
                setSearchTerm('');
                setSelectedCategory('All');
                setSelectedLevel('All Levels');
              }}
              className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
            >
              Browse All Courses
            </button>
          </div>
        )}
      </div>
    </div>)}