import { useState } from 'react';
import Questions from '../../components/questions';
import Timer from '../../components/timer';
import Money from '../../components/money';
import { questionAnswers } from '../../constants';

import './index.css';

const Cabinet = () => {
    const [ questionNumber, setQuestionNumber ] = useState(0)
    const [ stop, setStop ] = useState(false);
    const [ fiftyFiftyUsed, setFiftyFiftyUsed ] = useState(false); 
    const [ callFriendUsed, setCallFriendUsed ] = useState(false);
    const [ earned, setEarned ] = useState(0);
   
   
    const restartGame = () => {
        setQuestionNumber(0);  
        setStop(false);  
        setFiftyFiftyUsed(false);  
        setCallFriendUsed(false); 
        setEarned(0);
    };
    
    return (
        <div className="main_container">
            <Timer 
            stop={stop}
            setStop ={setStop} 
            questionNumber={questionNumber} />

            <Questions 
            questionNumber={questionNumber}
            setQuestionNumber={setQuestionNumber}
            questionAnswers={questionAnswers}
            setStop={setStop}
            fiftyFiftyUsed={fiftyFiftyUsed}
            callFriendUsed={callFriendUsed}
            setFiftyFiftyUsed={setFiftyFiftyUsed}
            setCallFriendUsed={setCallFriendUsed}
            />   
            <Money 
                questionNumber={questionNumber} 
                earned={earned} 
                setEarned={setEarned} 
            /> 
             {stop && (
                <button className="restartButton" onClick={restartGame}>
                    Restart Game
                </button>
            )}        
        </div>
    );
};

export default Cabinet;
