import { useEffect, useRef, useState } from 'react';
import './App.css';
import "bootstrap-icons/font/bootstrap-icons.css";


function App() {

  const [sessionMinute, setSessionMinute] = useState(25)
  const [restMinute, setRestMinute] = useState(5)
  const [minute, setMinute] = useState(25)
  const [second, setSecond] = useState(0)
  const [toggle, setToggle] = useState('session')
  const [isActive, setIsActive] = useState(true)

  const interval = useRef(null)
  const audio = useRef()

  useEffect(() => {
    if (second === 0 && minute === 0) {
      audio.current.play()
    }

    if (second === -1 && toggle === 'session') {
      setMinute(prevMinute => prevMinute - 1)
      setSecond(prevSecond => prevSecond = 59)
    }

    if (second <= -1 && minute === 0 && toggle === 'session') {
      rest()
      setToggle(prevToggle => prevToggle = 'rest')
    }

    if (second === -1 && toggle === 'rest') {
      setMinute(prevMinute => prevMinute - 1)
      setSecond(prevSecond => prevSecond = 59)
    }

    if (second <= -1 && minute === 0 && toggle === 'rest') {
      session()
      setToggle(prevToggle => prevToggle = 'session')
    }

  }, [second])

  const startPause = () => {
    if (isActive) {
      interval.current = setInterval(() => {
        setSecond(prevSecond => prevSecond - 1)
      }, 1000)

      setIsActive(prevIsActive => prevIsActive = false)
    } else {
      clearInterval(interval.current)
      setIsActive(prevIsActive => prevIsActive = true)
    }
    
  }

  const session = () => {
    setMinute(prevMinute => prevMinute = sessionMinute)
    setSecond(prevSecond => prevSecond = 0)
  }
  
  const rest = () => {
    setMinute(prevMinute => prevMinute = restMinute)
    setSecond(prevSecond => prevSecond = 0)
  }

  const reset = () => {
    clearInterval(interval.current)
    setMinute(prevMinute => prevMinute = 25)
    setSecond(prevSecond => prevSecond = 0)
    setSessionMinute(prevSessionMinute => prevSessionMinute = 25)
    setRestMinute(prevRestMinute => prevRestMinute = 5)
    setToggle(prevToggle => prevToggle = 'session')
    setIsActive(prevIsActive => prevIsActive = true)
    audio.current.pause()
    audio.current.currentTime = 0
  }

  const increaseSession = () => {
    if (sessionMinute === 60 || minute === 60) {return}
    setMinute(prevMinute => prevMinute + 1)
    setSessionMinute(prevSessionMinute => prevSessionMinute + 1)
  }
  
  const decreaseSession = () => {
    if (sessionMinute === 1 && minute === 1) {
    
    } else {
      setMinute(prevMinute => prevMinute - 1)
      setSessionMinute(prevSessionMinute => prevSessionMinute - 1)
    }
  }

  const increaseRest = () => {
    if (restMinute === 60) {return}
    setRestMinute(prevRestMinute => prevRestMinute + 1)
  }

  const decreaseRest = () => {
    if (restMinute === 1) {return}
    setRestMinute(prevRestMinute => prevRestMinute - 1)
  }

  return (
    <div className='clock-frame container d-flex flex-column align-items-center border rounded bg-secondary'>
      <div className='app-name text-center my-3 py-1 px-3 h1 rounded bg-white fw-bold'>Pomodoro Clock</div>

      <div className='display border d-flex justify-content-center align-items-center flex-column rounded bg-white'>
        <div className='fs-4' id='timer-label'>{toggle === 'session' ? 'Session' : 'Break' }</div>
        <div className='number fs-1 fw-bold' id='time-left'>{minute < 10 ? `0${minute}` : `${minute}`}:{second < 10 ? `0${second}`: `${second}`}</div>
      </div>
      
      <div className='controls fs-3 d-flex text-white justify-content-evenly my-3'>
        <div id='start_stop' className='button bg-primary rounded px-3' onClick={startPause}>
        <i className="bi bi-play"></i><i className="bi bi-pause"></i>
        </div>
        <i id='reset' className="button bi bi-arrow-clockwise bg-danger rounded px-3" onClick={reset}></i>
      </div>
      
      <div className='d-flex justify-content-evenly border rounded bg-white mb-3'>

        <div className='d-flex flex-column align-items-center p-3'>
          <div id='session-label' className='text-center'>Session Lenght</div>
          <i className="button bi bi-caret-up fs-3 bg-primary rounded text-white px-2" id='session-increment' onClick={increaseSession}></i>
          <div className='number fs-3' id='session-length'>{sessionMinute}</div>
          <i className="button bi bi-caret-down fs-3 bg-primary rounded text-white px-2" id='session-decrement' onClick={decreaseSession}></i>
        </div>

        <div className='d-flex flex-column align-items-center p-3'>
          <div id='break-label' className='text-center'>Break Length</div>
          <i className="button bi bi-caret-up fs-3 bg-primary rounded text-white px-2" id='break-increment' onClick={increaseRest}></i>
          <div className='number fs-3' id='break-length'>{restMinute}</div>
          <i className="button bi bi-caret-down fs-3 bg-primary rounded text-white px-2" id='break-decrement' onClick={decreaseRest}></i>
        </div>
      </div>

      <audio id='beep' ref={audio} src="https://www.mariomayhem.com/downloads/sound_tracks/Super_Mario_Bros._1/13-hurry.mp3"></audio>
    </div>
  );
}

export default App;
