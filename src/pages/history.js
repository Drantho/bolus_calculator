import React, {useState, useEffect} from 'react'
import Layout from '@/components/layout/Layout';

const history = () => {

    const [readingHistory, setReadingHistory] = useState([]);
    const [bolusHistory, setBolusHistory] = useState([]);

    const [hours, setHours] = useState([]);

    const [historyByDay, setHistoryByDay] = useState([]);

    useEffect(() => {
        const _readingHistory = JSON.parse(window.localStorage.getItem('readingHistory')) || [];
        setReadingHistory(_readingHistory)
        setBolusHistory(JSON.parse(window.localStorage.getItem('bolusHistory')) || [])
        const _hours = [...Array(24)].map(hour => []);
        _readingHistory.forEach(reading => {
            _hours[new Date(reading.timeStamp).getHours()].push(reading.value);
        })
        setHours(_hours)

        const historyByDayObj = _readingHistory.reduce((acc, item) => {
            const date = new Date(item.timeStamp).toLocaleDateString();
            acc[date] = acc[date] || [];
            acc[date].push(+item.value);
            return acc;
        }, {})

        for(let key in historyByDayObj) {
            historyByDayObj[key] = historyByDayObj[key].reduce((acc, item) => +acc + +item, 0) / historyByDayObj[key].length;
        }

        const _historyByDay = [];

        for(let key in historyByDayObj) {
            _historyByDay.push({
                date: key,
                value: historyByDayObj[key].toFixed(0)
            })
        }

        setHistoryByDay(_historyByDay)

    }, [])

    return (
        <Layout title="History">
            <h1>History</h1>

            Average: {readingHistory.reduce((acc, item) => +acc + +item.value, 0) / readingHistory.length}<br/>

            <h2>Average by day</h2>

            {historyByDay.map((day, index) => <div key={index}>{day.date}: {day.value}</div>)}

            <h2>Average by hour</h2>

            {hours.map((hour, index) => hour.length ? <div key={index}>{index}: {(hour.reduce((acc, item) => +acc + +item, 0) / hour.length).toFixed(0) }</div> : <div key={index}>{index}: No readings</div>)}

            <h2>Blood Sugar Reading History</h2>
            <h3>Data</h3>
            {readingHistory.map(item => <div key={item.timeStamp}>{new Date(item.timeStamp).toLocaleDateString()} {new Date(item.timeStamp).toLocaleTimeString()} - {item.value}<p>{item.notes}</p></div>)}
            <h3>Raw</h3>
            <pre>
{JSON.stringify(readingHistory, null, 2)}
            </pre>
            <h2>Bolus History</h2>
            <h3>Data</h3>
            {bolusHistory.map(item => <div key={item.timeStamp}>{new Date(item.timeStamp).toLocaleDateString()} {new Date(item.timeStamp).toLocaleTimeString()} - {item.value}</div>)}
            <h3>Raw</h3>
            <pre>
{JSON.stringify(bolusHistory, null, 2)}
            </pre>
        </Layout>
    )
}

export default history