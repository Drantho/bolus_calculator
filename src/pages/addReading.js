import React, { useState } from 'react'
import Layout from '@/components/layout/Layout';

const addReading = () => {

    const [bloodSugar, setBloodSugar] = useState({
        value: 0,
        timeStamp: new Date()
    });

    const [status, setStatus] = useState('');

    const formatDateTime = (date) => {
        return (new Date(date.getTime() - date.getTimezoneOffset() * 60000).toISOString()).slice(0, -1);
    }

    const onChange = (e) => {
        setBloodSugar(prevVal => {
            return {
                ...prevVal,
                value: e.target.value
            }
        })
    }

    const saveReading = () => {
        const history = JSON.parse(window.localStorage.getItem('history')) || [];
        history.push(bloodSugar);
        window.localStorage.setItem('history', JSON.stringify(history));
        setBloodSugar({
            value: 0,
            timeStamp: new Date()
        })
        setStatus('Saved!\n' + JSON.stringify(bloodSugar, null, 2))
    }

    return (
        <Layout title="Add Reading">
            <h1>Add Reading</h1>
            <div className="input-table">
                <div>
                    <label htmlFor='bloodSugar'>
                        Blood Sugar
                    </label>
                </div>
                <div>
                    <input id="bloodSugar" type="number" value={bloodSugar.value} onChange={onChange} />
                </div>
                <div>
                    <label htmlFor="time">
                        Time
                    </label>
                </div>
                <div>
                        <input id="time" type="datetime-local" value={formatDateTime(bloodSugar.timeStamp)} onChange={e => setBloodSugar(prev => {
                            return { ...prev, timeStamp: new Date(e.target.value) }
                        })}></input>
                </div>
                <div></div>
                <div>
                    <button onClick={saveReading}>Save</button><br />
                </div>
            </div>

            <pre>
                {status}
            </pre>
        </Layout>
    )
}

export default addReading