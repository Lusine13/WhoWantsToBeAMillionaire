import { useEffect, useState } from 'react';
import { questionAnswers } from '../../constants';
import './index.css';

const Questions = ({
  questionNumber,
  setQuestionNumber,
  setStop,
  stop,
  fiftyFiftyUsed,
  callFriendUsed,
  setFiftyFiftyUsed,
  setCallFriendUsed
}) => {
  const [question, setQuestion] = useState(null);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [answerClass, setAnswerClass] = useState("answer");
  const [isAnswering, setIsAnswering] = useState(false);

  useEffect(() => {
    setQuestion(questionAnswers[questionNumber]);
    setSelectedAnswer(null);
    setAnswerClass("answer");
    setIsAnswering(false);
  }, [questionNumber, stop]);

  const handleClick = (answer) => {
    if (isAnswering || stop) return;

    setIsAnswering(true);
    setSelectedAnswer(answer);
    setAnswerClass("answer active");

    setTimeout(() => {
      setAnswerClass(answer.correct ? "answer correct" : "answer wrong");
    }, 1000);

    setTimeout(() => {
      if (answer.correct) {
        if (questionNumber === questionAnswers.length - 1) {          
          setQuestionNumber(prev => prev + 1); 
          setStop(true);
        } else {
          setQuestionNumber(prev => prev + 1);
        }
      } else {
        setStop(true);
      }
    }, 3000);
  };

  const handleFiftyFifty = () => {
    if (fiftyFiftyUsed || stop || !question) return;

    const incorrect = question.answers.filter(a => !a.correct);
    const toRemove = incorrect.sort(() => 0.5 - Math.random()).slice(0, 2);
    const remaining = question.answers.filter(a => !toRemove.includes(a));

    setQuestion({ ...question, answers: remaining });
    setFiftyFiftyUsed(true);
  };
  
  const handleCallFriend = () => {
    if (callFriendUsed || stop || !question) return;

    const correct = question.answers.find(a => a.correct);
    setSelectedAnswer(correct); 
    setAnswerClass("answer correct");
    setCallFriendUsed(true);    
  };

  return (
    <div className="questions_container">
      <div className="question">{question?.question}</div>

      <div className="answers">
        {question?.answers.map(answer => (
          <div
            key={answer.text}
            className={selectedAnswer === answer ? answerClass : "answer"}
            onClick={() => handleClick(answer)}
          >
            {answer.text}
          </div>
        ))}
      </div>

      <div className="helpers">
        <button onClick={handleFiftyFifty} disabled={fiftyFiftyUsed || stop}>
          50/50
        </button>
        <button onClick={handleCallFriend} disabled={callFriendUsed || stop}>
          Call a Friend
        </button>
      </div>
    </div>
  );
};

export default Questions;
