import { createContext, useContext, useState, useEffect, ReactNode } from 'react'

export interface Guest {
  name: string
  phone: string
  [key: string]: any
}

export interface SetlistItem {
  songName: string
  artist: string
  image?: string
  vocal?: string
  guitar?: string
  bass?: string
  keyboard?: string
  drum?: string
}

export interface PerformanceData {
  setlist?: SetlistItem[]
  performers?: string[]
  events?: Array<{
    title: string
    description: string
    time?: string
  }>
  ticket?: {
    eventName: string
    date: string
    venue: string
    seat?: string
  }
}

export interface GuestbookMessage {
  id: string
  name: string
  message: string
  timestamp: number
  ornamentType?: string
  position?: { x: number; y: number }
}

interface DataContextType {
  guests: Guest[]
  performanceData: PerformanceData | null
  guestbookMessages: GuestbookMessage[]
  uploadGuests: (guests: Guest[]) => void
  setPerformanceData: (data: PerformanceData) => void
  addGuestbookMessage: (message: GuestbookMessage) => void
}

const DataContext = createContext<DataContextType | undefined>(undefined)

export const DataProvider = ({ children }: { children: ReactNode }) => {
  const [guests, setGuests] = useState<Guest[]>([])
  const [performanceData, setPerformanceDataState] = useState<PerformanceData | null>(null)
  const [guestbookMessages, setGuestbookMessages] = useState<GuestbookMessage[]>([])

  useEffect(() => {
    const savedGuests = localStorage.getItem('guests')
    const savedPerformanceData = localStorage.getItem('performanceData')
    const savedGuestbookMessages = localStorage.getItem('guestbookMessages')
    
    if (savedGuests) {
      setGuests(JSON.parse(savedGuests))
    }
    if (savedPerformanceData) {
      setPerformanceDataState(JSON.parse(savedPerformanceData))
    }
    if (savedGuestbookMessages) {
      setGuestbookMessages(JSON.parse(savedGuestbookMessages))
    }
  }, [])

  const uploadGuests = (newGuests: Guest[]) => {
    setGuests(newGuests)
    localStorage.setItem('guests', JSON.stringify(newGuests))
  }

  const setPerformanceData = (data: PerformanceData) => {
    setPerformanceDataState(data)
    localStorage.setItem('performanceData', JSON.stringify(data))
  }

  const addGuestbookMessage = (message: GuestbookMessage) => {
    const newMessages = [...guestbookMessages, message]
    setGuestbookMessages(newMessages)
    localStorage.setItem('guestbookMessages', JSON.stringify(newMessages))
  }

  return (
    <DataContext.Provider value={{ 
      guests, 
      performanceData, 
      guestbookMessages,
      uploadGuests, 
      setPerformanceData,
      addGuestbookMessage
    }}>
      {children}
    </DataContext.Provider>
  )
}

export const useData = () => {
  const context = useContext(DataContext)
  if (context === undefined) {
    throw new Error('useData must be used within a DataProvider')
  }
  return context
}

