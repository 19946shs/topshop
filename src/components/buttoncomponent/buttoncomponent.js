import './buttoncomponent.css';
import { useEffect, useState } from 'react';

export default function ButtonComponent(props) {
    let [buttonName, setButtonName] = useState(0);
    let [width, setWidth] = useState(0);
    const cssPrefix = 'buttoncomponent';
    useEffect(() => {
        setButtonName(props.buttonName);
        setWidth(props.width)
    }, [props])
    return (
        <div onClick={() => { props.buttonClicked() }} style={{ width: width }} className={`${cssPrefix}__container`}>
            {buttonName}
        </div>
    )
}
