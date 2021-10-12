import './countercomponent.css';
import { useEffect, useState } from 'react';

export default function CounterComponent(props) {
    let [counterValue, setCounterValue] = useState(0);
    const cssPrefix = 'countercomponent';
    useEffect(() => {
        setCounterValue(props.counterValue);
    }, [props, counterValue])
    return (
        <div className={`${cssPrefix}__container`}>
            <div onClick={() => { setCounterValue(counterValue ? props.counterValueChange(counterValue -= 1) : counterValue) }} style={{}} className={`${cssPrefix}__buttons  minus`}>-</div>
            <div style={{}} className={`${cssPrefix}__buttons  value`}>{counterValue}</div>
            <div onClick={() => { setCounterValue(props.counterValueChange(counterValue += 1)) }} style={{}} className={`${cssPrefix}__buttons  plus`}>+</div>
        </div>
    )
}
