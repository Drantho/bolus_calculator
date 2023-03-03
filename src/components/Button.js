import React from 'react'
import styles from '@/styles/Home.module.css'

const Button = props => {

    const { label, setNumber } = props;

    const keyPress = () => {
        if(label === 'Clear') {
            setNumber(-10)
        } else if(label === 'Enter') {
            setNumber(-10)
        } else {
            setNumber(label)
        }
    }

    return (
        <div className={styles.button} onClick={keyPress}>{label}</div>
    )
}

export default Button