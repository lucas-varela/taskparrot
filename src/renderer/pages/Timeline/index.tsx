import { FC } from 'react'
import Hour from 'renderer/components/Hour'
import { Container, Track, Sidebar } from './styles'

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
  return (
    <Container>
      <Track>
        {dayHours.map((h) => (
          <Hour
            key={h}
            hour={h}
            isStartingHour={h === workingHoursStart}
            isWorkingHour={isWorkingHour(h)}
          />
        ))}
      </Track>
      <Sidebar />
    </Container>
  )
}

export default Timeline
