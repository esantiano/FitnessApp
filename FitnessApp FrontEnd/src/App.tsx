import { useEffect, useMemo, useState } from 'react'
import './App.css'

const formatTime = (totalSeconds: number) => {
  const minutes = Math.floor(totalSeconds / 60)
    .toString()
    .padStart(2, '0')
  const seconds = (totalSeconds % 60).toString().padStart(2, '0')

  return `${minutes}:${seconds}`
}


function App() {
  const [elapsedSeconds, setElapsedSeconds] = useState(0)
  const [isActive, setIsActive] = useState(false)

  useEffect(() => {
    if (!isActive) {
      return
    }

    const intervalId = window.setInterval(() => {
      setElapsedSeconds((current) => current + 1)
    }, 1000)

    return () => {
      window.clearInterval(intervalId)
    }
  }, [isActive])

  const formattedTime = useMemo(() => formatTime(elapsedSeconds), [elapsedSeconds])

  const toggleTimer = () => {
    setIsActive((active) => !active)
  }

  const resetTimer = () => {
    setIsActive(false)
    setElapsedSeconds(0)
  }

  return (
<main className="app-container">
      <section className="timer-panel">
        <h1 className="app-title">Workout Timer</h1>
        <p className="timer-display" aria-live="polite">
          {formattedTime}
        </p>
        <div className="actions">
          <button type="button" onClick={toggleTimer} className="primary-action">
            {isActive ? 'Pause Workout' : 'Start Workout'}
          </button>
          <button type="button" onClick={resetTimer} disabled={elapsedSeconds === 0 && !isActive}>
            Reset
          </button>
        </div>
        <p className="hint">Press start to begin tracking your workout.</p>
      </section>
    </main>
  )
}

export default App
