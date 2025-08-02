import RegisterPage from '@/src/components/register/page';

export default function Register() {
  return <RegisterPage />;
}

// app/student/dashboard/page.tsx
import AuthGuard from '@/src/components/auth/AuthGuard';
import AppLayout from '@/src/components/layout/AppLayout';
import StudentDashboard from '@/src/components/student-dashboard/page';
import { Role } from '@/src/components/types';

export default function StudentDashboardPage() {
  return (
    <AuthGuard allowedRoles={[Role.STUDENT]}>
      <AppLayout>
        <StudentDashboard />
      </AppLayout>
    </AuthGuard>
  );
}
