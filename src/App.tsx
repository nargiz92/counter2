import React, {ChangeEvent, useEffect, useState} from 'react';
import './App.css';
import {Button} from "./button";


function App() {
    const [maxValue, setMaxValue] = useState<number>(0)
    const [minValue, setMinValue] = useState<number>(0)
    const [counter, setCounter] = useState(0)
    const [editMode, setEditMode] = useState(false)

    const incrementCounter = () => setCounter(counter + 1)

    const isMaxValue = maxValue === counter
    const isMinValue = minValue === counter

    const isSettingsError = minValue === maxValue || maxValue < minValue || minValue < 0

    const addSet = () => {
        setEditMode(false)
        localStorage.setItem('maxValue', JSON.stringify(maxValue))
        setMaxValue(maxValue)
        localStorage.setItem('minValue', JSON.stringify(minValue))
        setCounter(minValue)

    }


    useEffect(() => {
        let valueOfCounterAsString = localStorage.getItem('counterValue')
        let minValue = localStorage.getItem('minValue')
        let maxValue = localStorage.getItem('maxValue')

        if (valueOfCounterAsString) {
            setCounter(JSON.parse(valueOfCounterAsString))
        }

        if (minValue) {
            setMinValue(JSON.parse(minValue))
        }

        if (maxValue) {
            setMaxValue(JSON.parse(maxValue))
        }
    }, [])

    const onChangeMaxValueHandler = (e: ChangeEvent<HTMLInputElement>) => {
        if (!editMode) setEditMode(true)
        setMaxValue(e.currentTarget.valueAsNumber)
    }
    const onChangeMinValueHandler = (e: ChangeEvent<HTMLInputElement>) => {
        if (!editMode) setEditMode(true)
        setMinValue(e.currentTarget.valueAsNumber)
    }

    useEffect(() => {
        localStorage.setItem('counterValue', JSON.stringify(counter))
    }, [counter])

    const resetValueHandler = () => {
        localStorage.clear()
        setCounter(0)
    }


    const inputClass = `input ${(minValue >= maxValue || minValue < 0) ? 'errorClass' : ''}`


    return (
        <div className="App">
            <div className={'set'}>
                <div className={'setBorder'}>
                    <p className={'val'}>max value:<input value={maxValue} onChange={onChangeMaxValueHandler}
                                                          type={"number"} className={inputClass}/></p>

                    <p className={'val'}>start value:<input value={minValue} onChange={onChangeMinValueHandler}
                                                            type={"number"} className={inputClass}/></p>
                </div>
                <div className={'borderButton'}>
                    <Button title={'set'} addItem={addSet}
                            disabled={isSettingsError || !editMode}/>
                </div>
            </div>
            <div className={'generalDisplay'}>
                <div className={'borderOfDisplay'}>
                    <h3 className={(isMaxValue||isSettingsError) ? 'red' : 'regularClass'}>{isSettingsError ?'Incorrect values' : editMode ? 'enter values and press "set"' : counter}</h3>
                </div>

                <div className={'buttonOfGeneralDisplay'}>
                    <Button title={'inc'} addItem={incrementCounter}
                            disabled={isMaxValue || editMode}/>
                    <Button title={'reset'} addItem={resetValueHandler}
                            disabled={isMinValue || editMode}/>
                </div>
            </div>
        </div>
    );
}

export default App;
