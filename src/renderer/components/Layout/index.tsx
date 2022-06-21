import { FC } from 'react'
import { Container } from './styles'
import { LayoutProps } from './types'

const Layout: FC<LayoutProps> = ({ children }) => {
  return <Container>{children}</Container>
}

export default Layout
