// types/index.ts

export enum Role {
  STUDENT = 'STUDENT',
  INSTRUCTOR = 'INSTRUCTOR',
  ADMIN = 'ADMIN'
}

export interface User {
  id: string;
  name?: string;
  email: string;
  bio?: string;
  profilePicture?: string;
  role: Role;
  createdAt: string;
  updatedAt: string;
}

export interface Course {
  id: string;
  title: string;
  description: string;
  category: string;
  instructorId: string;
  instructor?: User;
  createdAt: string;
  updatedAt: string;
  lessons?: Lesson[];
  enrollments?: Enrollment[];
  certificates?: Certificate[];
  prerequisites?: Course[];
  requiredFor?: Course[];
}

export interface Lesson {
  id: string;
  title: string;
  content: string;
  videoUrl?: string;
  courseId: string;
  course?: Course;
  createdAt: string;
  completions?: LessonCompletion[];
  prerequisites?: Lesson[];
  requiredFor?: Lesson[];
}

export interface Enrollment {
  id: string;
  studentId: string;
  courseId: string;
  progress: number;
  completed: boolean;
  createdAt: string;
  student?: User;
  course?: Course;
}

export interface LessonCompletion {
  id: string;
  studentId: string;
  courseId: string;
  lessonId: string;
  completedAt: string;
  student?: User;
  course?: Course;
  lesson?: Lesson;
}

export interface Certificate {
  id: string;
  studentId: string;
  courseId: string;
  issuedAt: string;
  student?: User;
  course?: Course;
}

// DTOs
export interface LoginDto {
  email: string;
  password: string;
}

export interface RegisterDto {
  name: string;
  email: string;
  password: string;
}

export interface CreateCourseDto {
  title: string;
  description: string;
  category: string;
  prerequisiteIds?: string[];
}

export interface UpdateCourseDto {
  title?: string;
  description?: string;
  category?: string;
  prerequisiteIds?: string[];
}

export interface CreateLessonDto {
  title: string;
  content: string;
  videoUrl?: string;
  courseId: string;
}

export interface UpdateLessonDto {
  title?: string;
  content?: string;
  videoUrl?: string;
  courseId?: string;
}

// API Response Types
export interface AuthResponse {
  access_token: string;
  user: User;
}

export interface ApiResponse<T> {
  data: T;
  message?: string;
  success: boolean;
}

// Auth Context Types
export interface AuthContextType {
  user: User | null;
  token: string | null;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
  loading: boolean;
}

// Dashboard Types
export interface DashboardStats {
  totalCourses: number;
  totalStudents: number;
  totalInstructors: number;
  completedCourses: number;
}

export interface StudentDashboardData {
  enrolledCourses: Course[];
  completedCourses: Course[];
  inProgressCourses: Course[];
  certificates: Certificate[];
  recentActivity: LessonCompletion[];
}

export interface InstructorDashboardData {
  createdCourses: Course[];
  totalStudents: number;
  totalEnrollments: number;
  recentEnrollments: Enrollment[];
}