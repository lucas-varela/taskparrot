import {
  FC,
  MouseEvent as ReactMouseEvent,
  useCallback,
  useRef,
  useState,
} from 'react'
import { v4 as uuidv4 } from 'uuid'
import Hour from '../Hour'
import { useEvents, Event } from '../../contexts/EventProvider'
import {
  Container,
  Track,
  Sidebar,
  EventComponent,
  EventTrack,
  HourTrack,
} from './styles'

const dayHours = [
  1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22,
  23, 24,
]

const workingHoursStart = 9
const workingHoursEnd = 18

const isWorkingHour = (hour: number) => {
  return workingHoursStart <= hour && hour <= workingHoursEnd
}

const Timeline: FC = () => {
  // TODO: criar o EventContext, contendo um array de eventos que aparecem na track
  //  clicar no track adiciona um evento com isTemporary = true, mover o mouse alguns pixels pra baixo muda pra false
  //  soltar o mouse com isTemporary === true faz o evento ser apagado do array
  //  isso obriga eventos a terem no mínimo X minutos
  // TODO: eventos tem algo tipo size=tiny|small|normal pra usar CSS relativo ao tamanho da tarefa
  // TODO: eventos não podem ter menos que X minutos, tipo 5
  const trackRef = useRef<HTMLOListElement>(null)
  const temporaryRef = useRef<Partial<Event> | null>(null)
  const [temporaryEvent, setTemporaryEvent] = useState<Partial<Event> | null>(
    null
  )
  temporaryRef.current = temporaryEvent
  const { events, addEvent } = useEvents()

  const handleMouseMove = useCallback((event: MouseEvent) => {
    const trackTop = trackRef.current?.getBoundingClientRect().y ?? 0
    const end = Math.abs(trackTop) + event.clientY

    setTemporaryEvent((prev) => ({
      ...prev,
      end: Math.max(end, 30),
      isTemporary: end - (prev?.start ?? 0) < 30,
    }))
  }, [])

  const handleMouseUp = useCallback(() => {
    if (!temporaryRef.current?.isTemporary) {
      addEvent({
        ...(temporaryRef.current as Event),
        date: new Date(),
      })
    }

    setTemporaryEvent(null)

    window.removeEventListener('mousemove', handleMouseMove)
    window.removeEventListener('mouseup', handleMouseUp)
  }, [addEvent, handleMouseMove])

  const handleMouseDown = (
    event: ReactMouseEvent<HTMLOListElement, MouseEvent>
  ) => {
    const trackTop = trackRef.current?.getBoundingClientRect().y ?? 0
    const initial = Math.abs(trackTop) + event.clientY

    setTemporaryEvent({
      id: uuidv4(),
      start: initial,
      end: initial,
      isTemporary: true,
    })

    window.addEventListener('mousemove', handleMouseMove)
    window.addEventListener('mouseup', handleMouseUp)
  }

  return (
    <Container>
      <Track ref={trackRef} onMouseDown={handleMouseDown}>
        <HourTrack>
          {dayHours.map((h) => (
            <Hour
              key={h}
              hour={h}
              isStartingHour={h === workingHoursStart}
              isWorkingHour={isWorkingHour(h)}
            />
          ))}
        </HourTrack>
        <EventTrack>
          {events.map((e) => (
            <EventComponent key={e.id} start={e.start} end={e.end} />
          ))}
          {temporaryEvent && (
            <EventComponent
              start={temporaryEvent.start}
              end={temporaryEvent.end}
              isTemporary={temporaryEvent.isTemporary}
            />
          )}
        </EventTrack>
      </Track>
      <Sidebar />
    </Container>
  )
}

export default Timeline
