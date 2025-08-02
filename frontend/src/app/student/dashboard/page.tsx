import AuthGuard from '@/src/components/auth/AuthGuard';
import AppLayout from '@/src/components/layout/AppLayout';
import StudentDashboard from '@/src/components/student-dashboard/page';
import { Role } from '@/types';

export default function StudentDashboardPage() {
  return (
    <AuthGuard allowedRoles={[Role.STUDENT]}>
      <AppLayout>
        <StudentDashboard />
      </AppLayout>
    </AuthGuard>
  );
}