import { FC } from 'react'
import { Container } from './styles'
import { HourProps } from './types'

const Hour: FC<HourProps> = ({ hour }) => {
  return <Container hour={hour} />
}

export default Hour
