"use client"
import React, {useEffect, useState} from 'react';
import cl from "./PopUp.module.scss"
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
    return ( isVisible ?
            <div className={cl.Popup}>
                {text}!
            </div> : null
    )
};

export default PopUp;