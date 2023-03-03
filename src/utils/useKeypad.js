import { useState, useEffect } from 'react';

const [number, setNumber] = useState(-1);

const [numberVal, setNumberVal] = useState(' ');

const [finalNumber, setFinalNumber] = useState(0);

useEffect(() => {
    console.log('numberVal: ', numberVal)
    console.log('number: ', number)
    console.log("numberVal !== '' && number !== 0", numberVal !== '')
    if(number < -1) {
        setNumberVal('')
    } else if(number !== -1) {
        setNumberVal(prev => prev + number)
        setNumber(-1)
    }
}, [number])