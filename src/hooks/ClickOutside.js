import { useEffect, useState } from 'react';

export default function useOnClickOutside(target) {
    const [clickedOutside, setClickedOutside] = useState(false);
    
    useEffect(() => {
        document.onclick((event) => {
            if(event.target !== document.getElementById(target)) {
                setClickedOutside(true);
            } else {
                setClickedOutside(false);
            }
        })
    });

    return clickedOutside;
}
