import '@/styles/globals.css'
import { useState, useEffect } from 'react'
import { SettingsContext } from '../contexts/SettingsContext'

export default function App({ Component, pageProps }) {

    const [insulinRatio, setInsulinRatio] = useState(0);

    const [targetBloodSugar, setTargetBloodSugar] = useState(0);

    const [carbRatio, setCarbRatio] = useState(0);

    useEffect(() => {
        if (window.localStorage.getItem('insulinRatio'))
            setInsulinRatio(window.localStorage.getItem('insulinRatio'))
        if (window.localStorage.getItem('targetBloodSugar'))
            setTargetBloodSugar(window.localStorage.getItem('targetBloodSugar'))
        if (window.localStorage.getItem('carbRatio'))
            setCarbRatio(window.localStorage.getItem('carbRatio'))
    }, []);

    const saveSettings = () => {
        window.localStorage.setItem('insulinRatio', insulinRatio);
        window.localStorage.setItem('targetBloodSugar', targetBloodSugar);
        window.localStorage.setItem('carbRatio', carbRatio);
    }

    return <SettingsContext.Provider value={{
        insulinRatio,
        setInsulinRatio,
        targetBloodSugar,
        setTargetBloodSugar,
        carbRatio,
        setCarbRatio,
        saveSettings
    }}>
        <Component {...pageProps} />
    </SettingsContext.Provider>
}
