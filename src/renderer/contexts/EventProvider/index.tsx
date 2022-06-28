import { createContext, FC, useContext, useState } from 'react'
import { Event, EventContextProps, EventProviderProps } from './types'

export { Event }

const EventContext = createContext<EventContextProps>({
  events: [],
  setEvents: () => undefined,
  addEvent: () => undefined,
  removeEvent: () => undefined,
  getEvent: () => ({} as Event),
})

export const useEvents = () => useContext(EventContext)

const EventProvider: FC<EventProviderProps> = ({ children }) => {
  const [events, setEvents] = useState<Event[]>([])

  const addEvent = (event: Event) => {
    setEvents((prev) => [...prev, event])
  }

  const removeEvent = (event: Event | string) => {
    const copy = [...events]
    const index =
      typeof event === 'string'
        ? copy.findIndex((e) => e.id === event)
        : copy.indexOf(event)

    copy.splice(index, 1)

    if (index !== -1) setEvents(copy)
  }

  const getEvent = (id: string) => {
    return events.find((e) => e.id === id)
  }

  return (
    <EventContext.Provider
      value={{ events, setEvents, addEvent, removeEvent, getEvent }}
    >
      {children}
    </EventContext.Provider>
  )
}

export default EventProvider
