import { ThemeProvider } from '@emotion/react'
import { createRoot } from 'react-dom/client'
import { MemoryRouter, Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import Timeline from './pages/Timeline'
import Theme from './theme'

const App = () => {
  return (
    <ThemeProvider theme={Theme}>
      <MemoryRouter>
        <Layout>
          <Routes>
            <Route path="/" element={<Timeline />} />
          </Routes>
        </Layout>
      </MemoryRouter>
    </ThemeProvider>
  )
}

const container = document.getElementById('root')
// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
const root = createRoot(container!)
root.render(<App />)

// TODO: remove ipc example
// calling IPC exposed from preload script
window.electron.ipcRenderer.once('ipc-example', (arg) => {
  // eslint-disable-next-line no-console
  console.log(arg)
})
window.electron.ipcRenderer.sendMessage('ipc-example', ['ping'])

export default App
