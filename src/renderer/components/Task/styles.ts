import styled from '@emotion/styled'
import { differenceInMinutes, getHours, getMinutes } from 'date-fns'
import { TaskProps } from './types'

export const Container = styled.li<TaskProps>`
  position: absolute;
  height: ${({ start, end }) => differenceInMinutes(end, start) * 2}px;
  width: 60%;
  top: ${({ start }) => getHours(start) * 120 + getMinutes(start) * 2}px;
  left: 30%;
  background-color: ${({ theme }) => theme.colors.blue.lightest};
  border: 0.125rem solid ${({ theme }) => theme.colors.blue.light};
  border-radius: 0.125rem;

  &:nth-of-type(2n) {
    transform: translateX(0.5rem);
  }
`
