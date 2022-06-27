import { createContext, FC, ReactNode, useContext, useState } from 'react'

type Event = {
  id: string
  date: Date
  start: number
  end: number
  isTemporary: boolean
}

type EventContextProps = {
  events: Event[]
  setEvents: (events: Event[]) => void
  addEvent: (event: Event) => void
  getEvent: (id: string) => Event | null
}

type EventProviderProps = {
  children?: ReactNode
}

const EventContext = createContext<EventContextProps>({
  events: [],
})

export const useEvents = () => useContext(EventContext)

const EventProvider: FC<EventProviderProps> = ({ children }) => {
  const [events, setEvents] = useState<Event[]>([])

  return (
    <EventContext.Provider value={{ events }}>{children}</EventContext.Provider>
  )
}

export default EventProvider
