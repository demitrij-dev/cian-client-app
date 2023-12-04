"use client"
import cl from "./AuthModal.module.scss"
import {useState} from "react";
import Auth from "@/app/Service/Auth/Auth";
interface IClose{
    onClose: () => void
}
const AuthModal = ({onClose}: IClose) => {
    const [email, setEmail] = useState<string>("")
    const [password, setPassword] = useState<string>("")
    const onSubmit = async () => {
        await Auth.login(email, password)
    }
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
        </div>
    );
};

export default AuthModal;