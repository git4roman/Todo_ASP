import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import TodoList from './Components/TodoList'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div className="app">
        <h1>My Todos</h1>
        <div className="TodoList">
          <TodoList/>
        </div>
      </div>
    </>
  )
}

export default App
