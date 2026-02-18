'use client';

import { AuthProvider } from '@/context/AuthContext';

export default function DashboardRootLayout({ children }: { children: React.ReactNode }) {
  return <div>{children}</div>;
}
