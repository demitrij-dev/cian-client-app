"use client"
import cl from "./AuthModal.module.scss"
import React, {useEffect, useState} from "react";
import Auth from "@/app/Service/Auth/Auth";
import {createPortal} from "react-dom";
import PopUp from "@/app/UIComponents/PopUp/PopUp";
import UserAuthStore from "@/app/Service/UserStore/UserAuthStore";
//@ts-ignore
import Cookies from 'js-cookie';

interface IClose{
    onClose: () => void
}
// Модальное окно входа и регистрации
const AuthModal = ({onClose}: IClose) => {
    // Состояние аутентификации
    const { token, userIsAuth, setToken, setUserIsAuth } = UserAuthStore();
    const [popUpText, setPopUpText] = useState(null)
    // Состояние ввода
    const [email, setEmail] = useState<string>("")
    const [password, setPassword] = useState<string>("")
    // Обработчик клика, отправляет запрос в сервис
    const onSubmit = async () => {
        await Auth.login(email, password)
            .then(r => {
                setToken(r.token)
                setUserIsAuth(true)
                Cookies.set("token", r.token, {path: "/", expires: 7})
                onClose()
            })
            .catch(e => {})
    }
    // Поп-ап с ошибкой
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