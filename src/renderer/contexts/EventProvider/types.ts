import { ReactNode } from 'react'

export type Event = {
  id: string
  date: Date
  start: number
  end: number
  isTemporary?: boolean
}

export type EventContextProps = {
  events: Event[]
  setEvents: (events: Event[]) => void
  addEvent: (event: Event) => void
  removeEvent: (event: string | Event) => void
  getEvent: (id: string) => Event | undefined
}

export type EventProviderProps = {
  children?: ReactNode
}
