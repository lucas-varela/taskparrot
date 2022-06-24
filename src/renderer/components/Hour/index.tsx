import { FC } from 'react'
import { Container } from './styles'
import { HourProps } from './types'

const Hour: FC<HourProps> = ({ hour, isWorkingHour }) => {
  return <Container hour={hour} isWorkingHour={isWorkingHour} />
}

export default Hour
