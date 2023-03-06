import React, { useState, useEffect } from 'react'
import Layout from '@/components/layout/Layout';

const history = () => {
    const [readingHistory, setReadingHistory] = useState([]);
    const [bolusHistory, setBolusHistory] = useState([]);

    const [filteredReadingHistory, setFilteredReadingHistory] = useState([]);
    const [filteredBolusHistory, setFilteredBolusHistory] = useState([]);

    const [hours, setHours] = useState([]);

    const [historyByDay, setHistoryByDay] = useState([]);

    const [startDay, setStartDay] = useState('');
    const [endDay, setEndDay] = useState('');

    const [minReading, setMinReading] = useState('');
    const [maxReading, setMaxReading] = useState('');

    const [loaded, setLoaded] = useState(false);

    const getHistory = () => {
        const _readingHistory = JSON.parse(window.localStorage.getItem('readingHistory')) || [];
        const _bolusHistory = JSON.parse(window.localStorage.getItem('bolusHistory')) || [];

        setReadingHistory(_readingHistory)
        setBolusHistory(_bolusHistory)

        setFilteredReadingHistory(_readingHistory)
        setFilteredBolusHistory(_bolusHistory)
    }

    const dateCompare = (date1, date2) => {
        const d1 = new Date(date1);
        const d2 = new Date(date2);
        if (d1.getTime() > d2.getTime()) {
            return 1
        } else if (d1.getTime() < d2.getTime()) {
            return -1
        }
        return 0
    }

    // TODO timezone is set to MST, need to update so all can use
    const filterDate = history => {
        if (startDay !== '') {
            history = history.filter(item => {
                // addHours(8) is to account for MST timezone
                return new Date(item.timeStamp).toISOString() > new Date(startDay + ' UTC').addHours(8).toISOString();
            })
        }
        if (endDay !== '') {
            const endDate = new Date(new Date(endDay).setHours(23, 59, 59, 999)).setDate(new Date(endDay).getDate() + 1);
            history = history.filter(item => {
                return dateCompare(new Date(item.timeStamp).setHours(0, 0, 0, 0), endDate) <= 0;
            });
        }
        return history;
    }

    const filterReadings = history => {
        if (minReading !== '') {
            history = history.filter(item => {
                return +item.value >= +minReading;
            })
        }
        if (maxReading !== '') {
            history = history.filter(item => {
                return +item.value <= +maxReading;
            })
        }
        return history;
    }

    const processHours = () => {
        const _hours = [...Array(24)].map(hour => []);
        filteredReadingHistory.forEach(reading => {
            _hours[new Date(reading.timeStamp).getHours()].push(reading.value);
        })
        setHours(_hours)
    }

    const processHistoryByDay = () => {

        const historyByDayObj = filteredReadingHistory.reduce((acc, item) => {
            const date = new Date(item.timeStamp).toLocaleDateString();
            acc[date] = acc[date] || [];
            acc[date].push(+item.value);
            return acc;
        }, {})

        for (let key in historyByDayObj) {
            historyByDayObj[key] = historyByDayObj[key].reduce((acc, item) => +acc + +item, 0) / historyByDayObj[key].length;
        }

        const _historyByDay = [];

        for (let key in historyByDayObj) {
            _historyByDay.push({
                date: key,
                value: historyByDayObj[key].toFixed(0)
            })
        }

        setHistoryByDay(_historyByDay)

    }

    useEffect(() => {
        const _readingHistory = JSON.parse(window.localStorage.getItem('readingHistory')) || [];
        const _bolusHistory = JSON.parse(window.localStorage.getItem('bolusHistory')) || [];

        setReadingHistory(prev => {
            console.log('setting reading history', prev)
            return JSON.parse(window.localStorage.getItem('readingHistory')) || []
        })
        setBolusHistory(_bolusHistory)

        setFilteredReadingHistory(prev => {
            console.log('setting filtered reading history', prev)
            return JSON.parse(window.localStorage.getItem('readingHistory')) || []
        })
        setFilteredBolusHistory(_bolusHistory)
        setLoaded(true);
    }, [])

    useEffect(() => {
        processHours();
        processHistoryByDay();
    }, [filteredReadingHistory]);

    useEffect(() => {
        if (loaded) {
            setFilteredReadingHistory(filterDate(readingHistory));
        }
    }, [startDay, endDay])

    useEffect(() => {
        if (loaded) {
            setFilteredReadingHistory(filterReadings(readingHistory));
        }
    }, [minReading, maxReading])

    Date.prototype.addHours = function (h) {
        this.setTime(this.getTime() + (h * 60 * 60 * 1000));
        return this;
    }

    return (
        <Layout title="History">
            <section>
                <h1>History</h1>
            </section>

            <section>
                {startDay}<br />
                {endDay}
                <h2>Range</h2>
                <label>
                    Start Day
                    <input type="date" value={startDay} onChange={e => setStartDay(e.target.value)} />
                    {startDay !== '' && <button onClick={() => setStartDay('')}>Clear</button>}
                </label>
                <label>
                    End Day
                    <input type="date" value={endDay} onChange={e => setEndDay(e.target.value)} />
                    {endDay !== '' && <button onClick={() => setEndDay('')}>Clear</button>}
                </label>
                <label>
                    Min Reading
                    <input type="number" value={minReading} onChange={e => setMinReading(e.target.value)} />
                    {minReading !== '' && <button onClick={() => setMinReading('')}>Clear</button>}
                </label>
                <label>
                    Max Reading
                    <input type="number" value={maxReading} onChange={e => setMaxReading(e.target.value)} />
                    {maxReading !== '' && <button onClick={() => setMaxReading('')}>Clear</button>}
                </label>
            </section>

            <section>
                <h2>Overall Average</h2>

                Average: {filteredReadingHistory.length ? (filteredReadingHistory?.reduce((acc, item) => +acc + +item.value, 0) / filteredReadingHistory.length).toFixed(0) : 'No readings'}<br />

                <h2>Average by day</h2>

                {historyByDay.length ? historyByDay.map((day, index) => <div key={index}>{day.date}: {day.value}</div>) : 'No readings'}
            </section>
            <section>
                <h2>Average by hour</h2>

                {hours.map((hour, index) => hour.length ? <div key={index}>{index}: {(hour.reduce((acc, item) => +acc + +item, 0) / hour.length).toFixed(0)}</div> : <div key={index}>{index}: No readings</div>)}

                <h2>Blood Sugar Reading History</h2>
                <h3>Data</h3>
                {filteredReadingHistory.map(item => <div key={item.timeStamp}>{new Date(item.timeStamp).toDateString()} {new Date(item.timeStamp).toLocaleTimeString()} - {item.value}<p>{item.notes}</p></div>)}
                <h3>Raw</h3>
                <pre>
                    {JSON.stringify(filteredReadingHistory, null, 2)}
                </pre>
            </section>
            <section>
                <h2>Bolus History</h2>
                <h3>Data</h3>
                {bolusHistory.map(item => <div key={item.timeStamp}>{new Date(item.timeStamp).toDateString()} {new Date(item.timeStamp).toLocaleTimeString()} - {item.value}</div>)}
                <h3>Raw</h3>
                <pre>
                    {JSON.stringify(bolusHistory, null, 2)}
                </pre>
            </section>
        </Layout>
    )
}

export default history