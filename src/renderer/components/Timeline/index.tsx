import {
  FC,
  MouseEvent as ReactMouseEvent,
  useCallback,
  useRef,
  useState,
} from 'react'
import { v4 as uuidv4 } from 'uuid'
import { addMinutes, differenceInMinutes, set } from 'date-fns'
import Hour from '../Hour'
import TaskComponent from '../Task'
import { useTasks } from '../../contexts/TaskProvider'
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

type TemporaryTask = {
  start: Date
  end: Date
  initialPosition: number
  initialDate: Date
}

const Timeline: FC = () => {
  const trackRef = useRef<HTMLDivElement>(null)
  const hourTrackRef = useRef<HTMLOListElement>(null)
  const temporaryRef = useRef<TemporaryTask | null>(null)
  const [temporaryTask, setTemporaryTask] = useState<TemporaryTask | null>(null)
  temporaryRef.current = temporaryTask
  const { tasks, addTask } = useTasks()

  const handleMouseMove = useCallback((event: MouseEvent) => {
    const trackTop = trackRef.current?.getBoundingClientRect().y ?? 0
    const position = Math.min(
      // We divide the sizes by two since 1 minute equals to 2px in the CSS
      // ceil(X / 5) * 5 makes the task grow in 5 minutes intervals
      Math.ceil((Math.abs(trackTop) + event.clientY) / 2 / 5) * 5,
      1440 // Math.min makes sure the task won't pass 00:00:00 of the next day
    )

    const hours = Math.floor(position / 60)
    const minutes = position % 60
    const time = set(new Date(), {
      hours,
      minutes,
      seconds: 0,
    })

    setTemporaryTask((_prev) => {
      const prev = _prev as TemporaryTask

      return {
        ...prev,
        start: position > prev.initialPosition ? prev.start : time,
        end: position > prev.initialPosition ? time : prev.initialDate,
      }
    })
  }, [])

  const handleMouseUp = useCallback(() => {
    if (
      temporaryRef.current &&
      differenceInMinutes(
        temporaryRef.current.end,
        temporaryRef.current.start
      ) > 0
    ) {
      addTask({
        id: uuidv4(),
        start: temporaryRef.current.start,
        end: temporaryRef.current.end,
      })
    }

    setTemporaryTask(null)

    window.removeEventListener('mousemove', handleMouseMove)
    window.removeEventListener('mouseup', handleMouseUp)
  }, [addTask, handleMouseMove])

  const handleMouseDown = (
    event: ReactMouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    if (event.target !== hourTrackRef.current) return

    const trackTop = trackRef.current?.getBoundingClientRect().y ?? 0
    const initial = Math.floor((Math.abs(trackTop) + event.clientY) / 2 / 5) * 5
    const hours = Math.floor(initial / 60)
    const minutes = initial % 60
    const initialDate = set(new Date(), {
      hours,
      minutes,
      seconds: 0,
    })

    setTemporaryTask({
      initialPosition: initial,
      initialDate,
      start: initialDate,
      end: addMinutes(initialDate, 5),
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
