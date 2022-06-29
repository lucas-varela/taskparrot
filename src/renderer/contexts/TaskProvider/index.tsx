import { createContext, FC, useContext, useState } from 'react'
import { Task, TaskContextProps, TaskProviderProps } from './types'

export { Task }

const TaskContext = createContext<TaskContextProps>({
  tasks: [],
  setTasks: () => undefined,
  addTask: () => undefined,
  removeTask: () => undefined,
  getTask: () => ({} as Task),
})

export const useTasks = () => useContext(TaskContext)

const TaskProvider: FC<TaskProviderProps> = ({ children }) => {
  const [tasks, setTasks] = useState<Task[]>([])

  const addTask = (task: Task) => {
    setTasks((prev) => [...prev, task])
  }

  const removeTask = (task: Task | string) => {
    const copy = [...tasks]
    const index =
      typeof task === 'string'
        ? copy.findIndex((e) => e.id === task)
        : copy.indexOf(task)

    copy.splice(index, 1)

    if (index !== -1) setTasks(copy)
  }

  const getTask = (id: string) => {
    return tasks.find((e) => e.id === id)
  }

  return (
    <TaskContext.Provider
      value={{
        tasks,
        setTasks,
        addTask,
        removeTask,
        getTask,
      }}
    >
      {children}
    </TaskContext.Provider>
  )
}

export default TaskProvider
