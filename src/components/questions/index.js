import { useEffect, useState } from 'react';
import { questionAnswers } from '../../constants';
import './index.css';

const Questions = ({ setStop, fiftyFiftyUsed, setFiftyFiftyUsed, callFriendUsed, setCallFriendUsed }) => {
    const [questionNumber, setQuestionNumber] = useState(0); 
    const [question, setQuestion] = useState(null);
    const [selectedAnswer, setSelectedAnswer] = useState(null);
    const [answerClass, setAnswerClass] = useState("answer");
    const [isAnswering, setIsAnswering] = useState(false);  
       

    useEffect(() => {        
        const savedState = JSON.parse(sessionStorage.getItem('gameState'));
        if (savedState) {
            setQuestionNumber(savedState.questionNumber);
            setFiftyFiftyUsed(savedState.fiftyFiftyUsed);
            setCallFriendUsed(savedState.callFriendUsed);
        }
    }, [setQuestionNumber, setFiftyFiftyUsed, setCallFriendUsed]);

    useEffect(() => {
        if (questionAnswers[questionNumber]) {
            setQuestion(questionAnswers[questionNumber]);
        }
    }, [questionNumber]);

    const handleClick = (answer) => {
        if (isAnswering) return; 
        setIsAnswering(true); 
        setSelectedAnswer(answer);       
        setAnswerClass("answer active");

        setTimeout(() => {
            setAnswerClass(answer.correct ? "answer correct" : "answer wrong");
        }, 1000);

        setTimeout(() => {
            if (answer.correct) {
                setQuestionNumber((prev) => prev + 1); 
            } else {
                setStop(true); 
            }
        }, 3000); 
    };

    const handleFiftyFifty = () => {
        if (!fiftyFiftyUsed && question) {
            const incorrectAnswers = question.answers.filter((answer) => !answer.correct);
            const randomIncorrectAnswers = incorrectAnswers.slice(0, 2);
            const remainingAnswers = question.answers.filter(
                (answer) => !randomIncorrectAnswers.includes(answer)
            );
            setQuestion({ ...question, answers: remainingAnswers });
            setFiftyFiftyUsed(true);
        }
    };

    const handleCallFriend = () => {
        if (!callFriendUsed && question) {
            const correctAnswer = question.answers.find((answer) => answer.correct);
            setSelectedAnswer(correctAnswer); 
            setAnswerClass("answer correct");
            setCallFriendUsed(true);  
        }
    };

    useEffect(() => {        
        const gameState = {
            questionNumber,
            fiftyFiftyUsed,
            callFriendUsed
        };
        sessionStorage.setItem('gameState', JSON.stringify(gameState));
    }, [questionNumber, fiftyFiftyUsed, callFriendUsed]);

    return (
        <div className="questions_container">
            <div className="question">{question?.question}</div>
            <div className="answers">
                {question?.answers.map((answer) => (
                    <div
                        key={answer.text}
                        className={selectedAnswer === answer ? answerClass : 'answer'}
                        onClick={() => handleClick(answer)}
                    >
                        {answer.text}
                    </div>
                ))}
            </div>
            <div className="helpers">
                <button onClick={handleFiftyFifty} disabled={fiftyFiftyUsed}>50/50</button>
                <button onClick={handleCallFriend} disabled={callFriendUsed}>Call a Friend</button>
            </div>
        </div>
    );
};

export default Questions;
