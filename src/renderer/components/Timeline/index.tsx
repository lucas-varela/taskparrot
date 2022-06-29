import {
  FC,
  MouseEvent as ReactMouseEvent,
  useCallback,
  useRef,
  useState,
} from 'react'
import { v4 as uuidv4 } from 'uuid'
import { addMinutes, set } from 'date-fns'
import Hour from '../Hour'
import TaskComponent from '../Task'
import { useTasks, Task } from '../../contexts/TaskProvider'
import { Container, Track, Sidebar, EventTrack, HourTrack } from './styles'

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
  const trackRef = useRef<HTMLDivElement>(null)
  const hourTrackRef = useRef<HTMLOListElement>(null)
  const temporaryRef = useRef<Partial<Task> | null>(null)
  const [temporaryTask, setTemporaryTask] = useState<Partial<Task> | null>(null)
  temporaryRef.current = temporaryTask
  const { tasks, addTask } = useTasks()

  const handleMouseMove = useCallback((event: MouseEvent) => {
    const trackTop = trackRef.current?.getBoundingClientRect().y ?? 0
    const top = Math.min(
      // We divide the sizes by two since 1 minute equals to 2px in the CSS
      // ceil(X / 15) * 15 makes the task grow in 15 minutes intervals
      Math.ceil((Math.abs(trackTop) + event.clientY) / 2 / 15) * 15,
      1440 // Math.min makes sure the task won't pass 00:00:00 of the next day
    )
    const hours = Math.floor(top / 60)
    const minutes = top % 60
    const end = set(new Date(), {
      hours,
      minutes,
      seconds: 0,
    })

    setTemporaryTask((prev) => ({
      ...prev,
      end,
      // isTemporary: end - (prev?.start ?? 0) < 30,
    }))
  }, [])

  const handleMouseUp = useCallback(() => {
    addTask({
      ...(temporaryRef.current as Task),
    })

    setTemporaryTask(null)

    window.removeEventListener('mousemove', handleMouseMove)
    window.removeEventListener('mouseup', handleMouseUp)
  }, [addTask, handleMouseMove])

  const handleMouseDown = (
    event: ReactMouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    if (event.target !== hourTrackRef.current) return

    const trackTop = trackRef.current?.getBoundingClientRect().y ?? 0
    const initial =
      Math.floor((Math.abs(trackTop) + event.clientY) / 2 / 15) * 15
    const hours = Math.floor(initial / 60)
    const minutes = initial % 60
    const initialDate = set(new Date(), {
      hours,
      minutes,
      seconds: 0,
    })

    setTemporaryTask({
      id: uuidv4(),
      start: initialDate,
      end: addMinutes(initialDate, 15),
      isTemporary: true,
    })

    window.addEventListener('mousemove', handleMouseMove)
    window.addEventListener('mouseup', handleMouseUp)
  }

  return (
    <Container>
      <Track ref={trackRef} onMouseDown={handleMouseDown}>
        <HourTrack ref={hourTrackRef}>
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
          {tasks.map((e) => (
            <TaskComponent key={e.id} start={e.start} end={e.end} />
          ))}
          {temporaryTask && (
            <TaskComponent
              start={temporaryTask.start as Date}
              end={temporaryTask.end as Date}
            />
          )}
        </EventTrack>
      </Track>
      <Sidebar />
    </Container>
  )
}

export default Timeline
