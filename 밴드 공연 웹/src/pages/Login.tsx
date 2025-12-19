import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import TicketTransition from '../components/TicketTransition'
import ticketDemoImage from '../assets/배경/티켓데모.png'
import './Login.css'

const Login = () => {
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [error, setError] = useState('')
  const [showTicket, setShowTicket] = useState(false)
  const { login } = useAuth()
  const navigate = useNavigate()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    if (!name.trim() || !phone.trim()) {
      setError('이름과 전화번호를 입력해주세요.')
      return
    }

    const success = login(name.trim(), phone.trim())
    if (success) {
      setShowTicket(true)
    } else {
      setError('등록된 정보가 없습니다. 이름과 전화번호를 확인해주세요.')
    }
  }

  return (
    <div className="login-page">
      {showTicket ? (
        <TicketTransition
          ticketImageUrl={ticketDemoImage}
          info={{
            name: name,
            date: new Date().toLocaleDateString(),
            seat: 'STANDING',
          }}
          onDone={() => navigate('/dashboard')}
        />
      ) : (
        <div className="login-container">
          <div className="login-header">
            <h1>체크인</h1>
            <p>이름과 전화번호를 입력해주세요</p>
          </div>

          <form onSubmit={handleSubmit} className="login-form">
            <div className="form-group">
              <label htmlFor="name">이름</label>
              <input
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="이름을 입력하세요"
                autoComplete="name"
              />
            </div>

            <div className="form-group">
              <label htmlFor="phone">전화번호</label>
              <input
                type="tel"
                id="phone"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="010-1234-5678"
                autoComplete="tel"
              />
            </div>

            {error && <div className="error-message">{error}</div>}

            <button type="submit" className="login-button">
              공연 입장하기
            </button>
          </form>
        </div>
      )}
    </div>
  )
}

export default Login

