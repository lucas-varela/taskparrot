import { createRoot } from 'react-dom/client'
import { MemoryRouter, Routes, Route } from 'react-router-dom'
import styled from '@emotion/styled'

const Container = styled.div`
  background-color: red;
`

const Hello = () => {
  return <Container>TaskParrot</Container>
}

const App = () => {
  return (
    <MemoryRouter>
      <Routes>
        <Route path="/" element={<Hello />} />
      </Routes>
    </MemoryRouter>
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
