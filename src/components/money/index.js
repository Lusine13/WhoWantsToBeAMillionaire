import { useEffect } from 'react';
import { EarningMoney } from '../../constants';
import { useLocalStorage } from '../sheared/hooks';
import './index.css';

const Money = ({ questionNumber }) => {
  const [earned, setEarned] = useLocalStorage("earned", 0);

  useEffect(() => {
    if (questionNumber > 0) {
      setEarned(EarningMoney[questionNumber - 1]);
    } else {
      setEarned(0);
    }
  }, [questionNumber, setEarned]);

  return (
    <div className="aside_container">
      <ul className="moneyList">
        {EarningMoney.map((amount, index) => (
          <li
            key={index}
            className={
              questionNumber === index + 1
                ? 'moneyListItem active'
                : 'moneyListItem'
            }
          >
            <span className="number">{index + 1}</span>
            <span className="amount">{amount}</span>
          </li>
        ))}
      </ul>

      <div className="earnedAmount">
        <strong>ՎԱՍՏԱԿԱԾ ԳՈՒՄԱՐ: </strong> {earned}
      </div>
    </div>
  );
};

export default Money;
