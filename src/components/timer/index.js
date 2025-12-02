import { useEffect, useState } from 'react';
import { useLocalStorage } from '../sheared/hooks';
import './index.css';

const Timer = ({ setStop, questionNumber, stop }) => {
  
  const [timer, setTimer] = useLocalStorage("timer", 30);
  
  useEffect(() => {
    setTimer(30);
  }, [questionNumber, stop, setTimer]);

  useEffect(() => {
    if (stop) return; 
    if (timer <= 0) {
      setStop(true);
      setTimer(0); 
      return;
    }

    const interval = setInterval(() => {
      setTimer(prev => {
        if (prev <= 1) {
          clearInterval(interval);
          setStop(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [timer, stop, setStop, setTimer]);

  return (
    <div className="timer_container">
      <div className="timer">{timer}</div>
    </div>
  );
};

export default Timer;
