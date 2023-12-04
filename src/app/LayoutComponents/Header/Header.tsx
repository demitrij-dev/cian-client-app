"use client"
import cl from "./Header.module.scss"
import {SetStateAction, useState} from "react";
import {createPortal} from "react-dom";
import AuthModal from "@/app/LayoutComponents/AuthModal/AuthModal";
import RegModal from "@/app/LayoutComponents/RegModal/RegModal";

type ModalType = 'auth' | 'reg' | null;
const Header = () => {
    const [isOverlayVisible, setOverlayVisible] = useState<boolean>(false);
    const [modalType, setModalType] = useState<ModalType>(null)
    const openModal = (type: ModalType) => {
        setModalType(type)
        setOverlayVisible(true)
    }
    const closeModal = () => {
        setModalType(null)
        setOverlayVisible(false)
    }
    const handleOverlayClick = (event: React.MouseEvent<HTMLDivElement>) => {
        if (event.target === event.currentTarget) closeModal();
    };
    return (
        <header className={cl.HeaderWrapper}>
            <div className={cl.Header}>
                <div className={cl.HeaderLeftElements}>
                    <div className={cl.HeaderLogo}>
                    </div>
                    <nav className={cl.HeaderNav}>
                        <ul>
                            <li>Aренда</li>
                            <li>Покупка</li>
                            <li>Продажа</li>
                        </ul>
                    </nav>
                </div>
                <div className={cl.HeaderButtons}>
                    <button onClick={() => openModal('reg')}>Зарегестрироваться</button>
                    <button onClick={() => openModal('auth')}>Войти</button>
                </div>
            </div>
            {isOverlayVisible && <div className={cl.Overlay} onClick={handleOverlayClick}/>}
            {modalType && (
                <>
                    {modalType === 'auth' && createPortal(<AuthModal onClose={closeModal} />, document.body)}
                    {modalType === 'reg' && createPortal(<RegModal onClose={closeModal} />, document.body)}
                </>
            )}
        </header>
    );
};

export default Header;