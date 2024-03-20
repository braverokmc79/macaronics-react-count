import { useState, memo, useCallback, useMemo, useEffect } from 'react';

import IconButton from '../UI/IconButton.jsx';
import MinusIcon from '../UI/Icons/MinusIcon.jsx';
import PlusIcon from '../UI/Icons/PlusIcon.jsx';
import CounterOutput from './CounterOutput.jsx';
import { log } from '../../log.js';
import CounterHistory from './CounterHistory';

// million-ignore
function isPrime(number) {
  log('Calculating if is prime number', 2, 'other');

  if (number <= 1) {
    return false;
  }

  const limit = Math.sqrt(number);

  for (let i = 2; i <= limit; i++) {
    if (number % i === 0) {
      return false;
    }
  }

  return true;
}

const Counter = memo(function Counter({ initialCount }) {
  log('<Counter /> rendered', 1);


  const initialCountIsPrime = useMemo(
    () => isPrime(initialCount),
    [initialCount]
  );

  // const [counter, setCounter] = useState(initialCount);
  const [counterChanges, setCounterChanges] = useState([
     {value:initialCount, id:new Date().getTime()+Math.random()*1000}  
    ]);


  // useEffect(()=>{
  //  setCounterChanges([ {value:initialCount, id:new Date().getTime()+Math.random()*1000}  ]);
  // }, [initialCount]);

    

  const currentCounter = counterChanges.reduce(
    (prevCounter, counterChange) => prevCounter + counterChange.value,
    0
  );

  const handleDecrement = useCallback(function handleDecrement() {
    // setCounter((prevCounter) => prevCounter - 1);
    setCounterChanges((prevCounterChanges) => [
     {value:-1, id:new Date().getTime()+Math.random()*1000} , ...prevCounterChanges]);
  }, []);

  const handleIncrement = useCallback(function handleIncrement() {
    // setCounter((prevCounter) => prevCounter + 1);
    setCounterChanges((prevCounterChanges) => [
       {value:1, id:new Date().getTime()+Math.random()*1000} , ...prevCounterChanges]);
  }, []);

  return (
    <section className="counter">
      <p className="counter-info">
      초기 카운터 값은 <strong>{initialCount}</strong> {' '}
        <strong> {initialCountIsPrime ? '은 소수 입니다.' : '은 소수가 아닙니다.'}</strong> 
      </p>
      <p>
        <IconButton icon={MinusIcon} onClick={handleDecrement}>
        감소
        </IconButton>
        <CounterOutput value={currentCounter} />
        <IconButton icon={PlusIcon} onClick={handleIncrement}>
        증가
        </IconButton>
      </p>

      <CounterHistory history={counterChanges} />
    </section>
  );
});

export default Counter;