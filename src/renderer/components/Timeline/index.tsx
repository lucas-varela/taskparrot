import { FC, useRef } from 'react'
import Hour from 'renderer/components/Hour'
import { Container, Track, Sidebar, Event } from './styles'

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
  const events = [{ id: 123, start: 440, end: 560 }]

  const handleMouseMove = (event: MouseEvent) => {
    console.debug(event)
  }

  const handleMouseDown = () => {
    console.debug('mouseDown')
    window.addEventListener('mousemove', handleMouseMove)
  }

  const handleMouseUp = () => {
    console.debug('mouseUp')
    window.removeEventListener('mousemove', handleMouseMove)
  }

  return (
    <Container>
      <Track
        ref={trackRef}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
      >
        {dayHours.map((h) => (
          <Hour
            key={h}
            hour={h}
            isStartingHour={h === workingHoursStart}
            isWorkingHour={isWorkingHour(h)}
          />
        ))}
        {events.map((e) => (
          <Event key={e.start} height={e.end - e.start} top={e.start} />
        ))}
      </Track>
      <Sidebar />
    </Container>
  )
}

export default Timeline
