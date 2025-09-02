import { Navigate } from 'react-router-dom';
import { ReactNode } from 'react';
import { useAuth } from '../context/AuthContext';

type ProtectedRouteProps = {
  children: ReactNode;
  role?: 'admin' | 'user';
};

export default function ProtectedRoute({ children, role }: ProtectedRouteProps) {
  const { user } = useAuth();

  if (!user) {
    return <Navigate to='/signin' replace />;
  }

  if (role && user.role !== role) {
    return <Navigate to='/' replace />;
  }

  return <>{children}</>;
}
