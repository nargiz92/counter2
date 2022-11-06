import React, {ChangeEventHandler, useState} from 'react';
import s from './button.module.css'

type ButtonPropsType = {
    title: string
    addItem: () => void
    disabled:boolean
}

export const Button: React.FC<ButtonPropsType> = (props) => {

    const addValueHandler = () => {
        props.addItem()

    }
let finalyClass= `${s.button}`
    const disStyle = s.disabled ? s.disabled : '';
    finalyClass = `${finalyClass} ${disStyle}`;


    return (
        <div className={s.buttonBorder}>
            <button onClick={addValueHandler} className={finalyClass} disabled={props.disabled}>{props.title}</button>
        </div>
    );
};

