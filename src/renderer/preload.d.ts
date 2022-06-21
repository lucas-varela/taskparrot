import { Channels } from 'main/preload'
import '@emotion/react'
import ProjectTheme from './theme'

declare global {
  interface Window {
    electron: {
      ipcRenderer: {
        sendMessage(channel: Channels, args: unknown[]): void
        on(
          channel: string,
          func: (...args: unknown[]) => void
        ): (() => void) | undefined
        once(channel: string, func: (...args: unknown[]) => void): void
      }
    }
  }
}

type ThemeType = typeof ProjectTheme

declare module '@emotion/react' {
  // eslint-disable-next-line @typescript-eslint/no-empty-interface
  export interface Theme extends ThemeType {}
}

export {}
