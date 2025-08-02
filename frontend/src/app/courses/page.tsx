// app/courses/page.tsx
import AppLayout from '@/src/components/layout/AppLayout';
import CourseList from '@/src/components/course-llist/page';

export default function CoursesPage() {
  return (
    <AppLayout>
      <CourseList />
    </AppLayout>
  );
}