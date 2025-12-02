import Questions from '../../../components/questions';
import Timer from '../../../components/timer';
import Money from '../../../components/money';
import { useLocalStorage } from '../../sheared/hooks';
import { questionAnswers } from '../../../constants';
import { EarningMoney } from '../../../constants';


import './index.css';

const Cabinet = () => {
  const [questionNumber, setQuestionNumber] = useLocalStorage("questionNumber", 0);
  const [stop, setStop] = useLocalStorage("stop", false);
  const [fiftyFiftyUsed, setFiftyFiftyUsed] = useLocalStorage("fiftyFiftyUsed", false);
  const [callFriendUsed, setCallFriendUsed] = useLocalStorage("callFriendUsed", false);

  const restartGame = () => {
    setQuestionNumber(0);
    setStop(false);
    setFiftyFiftyUsed(false);
    setCallFriendUsed(false);
    
    localStorage.removeItem("questionNumber");
    localStorage.removeItem("stop");
    localStorage.removeItem("fiftyFiftyUsed");
    localStorage.removeItem("callFriendUsed");
    localStorage.removeItem("earned");
    localStorage.removeItem("timer");
  };

  return (
    <div className="main_container">
      <Timer
        stop={stop}
        setStop={setStop}
        questionNumber={questionNumber}
      />

      <Questions
        key={questionNumber}
        questionNumber={questionNumber}
        setQuestionNumber={setQuestionNumber}
        questionAnswers={questionAnswers}
        setStop={setStop}
        stop={stop}
        fiftyFiftyUsed={fiftyFiftyUsed}
        callFriendUsed={callFriendUsed}
        setFiftyFiftyUsed={setFiftyFiftyUsed}
        setCallFriendUsed={setCallFriendUsed}
      />

      <Money questionNumber={questionNumber} />

      {stop && (
  <div className="gameEndContainer">
    <div className="gameResult">
      {questionNumber === questionAnswers.length ? (
        <h2>🎉 Դուք հաղթեցիք!</h2>
      ) : (
        <h2>❌ Խաղն ավարտվեց</h2>
      )}
      <p>
        Վաստակած գումար՝ {questionNumber > 0 ? EarningMoney[questionNumber - 1] : 0} 
      </p>
    </div>
    <button className="restartButton" onClick={restartGame}>
      Վերսկսել խաղը
    </button>
  </div>
)}

    </div>
  );
};

export default Cabinet;
