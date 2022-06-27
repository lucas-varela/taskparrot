import styled from '@emotion/styled'
import { HourContainerProps } from './types'

export const Container = styled.li<HourContainerProps>`
  position: relative;
  height: 120px;
  border-right: 2px solid
    ${({ theme, isStartingHour, isWorkingHour }) =>
      isWorkingHour && !isStartingHour
        ? theme.colors.blue.lighter
        : theme.colors.gray.light};

  &:not(:last-of-type) {
    &::before {
      content: '${({ hour }) => hour}:00';
      display: flex;
      align-items: center;
      justify-content: center;
      position: absolute;
      bottom: calc(-0.75rem - 2px);
      right: calc(100% - 4.5rem);
      height: 1.5rem;
      padding: 0.125rem 0.5rem;
      background-color: ${({ theme }) => theme.colors.blue.background};
      border-radius: 1rem;
      font-size: 0.75rem;
      font-weight: 600;
      color: ${({ theme, isWorkingHour }) =>
        isWorkingHour ? theme.colors.gray.darker : theme.colors.gray.default};
    }

    &::after {
      content: '';
      position: absolute;
      height: 2px;
      width: calc(100% - 5rem);
      bottom: -1px;
      right: 0;
      border-top-left-radius: 1px;
      border-bottom-left-radius: 1px;
      background-color: ${({ theme, isWorkingHour }) =>
        isWorkingHour ? theme.colors.blue.lighter : theme.colors.gray.light};
    }
  }

  > span {
    display: block;
    height: 25%;
    width: 100%;

    &:nth-of-type(even) {
      background: linear-gradient(
        90deg,
        ${({ theme }) => theme.colors.blue.background} 5rem,
        ${({ theme, isStartingHour, isWorkingHour }) =>
            isWorkingHour && !isStartingHour
              ? theme.colors.blue.lightest
              : theme.colors.gray.lightest}
          100%
      );
    }
  }
`
