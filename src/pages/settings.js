import React, { useContext } from 'react'
import { SettingsContext } from '../contexts/SettingsContext'
import Layout from '@/components/layout/Layout';

const settings = () => {

    const { insulinRatio, setInsulinRatio, targetBloodSugar, setTargetBloodSugar, carbRatio, setCarbRatio, saveSettings } = useContext(SettingsContext);

    return (
        <Layout title="Settings">
            <h1>settings</h1>
            <div className='input-table'>
                <div>
                    <label>
                        Insulin Ratio
                    </label>
                </div>
                <div>
                    <input type="number" value={insulinRatio} onChange={e => setInsulinRatio(e.target.value)} />
                </div>
                <div>
                    <label>
                        Carb Ratio
                    </label>
                </div>
                <div>
                    <input type="number" value={carbRatio} onChange={e => setCarbRatio(e.target.value)} />
                </div>
                <div>
                    <label>
                        Target Bloodsugar
                    </label>
                </div>
                <div>
                    <input type="number" value={targetBloodSugar} onChange={e => setTargetBloodSugar(e.target.value)} />
                </div>
            </div>
            <button onClick={saveSettings}>Save</button>
        </Layout>
    )
}

export default settings