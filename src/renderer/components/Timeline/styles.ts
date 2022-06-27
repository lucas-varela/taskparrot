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

export const Event = styled.div<any>`
  position: absolute;
  height: ${({ height }) => height}px;
  width: 60%;
  top: ${({ top }) => top}px;
  left: 30%;
  background-color: ${({ theme }) => theme.colors.blue.default};
`

export const Sidebar = styled.div`
  width: 4rem;
`
