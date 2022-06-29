import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { ThemeProvider } from '@emotion/react'
import { MemoryRouter, Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import Home from './pages/Home'
import Theme from './theme'
import TaskProvider from './contexts/TaskProvider'

const App = () => {
  return (
    <StrictMode>
      <ThemeProvider theme={Theme}>
        <TaskProvider>
          <Layout>
            <MemoryRouter>
              <Routes>
                <Route path="/" element={<Home />} />
              </Routes>
            </MemoryRouter>
          </Layout>
        </TaskProvider>
      </ThemeProvider>
    </StrictMode>
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
