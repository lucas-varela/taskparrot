import { css, Theme } from '@emotion/react'

export const createGlobalStyles = (theme: Theme) => {
  return css`
    html {
      font-size: 16px;
      background-color: ${theme.colors.blue.lightest};
    }

    body {
      margin: 0;
    }
  `
}
