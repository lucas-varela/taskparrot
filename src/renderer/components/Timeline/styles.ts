import styled from '@emotion/styled'

export const Container = styled.div`
  display: flex;
`

export const Track = styled.ol`
  position: relative;
  flex-grow: 1;
  margin: 0;
  padding: 0;
  list-style: none;
`

export const HourTrack = styled.div`
  position: absolute;
  height: 100%;
  width: 100%;
  top: 0;
  left: 0;
`

export const EventTrack = styled.div`
  position: absolute;
  height: 100%;
  width: 100%;
  top: 0;
  left: 0;
`

export const EventComponent = styled.div<any>`
  position: absolute;
  height: ${({ start, end }) => end - start}px;
  width: 60%;
  top: ${({ start }) => start}px;
  left: 30%;
  background-color: ${({ theme }) => theme.colors.blue.default};
  opacity: ${({ isTemporary }) => (isTemporary ? 0.5 : 0.9)};
`

export const Sidebar = styled.div`
  width: 4rem;
`
