// lib/api.ts

import axios, { AxiosInstance, AxiosResponse } from 'axios';
import { 
  AuthResponse, 
  LoginDto, 
  RegisterDto, 
  User, 
  Course, 
  Lesson, 
  CreateCourseDto, 
  UpdateCourseDto, 
  CreateLessonDto, 
  UpdateLessonDto,
  Enrollment,
  LessonCompletion,
  Certificate,
  StudentDashboardData
} from '@/types';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api';

class ApiClient {
  private client: AxiosInstance;

  constructor() {
    this.client = axios.create({
      baseURL: API_BASE_URL,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    // Request interceptor to add auth token
    this.client.interceptors.request.use(
      (config) => {
        const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

    // Response interceptor for error handling
    this.client.interceptors.response.use(
      (response) => response,
      (error) => {
        if (error.response?.status === 401) {
          // Clear token and redirect to login
          if (typeof window !== 'undefined') {
            localStorage.removeItem('token');
            window.location.href = '/auth/login';
          }
        }
        return Promise.reject(error);
      }
    );
  }

  // Auth endpoints
  async login(data: LoginDto): Promise<AuthResponse> {
    const response = await this.client.post<AuthResponse>('/auth/login', data);
    return response.data;
  }

  async register(data: RegisterDto): Promise<AuthResponse> {
    const response = await this.client.post<AuthResponse>('/auth/register', data);
    return response.data;
  }

  // User endpoints
  async getProfile(): Promise<User> {
    const response = await this.client.get<User>('/users/profile');
    return response.data;
  }

  async updateProfile(data: Partial<User>): Promise<User> {
    const response = await this.client.patch<User>('/profile', data);
    return response.data;
  }

  // Course endpoints
  async getCourses(): Promise<Course[]> {
    const response = await this.client.get<Course[]>('/courses');
    return response.data;
  }

  async getCourse(id: string): Promise<Course> {
    const response = await this.client.get<Course>(`/courses/${id}`);
    return response.data;
  }

  async createCourse(data: CreateCourseDto): Promise<Course> {
    const response = await this.client.post<Course>('/courses', data);
    return response.data;
  }

  async updateCourse(id: string, data: UpdateCourseDto): Promise<Course> {
    const response = await this.client.patch<Course>(`/courses/${id}`, data);
    return response.data;
  }

  // Lesson endpoints
  async getCourseLessons(courseId: string): Promise<Lesson[]> {
    const response = await this.client.get<Lesson[]>(`/lessons/course/${courseId}`);
    return response.data;
  }

  async createLesson(data: CreateLessonDto): Promise<Lesson> {
    const response = await this.client.post<Lesson>(`/lessons/${data.courseId}`, data);
    return response.data;
  }

  async updateLesson(id: string, data: UpdateLessonDto): Promise<Lesson> {
    const response = await this.client.patch<Lesson>(`/lessons/${id}`, data);
    return response.data;
  }

  async deleteLesson(id: string): Promise<void> {
    await this.client.delete(`/lessons/${id}`);
  }

  // Enrollment endpoints
  async enrollInCourse(courseId: string): Promise<Enrollment> {
    const response = await this.client.post<Enrollment>('/enrollments', { courseId });
    return response.data;
  }

  async getEnrollments(): Promise<Enrollment[]> {
    const response = await this.client.get<Enrollment[]>('/enrollments');
    return response.data;
  }

  // Progress endpoints
  async getProgress(studentId: string, courseId: string): Promise<any> {
    const response = await this.client.get(`/progress/${studentId}/${courseId}`);
    return response.data;
  }

  async updateProgress(studentId: string, courseId: string, progress: number): Promise<any> {
    const response = await this.client.patch(`/progress/${studentId}/${courseId}`, { progress });
    return response.data;
  }

  // Lesson completion endpoints
  async completLesson(courseId: string, lessonId: string): Promise<LessonCompletion> {
    const response = await this.client.post<LessonCompletion>(`/lesson-completions/${courseId}/${lessonId}`);
    return response.data;
  }

  async getLessonCompletions(courseId: string): Promise<LessonCompletion[]> {
    const response = await this.client.get<LessonCompletion[]>(`/lesson-completions/${courseId}`);
    return response.data;
  }

  // Dashboard endpoint
  async getDashboard(): Promise<StudentDashboardData> {
    const response = await this.client.get<StudentDashboardData>('/dashboard');
    return response.data;
  }

  // Certificate endpoints
  async getCertificate(courseId: string): Promise<Certificate> {
    const response = await this.client.get<Certificate>(`/certificates/${courseId}`);
    return response.data;
  }
}

export const apiClient = new ApiClient();
export default apiClient;