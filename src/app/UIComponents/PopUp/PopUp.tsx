"use client"
import React, {useEffect, useState} from 'react';
import cl from "./PopUp.module.scss"
import {createPortal} from "react-dom";
// Временно всплывающее окно с переданной в параметрах информацией
const PopUp = ({text}: {text: string}) => {
    const [isVisible, setIsVisible] = useState<boolean>(true)
    useEffect(() => {
        const timeout = setTimeout(() => {
            setIsVisible(false)
        }, 2000)
        return () => {
            clearTimeout(timeout)
        }
    }, [])
    if(isVisible){
        return  (
            createPortal(<div className={cl.Popup}>
                {text}
            </div>, document.body)
        )
    }
};

export default PopUp;