import { useState, useRef } from 'react'
import { useData, GuestbookMessage } from '../contexts/DataContext'
import './Guestbook.css'

const Guestbook = () => {
  const { guestbookMessages, addGuestbookMessage } = useData()
  const [name, setName] = useState('')
  const [message, setMessage] = useState('')
  const [showForm, setShowForm] = useState(false)
  const treeRef = useRef<HTMLDivElement>(null)

  const ornamentTypes = ['🎄', '🎁', '⭐', '🔔', '❄️', '🎀', '💫', '✨']

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!name.trim() || !message.trim()) {
      alert('이름과 메시지를 모두 입력해주세요.')
      return
    }

    const newMessage: GuestbookMessage = {
      id: Date.now().toString(),
      name: name.trim(),
      message: message.trim(),
      timestamp: Date.now(),
      ornamentType: ornamentTypes[Math.floor(Math.random() * ornamentTypes.length)],
      position: {
        x: Math.random() * 60 + 20, // 20-80%
        y: Math.random() * 60 + 20  // 20-80%
      }
    }

    addGuestbookMessage(newMessage)
    setName('')
    setMessage('')
    setShowForm(false)
  }

  return (
    <div className="guestbook-page">
      <h1>방명록</h1>
      
      <div className="guestbook-container">
        <div className="tree-container" ref={treeRef}>
          <div className="tree">
            <div className="tree-top">🎄</div>
            <div className="tree-middle">🎄</div>
            <div className="tree-bottom">🎄</div>
            <div className="tree-trunk"></div>
          </div>
          
          {guestbookMessages.map((msg) => (
            <div
              key={msg.id}
              className="ornament"
              style={{
                left: `${msg.position?.x || 50}%`,
                top: `${msg.position?.y || 50}%`,
              }}
              title={`${msg.name}: ${msg.message}`}
            >
              <div className="ornament-icon">{msg.ornamentType || '🎄'}</div>
              <div className="ornament-tooltip">
                <div className="tooltip-name">{msg.name}</div>
                <div className="tooltip-message">{msg.message}</div>
              </div>
            </div>
          ))}
        </div>

        <div className="guestbook-form-container">
          {!showForm ? (
            <button 
              className="add-message-button"
              onClick={() => setShowForm(true)}
            >
              ✨ 오너먼트 달기
            </button>
          ) : (
            <form onSubmit={handleSubmit} className="guestbook-form">
              <h3>방명록 남기기</h3>
              <div className="form-group">
                <label htmlFor="guestbook-name">이름</label>
                <input
                  type="text"
                  id="guestbook-name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="이름을 입력하세요"
                  maxLength={20}
                />
              </div>
              <div className="form-group">
                <label htmlFor="guestbook-message">메시지</label>
                <textarea
                  id="guestbook-message"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="메시지를 입력하세요"
                  rows={4}
                  maxLength={100}
                />
              </div>
              <div className="form-buttons">
                <button type="submit" className="submit-button">
                  달기
                </button>
                <button 
                  type="button" 
                  className="cancel-button"
                  onClick={() => {
                    setShowForm(false)
                    setName('')
                    setMessage('')
                  }}
                >
                  취소
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  )
}

export default Guestbook

