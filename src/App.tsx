import logo from "./logo.svg"
import { Counter } from "./features/counter/Counter"
import "./App.css"
import { useCallback, useEffect, useRef } from "react"
import { useDispatch } from "react-redux"

function App() {
  const dispatch = useDispatch()

  const start = useCallback(() => {
    dispatch({ type: "RUN_TIMER", index: 0 })
    dispatch({ type: "RUN_TIMER", index: 1 })
  }, [dispatch])

  const stop = useCallback(() => {
    dispatch({ type: "STOP_TIMER" })
  }, [dispatch])

  /* 
  const timerId = useRef<number>()
  const start = useCallback(() => {
    timerId.current = Number(
      setTimeout(() => console.log("timer running"), 5000),
    )
  }, [])

  const stop = useCallback(() => {
    clearTimeout(timerId.current)
  }, []) */

  /* useEffect(() => {
    const timerId = setTimeout(() => console.log("timer running"), 1000)
    return () => {
      clearTimeout(timerId)
    }
  }, []) */
  return (
    <div className="App">
      <button onClick={start}>START</button>
      <button onClick={stop}>STOP</button>
    </div>
  )
}

export default App
