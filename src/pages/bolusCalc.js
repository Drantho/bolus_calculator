import React, { useState, useContext } from 'react'
import { SettingsContext } from '@/contexts/SettingsContext';
import Layout from '@/components/layout/Layout';

const bolusCalc = () => {

    const { insulinRatio, targetBloodSugar, carbRatio } = useContext(SettingsContext);

    const [bloodSugar, setBloodSugar] = useState({
        value: null,
        timeStamp: new Date(),
        bloodSugar: ''
    });

    const [status, setStatus] = useState('');

    const [bolus, setBolus] = useState({
        correction: 0,
        carbDose: 0,
        insulinOnBoard: 0,
        value: 0,
        delivered: new Date()
    });

    const [carbs, setCarbs] = useState(0);

    const onChange = (e) => {
        setBloodSugar(prevVal => {
            return {
                ...prevVal,
                value: e.target.value
            }
        })
    }

    const saveBolus = () => {
        setBolus(prev => {
            return {
                ...prev,
                timeStamp: new Date(),
            }
        })

        const bolusHistory = JSON.parse(window.localStorage.getItem('bolusHistory')) || [];
        bolusHistory.push(bolus);
        window.localStorage.setItem('bolusHistory', JSON.stringify(bolusHistory));

        let _status = '\n Bolus:' + JSON.stringify(bolus, null, 2)

        if (bloodSugar.value !== null) {
            _status += '\n Bloodsugar:' + JSON.stringify(bloodSugar, null, 2)
        }

        setStatus(_status);

        setBloodSugar({
            value: 0,
            timeStamp: new Date(),
            notes: ''
        });

        setBolus({
            correction: 0,
            carbDose: 0,
            value: 0,
            timeStamp: new Date()
        });

        setCarbs(0);
    }

    const calculateBolus = () => {

        const bolusHistory = JSON.parse(window.localStorage.getItem('bolusHistory')) || [];
        const recentBolus = bolusHistory[bolusHistory.length - 1];

        let _insulinOnBoard = recentBolus ? new Date() - recentBolus.timeStamp <= 14400000 ? 14400000 - ((new Date() - recentBolus.timeStamp) / 14400000) : 0 : 0;

        if (recentBolus) {
            const timeSinceBolus = new Date().getTime() - new Date(recentBolus.timeStamp).getTime();
            if (timeSinceBolus < 14400000) {
                _insulinOnBoard = (((14400000 - timeSinceBolus) / 14400000) * recentBolus.value).toFixed(2);
            } else {
                _insulinOnBoard = 0;
            }
        }

        let _correction = 0;

        if (bloodSugar.value !== null) {
            _correction = ((bloodSugar.value - targetBloodSugar) / insulinRatio).toFixed(2);
            if (_correction - _insulinOnBoard < 0) {
                _correction = 0;
                if (bloodSugar.value !== null) {
                    setStatus(prev => prev + '\nInsulin on board is greater than calculated correction bolus. Correction may not be necessary.')
                }
            } else {
                _correction = (_correction - _insulinOnBoard).toFixed(2);
            }
        }

        if (bloodSugar.value !== null) {
            const readingHistory = JSON.parse(window.localStorage.getItem('readingHistory')) || [];
            readingHistory.push(bloodSugar);
            window.localStorage.setItem('readingHistory', JSON.stringify(readingHistory));
            setStatus(prev => prev + '\nBloodsugar Reading Saved!\n' + JSON.stringify(bloodSugar, null, 2))
        }

        // let _bolus = ((((bloodSugar.value - targetBloodSugar) / insulinRatio) - _insulinOnBoard) + (carbs / carbRatio)).toFixed(2);
        let _carbDose = (carbs / carbRatio).toFixed(2);

        let _bolus = +_correction + +_carbDose;

        _bolus < 0 ? _bolus = 0 : null;

        setBolus({
            timeStamp: new Date(),
            value: _bolus,
            insulinOnBoard: _insulinOnBoard,
            correction: _correction,
            carbDose: _carbDose
        });
    }

    const bolusChanged = (e) => {
        setBolus(prev => {
            return {
                ...prev,
                value: e.target.value
            }
        })
    }

    const formatDateTime = (date, caller) => {
        console.log('date', date)
        console.log('caller', caller)
        let _date = date ? new Date(date) : new Date();
        return (new Date(_date.getTime() - _date.getTimezoneOffset() * 60000).toISOString()).slice(0, -1);
    }

    return (
        <Layout title="Bolus Calc">
            <h1>Bolus Calc</h1>

<h2>Background Data</h2>
            <div className="input-table">
                <div>
                    <label>
                        Blood Sugar
                    </label>
                </div>
                <div>
                    <input type="number" value={bloodSugar.value} onChange={onChange} />
                </div>
                <div>
                    <label>
                        Time
                    </label>
                </div>
                <div>
                    <input type="datetime-local" value={formatDateTime(bloodSugar.timeStamp, 'blood sugar')} onChange={e => setBloodSugar(prev => {
                        return { ...prev, timeStamp: new Date(e.target.value) }
                    })}></input>
                </div>
                <div>
                    <label>
                        Carbs
                    </label>
                </div>
                <div>
                    <input type="number" value={carbs} onChange={e => setCarbs(e.target.value)} />
                </div>
                <div>
                    <label>Notes</label>
                </div>
                <div>
                    <textarea value={bloodSugar.notes} onChange={e => setBloodSugar(prev => {return {...prev, notes: e.target.value}})} />
                </div>
                <div></div>
                <div>
                    <button onClick={calculateBolus}>Save Reading and Calculate</button><br />
                </div>
            </div>

<h2>Calculations</h2>
            Correction: {bolus.correction}<br />
            Carb Dose: {bolus.carbDose}<br />
            Insulin on board: {bolus.insulinOnBoard}<br />
            Total Bolus: {bolus.value}<br />

            <h2>Bolus Data</h2>

            <div className="input-table">
                <div>
                    <label>
                        Bolus Delivered
                    </label>
                </div>
                <div>
                    <input type="number" value={bolus.value} onChange={bolusChanged} />
                </div>
                <div>
                    <label>
                        Time
                    </label>
                </div>
                <div>
                    <input type="datetime-local" value={formatDateTime(bolus.delivered, 'bolus')} onChange={e => setBolus(prev => {
                        return { ...prev, timeStamp: new Date(e.target.value) }
                    })}></input>
                </div>
                <div></div>
                <div>
                    <button onClick={saveBolus}>Bolus Delivered</button><br />
                </div>
            </div>


            <pre>{status}</pre>

        </Layout>
    )
}

export default bolusCalc