import '@emotion/react'
import ProjectTheme from './theme'

type ThemeType = typeof ProjectTheme

declare module '@emotion/react' {
  // eslint-disable-next-line @typescript-eslint/no-empty-interface
  export interface Theme extends ThemeType {
    colors: {
      red: string
    }
  }
}
