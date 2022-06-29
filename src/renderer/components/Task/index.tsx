import { FC } from 'react'
import { Container } from './styles'
import { TaskProps } from './types'

const Task: FC<TaskProps> = ({ start, end }) => {
  return <Container start={start} end={end} />
}

export default Task
