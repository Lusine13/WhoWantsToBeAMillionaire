import { useEffect, useState } from 'react';
import './index.css';

const Timer = ({ setStop, questionNumber }) => {
    const [ timer, setTimer ] = useState(30);

    useEffect(() => {
        if (timer === 0) {
            setStop(true);
            return;
        }
        const interval = setInterval(() => {
            setTimer((prev) => prev - 1);
        }, 1000);

        return () => clearInterval(interval);
    }, [ timer, setStop ]);

    useEffect(() => {
        setTimer(30);
        setStop(false);
    },[ questionNumber, setStop ]);

   return (
    <div className="timer_container">
        <div className="timer">
            {timer}
        </div>        
    </div>
   );
};

export default Timer;