import { css, Theme } from '@emotion/react'
import Inter300 from '../../assets/fonts/inter-v11-latin-300.woff2'
import Inter500 from '../../assets/fonts/inter-v11-latin-500.woff2'
import Inter700 from '../../assets/fonts/inter-v11-latin-700.woff2'
import InterRegular from '../../assets/fonts/inter-v11-latin-regular.woff2'

export const createGlobalStyles = (theme: Theme) => {
  return css`
    /* inter-300 - latin */
    @font-face {
      font-family: 'Inter';
      font-style: normal;
      font-weight: 300;
      src: local(''), url('${Inter300}') format('woff2');
    }

    /* inter-regular - latin */
    @font-face {
      font-family: 'Inter';
      font-style: normal;
      font-weight: 400;
      src: local(''), url('${InterRegular}') format('woff2');
    }

    /* inter-500 - latin */
    @font-face {
      font-family: 'Inter';
      font-style: normal;
      font-weight: 500;
      src: local(''), url('${Inter500}') format('woff2');
    }

    /* inter-700 - latin */
    @font-face {
      font-family: 'Inter';
      font-style: normal;
      font-weight: 700;
      src: local(''), url('${Inter700}') format('woff2');
    }

    html {
      background-color: ${theme.colors.blue.background};
      font-family: 'Inter', sans-serif;
      font-size: 16px;
      color: ${theme.colors.gray.darker};
    }

    body {
      margin: 0;
    }
  `
}
