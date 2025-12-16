import { Link, useLocation } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import './Layout.css'

interface LayoutProps {
  children: React.ReactNode
}

const Layout = ({ children }: LayoutProps) => {
  const location = useLocation()
  const { isAuthenticated } = useAuth()

  const isActive = (path: string) => {
    return location.pathname === path ? 'active' : ''
  }

  return (
    <div className="layout">
      <header className="header">
        <div className="container">
          <h1 className="logo">
            <Link to="/">🎸 밴드 공연 관리</Link>
          </h1>
          <nav className="nav">
            {isAuthenticated ? (
              <Link to="/dashboard" className={`nav-link ${isActive('/dashboard')}`}>
                내 정보
              </Link>
            ) : (
              <Link to="/login" className={`nav-link ${isActive('/login')}`}>
                체크인
              </Link>
            )}
            <Link to="/performances" className={`nav-link ${isActive('/performances')}`}>
              공연 정보
            </Link>
            <Link to="/events" className={`nav-link ${isActive('/events')}`}>
              이벤트
            </Link>
            <Link to="/guestbook" className={`nav-link ${isActive('/guestbook')}`}>
              방명록
            </Link>
            <Link to="/chat" className={`nav-link ${isActive('/chat')}`}>
              채팅
            </Link>
          </nav>
        </div>
      </header>
      <main className="main">
        <div className="container">
          {children}
        </div>
      </main>
      <footer className="footer">
        <div className="container">
          <p>&copy; 2025 밴드 공연 관리 시스템</p>
        </div>
      </footer>
    </div>
  )
}

export default Layout

