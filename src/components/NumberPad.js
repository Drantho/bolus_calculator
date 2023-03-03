import React from 'react'
import styles from '@/styles/Home.module.css'
import Button from '@/components/Button'
const NumberPad = props => {
    const keys = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0];

    const {setNumber, setFinalNumber, numberVal} = props;

    const clearNumber = () => {
        setNumber(-1)
    }

    const enter = () => {
        setFinalNumber(+numberVal)
        setNumber(-10)
    }

    return (
        <div>
            NumberPad
            <div className={styles.padArea}>
                {keys.map(key => <Button key={key} label={key} setNumber={setNumber}/>)}
                <button label='Enter' onClick={enter} className={styles.button}>Enter</button>
                <Button label='Clear' setNumber={setNumber}></Button>
            </div>
        </div>
    )
}

export default NumberPad