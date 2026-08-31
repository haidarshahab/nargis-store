import { Navigate, Outlet } from 'react-router-dom'
import { useAdminAuth } from '@/store/admin'

export function ProtectedRoute() {
  const isAuthenticated = useAdminAuth((s) => s.isAuthenticated)
  return isAuthenticated ? <Outlet /> : <Navigate to="/admin/login" replace />
}
