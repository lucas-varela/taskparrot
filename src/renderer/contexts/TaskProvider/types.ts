import { ReactNode } from 'react'

export type Task = {
  id: string
  start: Date
  end: Date
  isTemporary?: boolean
}

export type TaskContextProps = {
  tasks: Task[]
  setTasks: (tasks: Task[]) => void
  addTask: (task: Task) => void
  removeTask: (task: string | Task) => void
  getTask: (id: string) => Task | undefined
}

export type TaskProviderProps = {
  children?: ReactNode
}
