"use client"
import cl from "./RegModal.module.scss"
import {useState} from "react";
import Auth from "@/app/Service/Auth/Auth";
interface IClose{
    onClose: () => void
}
const RegModal = ({onClose}: IClose) => {
    const [email, setEmail] = useState<string>("")
    const [password, setPassword] = useState<string>("")
    const onSubmit = async () => {
        await Auth.reg(email, password)
    }
    return (
        <div className={cl.ModalWrapper}>
            <div className={cl.Modal}>
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)}/>
                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)}/>
                <button onClick={onSubmit}>Reg</button>
                <button onClick={onClose}>Close</button>
            </div>
        </div>
    );
};

export default RegModal;