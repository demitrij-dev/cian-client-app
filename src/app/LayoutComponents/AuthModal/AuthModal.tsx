"use client"
import cl from "./AuthModal.module.scss"
import React, {useEffect, useState} from "react";
import Auth from "@/app/Service/Auth/Auth";
import {log} from "util";
import {createPortal} from "react-dom";
import PopUp from "@/app/UIComponents/PopUp/PopUp";
import UserAuthStore from "@/app/Service/UserStore/UserAuthStore";
interface IClose{
    onClose: () => void
}
const AuthModal = ({onClose}: IClose) => {
    const { token, userIsAuth, setToken, setUserIsAuth } = UserAuthStore();
    const [popUpText, setPopUpText] = useState(null)
    const [email, setEmail] = useState<string>("")
    const [password, setPassword] = useState<string>("")
    const onSubmit = async () => {
        await Auth.login(email, password)
            .then(r => {
                setToken(r.token)
                setUserIsAuth(true)
                console.log(token, userIsAuth)
            })
            .catch(e => {})
    }
    useEffect(() => {
        if(popUpText){
            const timeout = setTimeout(() => {
                setPopUpText(null)
            }, 2000)
            return () => clearTimeout(timeout)
        }
    }, [popUpText])
    return (
        <div className={cl.ModalWrapper}>
            <div className={cl.CloseButton} onClick={onClose}/>
            <div className={cl.Modal}>
                <div className={cl.ModalLogo}/>
                <h1>Добро пожаловать!</h1>
                <div className={cl.ModalContent}>
                    <div className={cl.ModalContentInputs}>
                        <input placeholder="Почта" type="email" value={email} onChange={(e) => setEmail(e.target.value)}/>
                        <input placeholder="Пароль" type="password" value={password} onChange={(e) => setPassword(e.target.value)}/>
                    </div>
                    <div className={cl.ModalContentButtons}>
                        <button onClick={onSubmit}>Войти</button>
                    </div>
                </div>
            </div>

            {popUpText && createPortal(<PopUp text={popUpText} />, document.body)}
        </div>
    );
};

export default AuthModal;