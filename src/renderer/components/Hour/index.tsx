import { FC } from 'react'
import { Container } from './styles'
import { HourProps } from './types'

const Hour: FC<HourProps> = ({ hour, isStartingHour, isWorkingHour }) => {
  return (
    <Container
      hour={hour}
      isStartingHour={isStartingHour}
      isWorkingHour={isWorkingHour}
    >
      <span />
      <span />
      <span />
      <span />
    </Container>
  )
}

export default Hour
