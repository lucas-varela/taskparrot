import { Global, useTheme } from '@emotion/react'
import { FC } from 'react'
import { createGlobalStyles } from 'renderer/styles'
import { Container } from './styles'
import { LayoutProps } from './types'

const Layout: FC<LayoutProps> = ({ children }) => {
  const theme = useTheme()

  return (
    <>
      <Global styles={createGlobalStyles(theme)} />
      <Container>{children}</Container>
    </>
  )
}

export default Layout
