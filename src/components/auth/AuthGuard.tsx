import { useAuth } from '../../hooks/useAuth'
import { Navigate } from 'react-router-dom'

export function AuthGuard({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth()

  if (loading) {
    return <div>Loading...</div>
  }

  // If no user, allow access but show a warning or limited functionality
  if (!user) {
    // Instead of redirecting, just render children or a message
    return (
      <>
        {/* You can customize this to show a banner or limited access message */}
        {children}
      </>
    )
  }

  return <>{children}</>
}
