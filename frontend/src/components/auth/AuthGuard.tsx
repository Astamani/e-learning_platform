// components/auth/AuthGuard.tsx

'use client';

import React, { useEffect } from 'react';
import { useAuth } from '@/components/context/AuthContext';
import { useRouter } from 'next/navigation';
import { Role } from '@/components/types';

interface AuthGuardProps {
  children: React.ReactNode;
  allowedRoles?: Role[];
  redirectTo?: string;
}

const AuthGuard: React.FC<AuthGuardProps> = ({ 
  children, 
  allowedRoles, 
  redirectTo = '/auth/login' 
}) => {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading) {
      // Not authenticated
      if (!user) {
        router.push(redirectTo);
        return;
      }

      // Check role-based access
      if (allowedRoles && !allowedRoles.includes(user.role)) {
        // Redirect to appropriate dashboard based on user role
        switch (user.role) {
          case Role.ADMIN:
            router.push('/admin/dashboard');
            break;
          case Role.INSTRUCTOR:
            router.push('/instructor/dashboard');
            break;
          case Role.STUDENT:
          default:
            router.push('/student/dashboard');
            break;
        }
        return;
      }
    }
  }, [user, loading, allowedRoles, router, redirectTo]);

  // Show loading spinner
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  // Not authenticated
  if (!user) {
    return null;
  }

  // Not authorized for this role
  if (allowedRoles && !allowedRoles.includes(user.role)) {
    return null;
  }

  // Authenticated and authorized
  return <>{children}</>;
};

export default AuthGuard;